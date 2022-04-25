#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Id: " id
echo
echo "You entered $id"

echo
echo --------------------------------------------
echo 
echo "Calling getComments function"
echo

near call $CONTRACT getComments '{"id": '$id'}' --accountId $OWNER

echo
echo