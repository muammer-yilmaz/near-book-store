#!/usr/bin/env bash
set -e

CURRENT=`pwd`
BASENAME=`basename "$CURRENT"`

if [ "$BASENAME" == "scripts" ]; then
    cd ..
fi

echo --------------------------------------------
echo
echo "building the contract (release build)"
echo
yarn build:release

echo --------------------------------------------
echo
echo "deploying the contract"
echo
near dev-deploy ./build/release/near-book-store.wasm

echo --------------------------------------------
echo
[ -z "$CONTRACT" ] && echo run the following commands echo 'export CONTRACT=<dev-123-456>'
[ -z "$OWNER" ] && echo 'export OWNER=<your own account>'
echo
echo

exit 0