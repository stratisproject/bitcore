#!/bin/sh

# ARGS: Arg 1 is the type of build. Use build:android for debug and build:android-release for release
# Arg 2 is the keystore password

# Attempt to prevent Node out of memory errors
export NODE_OPTIONS="--max-old-space-size=8192"

echo Running build: ${1:-"build:android"}
git clone https://github.com/stratisproject/bitcore-stratis.git --recurse-submodules --single-branch --branch strax-cirrus /app/bitcore
cd /app/bitcore
npm i --unsafe-perm
cd /app/bitcore/packages/mobile-wallet
npm run apply:stratis
ionic cordova platform add android
mv /app/google-services.json /app/bitcore/packages/mobile-wallet/platforms/android/app/google-services.json
cd /app/bitcore
npm i --unsafe-perm
cd /app/bitcore/packages/mobile-wallet
npm run ${1:-"build:android"}
cp -r /app/bitcore/packages/mobile-wallet/platforms/android/app/build/outputs/apk /output

# IF release, sign and zipalign
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /keys/stratiswallet.keystore -storepass ${2} -signedjar /output/apk/release/app-release-signed.apk /output/apk/release/app-release-unsigned.apk  stratiswallet
$ANDROID_HOME/build-tools/27.0.0/zipalign -v 4 /output/apk/release/app-release-signed.apk /output/android-release-signed-aligned.apk