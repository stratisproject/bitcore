FROM beevelop/cordova:9

RUN apt-get update
ENV IONIC_VERSION 4.10.4
RUN apt-get install -y git build-essential bzip2 openssh-client python && \
    npm install -g --unsafe-perm ionic@${IONIC_VERSION} && \
    npm i -g --unsafe-perm lerna && \
    ionic --version

# Hack to ensure the Android SDK license is accepted
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --update

# Make ssh dir
RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
# Warning! Anyone who gets their hands on this image will be able
# to retrieve this private key file from the corresponding image layer
ADD id_rsa /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts

# Add bitbuckets key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

ADD build-android.sh /app/build-android.sh
RUN chmod +x /app/build-android.sh

CMD ["/app/build-android.sh"]