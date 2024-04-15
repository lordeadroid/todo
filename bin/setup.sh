#! /bin/zsh

cp .git-hooks/pre-commit .git/hooks

npm clean-install
npm run test
npm run coverage
