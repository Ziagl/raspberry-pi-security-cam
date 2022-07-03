#!/bin/bash
cameraName='cam1'
filename=$cameraName-`date +%Y.%m.%d-%H-%M-%s`.jpg

# I created a local storage on my pi in ram (not sd card)
# sudo mkdir /capture
# sudo mount -t tmpfs -o size=20m tmpfs /capture
localStorage='/capture/'$filename

# mount a remote directory on a fileserver to store files there
# raspberry pi sd card can fail, so images are only safe on a file server
# that has a backup routine running
remoteStorage='/mnt/'$filename

# path to the api that is hosted somewhere on a local or remote webserver
api=https://my-api-domain.com/upload.php

# create snapshot and save to ramdisk
# use fswebcam if you use a USB connected webcam
#fswebcam -r 640x480 --no-banner $localStorage
# use libcamera-still if you use official raspberry pi camera
libcamera-still -o $localStorage

# send to web api
curl -F "camImg=@"$localStorage $api

# copy file to remote
cp $localStorage $remoteStorage

# remove snapshot
rm $localStorage

