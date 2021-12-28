#!/usr/bin/env bash

echo "Building..."
npm run build

echo "Sending to DO..."
cd dist/fis-design
scp -r * do:/var/www/webapps/fis-designer/
