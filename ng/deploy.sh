#!/usr/bin/bash

project=valheim-shopping-cart
bucket="s3://$project.sweeney-project.com"
backup=backup
exclusions="--exclude=$backup/* --exclude=$project/*"

ng build
aws s3 rm "$bucket/$backup" --recursive
aws s3 cp $bucket "$bucket/$backup" --recursive $exclusions
aws s3 cp ./dist/ $bucket --recursive
aws s3 rm $bucket --recursive $exclusions
aws s3 cp "$bucket/$project" $bucket --recursive
aws s3 rm "$bucket/$project" --recursive
