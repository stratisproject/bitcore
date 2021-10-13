This Docker container is a fully set up Android build environment. Mount the code in the container and start a shell using `docker run -it -v ~/mobile-wallet-build:/app -p 8100:8100 ionic-build bash`

Be careful of permissions, docker runs everything as root which will fuck up your permissions so run docker as a user.
`npm i --unsafe-perm` to ignore

Then start the container and run:
`npm i`
`cd packages/mobile-wallet`
`ionic cordova remove platform android && ionic cordova add platform android`
Ensure google-services.json is in `platforms/android/app/`
`npm run build:android`