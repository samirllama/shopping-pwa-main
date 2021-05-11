#!/bin/bash

set -e

./tasks/generate-build-info.sh

####
#tar the files
####
{
  echo 'node_modules'
  echo 'logs'
  echo 'static'
  echo 'tasks'
  echo 'test'
  echo 'npm-debug.log'
  echo 'build.sh'
  echo '*.md'
  echo '*.tar'
  echo '*.iws'
  echo '*.iml'
  echo '*.ipr'
  echo '.eslintignore'
  echo '.eslintrc.yml'
  echo '.git'
  echo '.gitignore'
  echo '.lessrc'
  echo '.tern-project'
  echo 'exclude'
  echo '.vscode'
} > exclude

BUNDLE=shopping-pwa.tar
tar cvf ${BUNDLE} -X exclude .
