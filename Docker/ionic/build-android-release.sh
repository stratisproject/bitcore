#!/bin/sh

# ARGS: Arg 1 is the type of build. Use build:android for debug and build:android-release for release
# Arg 2 is the keystore password

# Attempt to prevent Node out of memory errors
export NODE_OPTIONS="--max-old-space-size=8192"

echo "Running build: build:stratis:android-release (release)"
rm -rf /app/bitcore
rm -rf /output/apk
git clone https://github.com/stratisproject/bitcore-stratis.git --recurse-submodules --single-branch --branch latest /app/bitcore
cd /app/bitcore
npm i --unsafe-perm
cd /app/bitcore/packages/mobile-wallet
npm run apply:stratis
ionic cordova platform add android
cd /app/bitcore
npm i --unsafe-perm
cd /app/bitcore/packages/mobile-wallet
npm run build:stratis:android-release
cp -r /app/bitcore/packages/mobile-wallet/platforms/android/app/build/outputs/bundle /output

# The script produces an app bundle so we need use jarsigner to sign
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /keys/stratiswallet.keystore -storepass ${1} -signedjar /output/bundle/release/app-release-signed.aab /output/bundle/release/app-release.aab stratiswallet

#/app/bitcore/packages/mobile-wallet/platforms/android/app/build/outputs/bundle/release/app-release.aab
# Use these if outputting an APK
#$ANDROID_SDK_ROOT/build-tools/30.0.3/zipalign -v 4 /output/apk/release/app-release-unsigned.apk --out /output/apk/release/app-release-signed-aligned.apk /output/apk/release/android-release-unsigned-aligned.apk
#$ANDROID_SDK_ROOT/build-tools/30.0.3/apksigner sign --ks /keys/stratiswallet.keystore --ks-key-alias stratiswallet --ks-pass pass:{1} --out /bundle/release/app-release-signed.aab /bundle/release/app-release.aab
