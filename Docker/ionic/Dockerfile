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

RUN git clone git@github.com:stratisproject/bitcore-stratis.git --recurse-submodules --single-branch --branch stratis /app
WORKDIR /app
RUN npm i --unsafe-perm
WORKDIR /app/packages/mobile-wallet
RUN npm run apply:stratis
RUN ionic cordova platform add android
ADD google-services.json /app/packages/mobile-wallet/platforms/android/app/google-services.json
WORKDIR /app
# Run this twice to fix the symlinked packages that appear to be broken when adding the ionic platform again
RUN npm i --unsafe-perm
WORKDIR /app/packages/mobile-wallet
CMD ["npm", "run", "build:android"]