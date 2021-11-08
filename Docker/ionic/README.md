This Docker container is a fully set up Android build environment.

Build the container with the latest code: `docker build -t ionic-build .`
Mount the code in the container and start a shell using `docker run -it -v ~/mobile-wallet-build:/app -p 8100:8100 ionic-build bash`

Be careful of permissions, docker runs everything as root which will fuck up your permissions so run docker as a user.
`npm i --unsafe-perm` to ignore

Then start the container and run:
`npm i`
`cd packages/mobile-wallet`
`ionic cordova platform remove android && ionic cordova platform add android`
Ensure google-services.json is in `platforms/android/app/`
`npm run build:android`