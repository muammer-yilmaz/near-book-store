#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Id: " id
echo
echo "You entered $id"

read -p "Enter Deposit Amount: " deposit
echo
echo "You entered $deposit"


echo
echo --------------------------------------------
echo 
echo "Calling buyBook function"
echo

near call $CONTRACT buyBook '{"id": '$id'}' --accountId $OWNER --deposit $deposit

echo
echo