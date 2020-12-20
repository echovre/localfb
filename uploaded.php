<html><body style="font:15px sans-serif">

<?php

function debug(){
  echo $_SERVER['DOCUMENT_ROOT']."uploads/";
  echo "ERROR:".$_FILES["file"]["error"];
  echo "<br>";
  foreach ($_FILES["file"]["error"] as $i){
    echo "CODE:".$i;
  }

}

$path="uploads/";
$timestamp=date("Y-m-d-His");

$text=$_POST["text"];
$name=$path.$timestamp.".txt";
echo "Writing file: ".$name;
$result=file_put_contents($name,$text);
if($result){
  echo " <b>Success.</b>";
}else{
  echo " <b>FAILED!!!</b>";
  debug();
}

$counter=0;
foreach ($_FILES as $file){
  $extension=pathinfo($file['name'][0],PATHINFO_EXTENSION);
  $destination=$path.$timestamp."-".$counter.".".$extension;
  echo "<br><br>Uploaded file:".$file['tmp_name'][0]." to destination:".$destination;
  $success=move_uploaded_file($file['tmp_name'][0], $destination);
  if($success){
    echo " <b>Success.</b>";
  }else{
    echo " <b>Failure!!! ";
    debug();
    echo "</b>";
  }
  $counter+=1;
}

?>
<br><br><br>
<a href="facebook.php">Go To Page...</a>

</body></html>
