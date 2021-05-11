#!/bin/bash

# Assumes working directory is `shopping-pwa/`.

# normal aws slave
source /data/jenkins/.bash_profile
PATH=$PATH:${WORKSPACE}/node_modules/.bin

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
 echo "NVM Not Found: Installing NVM"
 curl -o https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
 export NVM_DIR="$HOME/.nvm"
 [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
 nvm reinstall-packages system
fi

nvm install
nvm use
