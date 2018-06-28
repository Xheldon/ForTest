let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let mime = require('mime');



app.use(express.static(__dirname + '/download'));

app.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/download/:fileName', function(req, res){
    let fileName = req.params.fileName;
    let file = path.join(__dirname, 'download/' + fileName);
    let fileWithOutExt = path.basename(file);
    let mimetype = mime.lookup(file);

    res.set({
        "Content-disposition": "attachment; filename="+fileWithOutExt,
        "Content-type": mimetype
    });
    let fileStream = fs.createReadStream(file);
    console.log(fileStream);
    fileStream.pipe(res);
});
app.listen(9091);