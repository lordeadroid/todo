#! /bin/zsh

cp .git-hooks/pre-commit .git/hooks

npm install
npm run test
npm run coverage
