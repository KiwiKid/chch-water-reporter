#!/bin/bash

# https://stackoverflow.com/a/20434740
DIR="$( cd "$( dirname "$0" )" && pwd )"
# (need permissions?) - chmod ug+x update-data.sh

curl 'http://localhost:3000/api/property' >> "$DIR/../pages/data/test_data_new.json"

echo "new file here: $DIR/../pages/data/test_data_new.json"
