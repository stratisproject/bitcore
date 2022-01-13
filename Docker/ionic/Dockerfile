# Android 11
FROM beevelop/android:v2021.06.2

# Nodejs 10
ENV NODEJS_VERSION=10.16.3 \
    PATH=$PATH:/opt/node/bin

WORKDIR "/opt/node"

RUN apt-get update && apt-get install -y curl git ca-certificates --no-install-recommends && \
    curl -sL https://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz | tar xz --strip-components=1 && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Cordova 10
ENV CORDOVA_VERSION 10.0.0
RUN npm i -g --unsafe-perm cordova@${CORDOVA_VERSION}

# Ionic 4.10.4
RUN apt-get update
ENV IONIC_VERSION 4.10.4
RUN apt-get install -y git build-essential bzip2 openssh-client python && \
    npm install -g --unsafe-perm ionic@${IONIC_VERSION} && \
    npm i -g --unsafe-perm lerna && \
    ionic --version

# Useful
RUN apt-get install nano

# Hack to ensure the Android SDK license is accepted
RUN yes | $ANDROID_SDK_ROOT/tools/bin/sdkmanager --update

ADD build-android-debug.sh /app/build-android-debug.sh
ADD build-android-release.sh /app/build-android-release.sh
RUN chmod +x /app/build-android-debug.sh
RUN chmod +x /app/build-android-release.sh

ENTRYPOINT ["/app/build-android-debug.sh"]