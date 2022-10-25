#!/bin/bash
# (need permissions?) - run: chmod ug+x update-data.sh

# https://stackoverflow.com/a/20434740 (get the current directory)
DIR="$( cd "$( dirname "$0" )" && pwd )"

cp "$DIR/../pages/data/test_data.json" "$DIR/../pages/data/test_data_previous.json" 

curl 'http://localhost:3000/api/property' >> "$DIR/../pages/data/test_data.json"


echo "new file here: $DIR/../pages/data/test_data.json"
echo "(old file here: $DIR/../pages/data/test_data_previous.json)"

echo "Commit new \"test_data.json\" to apply"