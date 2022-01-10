#!/bin/sh

# ARGS: Arg 1 is the type of build. Use build:android for debug and build:android-release for release
# Arg 2 is the keystore password

# Attempt to prevent Node out of memory errors
export NODE_OPTIONS="--max-old-space-size=8192"

echo "Running build: build:android (debug)"
rm -rf /app/bitcore
rm -rf /output/apk
git clone https://github.com/stratisproject/bitcore-stratis.git --recurse-submodules --single-branch --branch release/2.0.0 /app/bitcore
cd /app/bitcore
npm i --unsafe-perm
cd /app/bitcore/packages/mobile-wallet
npm run apply:stratis
ionic cordova platform add android
cd /app/bitcore
npm i --unsafe-perm
cd /app/bitcore/packages/mobile-wallet
npm run build:android
cp -r /app/bitcore/packages/mobile-wallet/platforms/android/app/build/outputs/apk /output