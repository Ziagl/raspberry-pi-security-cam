#!/bin/bash
cameraName='cam1'
filename=$cameraName-`date +%Y.%m.%d-%H-%M-%s`.jpg
# I created a local storage on my pi in ram (not sd card)
# sudo mkdir /capture
# sudo mount -t tmpfs -o size=10m tmpfs /capture
localStorage='/capture/'$filename
remoteStorage='/mnt/'$filename
api=https://my-api-domain.com/upload.php

# create snapshot and save to ramdisk
fswebcam -r 640x480 --no-banner $localStorage

# send to web api
curl -F "camImg=@"$localStorage $api

# copy file to remote
cp $localStorage $remoteStorage

# remove snapshot
rm $localStorage

