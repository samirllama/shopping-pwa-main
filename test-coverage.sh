#!/bin/bash

if [ ! -d "coverage/" ]; then
  echo "ERROR: Coverage folder doesn't exist for some reason."

  exit 1
fi

masterCoverage="coverage/shopping-pwa-coverage/"

# Makes way for `git clone`. Comment out temporarily if necessary (no internet scenarios).
if [ -d ${masterCoverage} ]; then
  echo "Existing coverage files detected; removing and re-fetching master coverage."

  rm -rf ${masterCoverage}
fi

cd coverage/

sshUrl="git@github.expedia.biz:Brand-Expedia/shopping-pwa-coverage.git"
httpsUrl="https://github.expedia.biz/Brand-Expedia/shopping-pwa-coverage.git"

# Always want latest. Comment out temporarily if necessary (no internet scenarios).
git clone ${sshUrl} || git clone ${httpsUrl}

cd ../

node test/coverage-assessment/assess.js
