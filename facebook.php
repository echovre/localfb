<html><body style="font:13px sans-serif">
<h1>Internal Facebook</h1>
<h3><a href="record.php">Upload More...</a></h3>
<?php
$path="uploads/";
$files = array_diff(scandir($path,1), array('.', '..'));
foreach ($files as $file){
  $filetype=pathinfo($file)['extension'];
  $filename=pathinfo($file)['filename'];
  if ($filetype!="txt"){
    print "<img src=\"".$path.$file."\" height=40%><br>";
  }else{
    print "<hr><div><b>On ".$filename.", we wrote:</b></div>";
    $fileHandle = fopen($path.$file,'r');
    while ($line = fgets($fileHandle)) {
      print "<div>".$line."</div>";
    }
    fclose($fileHandle);
  }
}
?></body></html>
