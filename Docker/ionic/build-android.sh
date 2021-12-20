#!/bin/sh

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
npm run build:android
cp -r /app/bitcore/packages/mobile-wallet/platforms/android/app/build/outputs/apk /output