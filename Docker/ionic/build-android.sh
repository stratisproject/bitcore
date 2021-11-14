#!/bin/sh

git clone git@github.com:stratisproject/bitcore-stratis.git --recurse-submodules --single-branch --branch stratis /app/bitcore
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