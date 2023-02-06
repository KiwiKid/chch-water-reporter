#!/bin/bash
# (need permissions?) - run: chmod ug+x update-data.sh

# Note: This script relies on an API served by this project (it needs to be running)

# https://stackoverflow.com/a/20434740 (get the current directory)
DIR="$( cd "$( dirname "$0" )" && pwd )"

mv "$DIR/../pages/data/property_data.json" "$DIR/../pages/data/property_data_old.json" 

curl 'http://localhost:3000/api/property' >> "$DIR/../pages/data/property_data.json"

mv "$DIR/../pages/data/meta_data.json" "$DIR/../pages/data/meta_data_old.json" 
curl 'http://localhost:3000/api/averages' >> "$DIR/../pages/data/meta_data.json"


echo "new file here: $DIR/../pages/data/property_data.json"
echo "(old file here: $DIR/../pages/data/property_data_old.json"

echo "Commit new \"*****_data.json\" files to apply"