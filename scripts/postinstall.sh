#!/bin/bash

cd app/eReuse-Blockchain
rm -rf build/
../../node_modules/.bin/truffle migrate --to 5  --reset --all
