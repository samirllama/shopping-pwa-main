#!/bin/bash

# This script handles ONLY the basic use cases of:
# * GraphQL type conflicts
# * ESLint cache conflicts

git checkout "${PR_BRANCH}"
git merge master

# Installs AFTER branch change and merge attempt to get all dependencies
# Assumes no git conflicts in package.json
npm install -g yarn
yarn cache clean
yarn install --ignore-engines

yarn graphql
yarn eslint

git add .
git commit -m 'chore: syncs types and lint cache for branch'
git push origin "${PR_BRANCH}"
