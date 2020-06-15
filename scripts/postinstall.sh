#!/bin/bash

cd app/eReuse-Blockchain
rm -r build/
../../node_modules/.bin/truffle migrate  --reset --all
