#! /bin/bash

cp bin/git-hooks/pre-commit ../git/hooks
npm install
npm run coverage
