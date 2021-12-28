FROM beevelop/cordova:9

RUN apt-get update
ENV IONIC_VERSION 4.10.4
RUN apt-get install -y git build-essential bzip2 openssh-client python && \
    npm install -g --unsafe-perm ionic@${IONIC_VERSION} && \
    npm i -g --unsafe-perm lerna && \
    ionic --version

# Hack to ensure the Android SDK license is accepted
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --update

ADD google-services.json /app/google-services.json
ADD build-android-debug.sh /app/build-android-debug.sh
ADD build-android-release.sh /app/build-android-release.sh
RUN chmod +x /app/build-android-debug.sh
RUN chmod +x /app/build-android-release.sh

ENTRYPOINT ["/app/build-android-debug.sh"]