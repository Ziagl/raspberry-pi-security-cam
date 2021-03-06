<?php
$dir = getcwd() . '/';
$imgDir = 'img/';
$fileName = 'camImg';
$metadataFilename = $dir . 'data.json';

$fileExtensionsAllowed = ['jpeg','jpg','png'];
$supportedTypes = ['cam1','cam2'];

$fileInfo = $_FILES[$fileName];
$fileName = $fileInfo['name'];
$fileSize = $fileInfo['size'];
$fileTmpName = $fileInfo['tmp_name'];
$fileType = $fileInfo['type'];
$fileExtension = strtolower(end(explode('.',$fileName)));
$type = strtolower(reset(explode('-',$fileName)));

$newFileName = $imgDir . $type . "." . $fileExtension;
$uploadPath = $dir . $newFileName;

// upload file

if(!in_array($type, $supportedTypes))
{
    exit("Type is not supported.");
}

if(!in_array($fileExtension, $fileExtensionsAllowed))
{
    exit("File extension is not allowed.");
}

if($fileSize > 10000000)
{
    exit("File exceeds maximum size of 10 MB.");
}

if(!move_uploaded_file($fileTmpName, $uploadPath))
{
    exit("File upload failed.");
}
else
{
    // update metadata
    $metadata = json_decode(file_get_contents($metadataFilename), true);
    $insert = true;
    for($i = 0; $i < count($metadata['images']); ++$i)
    {
        if($metadata['images'][$i]["name"] == $type)
            {
                $metadata['images'][$i]["filename"] = $newFileName;
            $metadata['images'][$i]["timestamp"] = date("Y-m-d H:i:s", time());
            $insert = false;
            break;
        }
    }
    if($insert)
    {
    	$metadata['images'][] = array("name" => $type, "filename" => $newFileName, "timestamp" => date("Y-m-d H:i:s", time()));
    }
    file_put_contents($metadataFilename, json_encode($metadata));
}

exit("Finished.");
