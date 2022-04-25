#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Id: " id
echo
echo "You entered $id"
echo

read -p "Enter Chapter Content: " content
echo
echo "You entered $content"

echo
echo --------------------------------------------
echo 
echo "Calling addChapter function"
echo

near call $CONTRACT addChapter  '{"id": '$id', "content" : "'"$content"'"}' --accountId $OWNER

echo
echo