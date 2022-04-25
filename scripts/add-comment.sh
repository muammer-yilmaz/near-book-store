#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Id: " id
echo
echo "You entered $id"

echo

read -p "Enter Comment: " comment
echo
echo "You entered $comment"

echo
echo --------------------------------------------
echo 
echo "Calling addComment function"
echo

near call $CONTRACT addComment  '{"id": '$id', "comment" : "'"$comment"'"}' --accountId $OWNER

echo
echo