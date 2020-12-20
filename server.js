var express = require('express');
var app = express();
var fs = require("fs");
const multer = require('multer');

const upload = multer({dest: 'temp/' });   //saves into this directory
tempPath=__dirname+"/"+'temp/';

var path=__dirname + '/uploadLink/';
app.use(express.static(path));

function show(request, response) {
  console.log("show endpoint called");
  fs.readdir(path,function(err,files){
    if (err){
      return console.error(err);
    }
    var entries=[];
    files.forEach(function (file){
      entries.unshift(file);
    });
    console.log(" read "+entries.length+" file entries");
    
    payload='<html><meta name="viewport" content="width=device-width,initial-scale=1.0"><body style="font:14pt arial"><h1>The Chen Family Page</h1>';
    for (i in entries){
      each=entries[i];
      var name=each.split('.');
      if (name[1]!="txt"){
        payload+='<img src="'+each+'" height=40%><br>';
        //todo add videos
        //add multiple pics
      }else{
        var text=fs.readFileSync(path+each);
        payload+='<hr><div><b>On ';
        payload+=name[0]+', we wrote:</b></div>';
        payload+='<div>'+text+'</div>';
      }
    }
    console.log(" sent payload of length "+payload.length);
    response.send(payload);
  });
}

function doRedirect(request,response){
  data=request.body.texttoupload
  console.log("got text: "+data);
  let date=(new Date()).toISOString()
  date=date.replace(/:/g,"");
  date=date.substring(0,date.lastIndexOf("."));
  date=date.replace("T","-");
  filename=tempPath+date+".txt";
  console.log("writing: "+filename);
  fs.writeFile(filename, data, ()=>{ response.redirect('/'); });
}

app.get('/', show)
app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/upload.html');
});

//TODO: add date file names
//https://www.npmjs.com/package/multer
//search filename function
app.post('/doUpload', upload.array('filestoupload'), doRedirect);
//app.get('/delete', deletefunction)

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
})
