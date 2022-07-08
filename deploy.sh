#!/usr/bin/env bash

echo "Syncing control units..."
cd src/assets/js/fis-control-binary-converter/
git pull
cd ../../../..

echo "Building..."
npm run build

echo "Sending to DO..."
cd dist/fis-design
scp -r * do:/var/www/webapps/fis-designer/
