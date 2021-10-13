This Docker container is a fully set up Android build environment. Mount the code in the container and start a shell using `docker run -it -v ~/mobile-wallet-build:/app -p 8100:8100 -u $(id -u ${USER}):$(id -g ${USER}) ionic-build bash`

Be careful of permissions, docker runs everything as root which will fuck up your permissions so run docker as a user.
`npm i --unsafe-perm` to ignore

First run:
`lerna clean`
`lerna bootstrap`
`cd packages/mobile-wallet`
`npm run prepare:stratis:android`

Then start the container and run:
`npm run build:android`