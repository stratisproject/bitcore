This Docker container is a fully set up Android build environment. It will clone the latest repo and npm i everything.

Build the container with the latest code: `docker build -t ionic-build .`
Mount the code in the container and start a shell using `docker run -it -v /root/build:/output ionic-build build:android`, or `build:android-release [KEYSTORE_PW]` for release
The apk will be output to the `~/build` folder

Even faster is to build on a remote machine. Mount the whole build folder to get the output to work:
`docker context use OTHER_CONTEXT`
`docker run -it -v /root/build:/output -v /root/.bitcore:/keys ionic-build`

Debugging builds
For experimenting faster with builds you can open a shell session to the docker container and run things from within.
`docker run -it -v /root/build:/output -v /root/.bitcore:/keys --entrypoint /bin/bash ionic-build`

For release builds:
`docker run -it -v /root/build:/output -v /root/.bitcore:/keys --entrypoint /app/build-android-release.sh ionic-build`
