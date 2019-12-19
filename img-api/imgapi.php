<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: X-Requested-With, Authorrization, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers");

$file = $_FILES;
$target_dir = "C:\Users\ACE\amaka\src\assets\img/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

$filename = substr(time(), 0, 5).substr(time(), -5, 5);
$path = $target_dir.$filename."."."jpg"; //all images are saved in jpg formats
$code = "";

if (isset($file['file'])) { //check if file is set for upload
    $formats = ['jpg', 'png', 'gif', 'jpeg', 'jfif']; //valid image file formats

    if ( !in_array($fileType, $formats) ) {
        $code = "01"; $message = "Please choose a valid image";
    } else if ( getimagesize($file["file"]["tmp_name"]) == false ) { //make sure file uploaded is an image by checking the resolution as file formats can easily be tampered with
        $code = '01'; $message = 'File is not an image. Please choose an image';
    } else if ( $file["file"]["size"] > 2000000 ) { //check image size. limit size is 2mb
        $code = '01'; $message = 'Photo should not be higher than 2MB';
    }

    if ( $code !== "01" ) { //if no errors above then upload image
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $path)) {
            $code = "00"; $message = $filename;
        } else {
            $code = '11'; $message = "Sorry, there was an error in the upload. Retry";
        }
    }
} else {
    $code = "11"; $message = "Upload failed. Retry";
}

echo json_encode(['code'=>$code, 'message'=>$message]);

?>