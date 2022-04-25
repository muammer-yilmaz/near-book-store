#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Name: " bookName
echo
echo "You entered $bookName"

echo

read -p "Enter Book Description: " desc
echo
echo "You entered $desc"

echo

read -p "Enter Book Price: " price
echo
echo "You entered $price"

echo
echo --------------------------------------------
echo 
echo "Calling createBook function"
echo

near call $CONTRACT createBook '{"name": "'"$bookName"'", "desc": "'"$desc"'", "price" : '$price'}' --accountId $OWNER

echo
echo