const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 8000;

//middleware
app.use(express.json());

//post/url/query/header
app.post('/prams',(req,res)=>{
//use header pram
    const form = req.header('form');

//use query pram
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const fullName = firstName + ' ' + lastName;

//use body pram
    const study = req.body.class
   
//result
    const result = `form:${form} \n name:${fullName}  class:${study}`; 

//response
    res.send(result);
});

//Upload
const UPLOAD = './upload/';

//define storage
const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null,"./upload");
    },
    filename:(req,file,callback) => {
        callback(null,file.originalname);                     
    }
});

const upload = multer({
    storage:storage,
    fileFilter:(req, file, callback) => {
        if(file.mimetype === 'image/jpg'||
          file.mimetype === 'image/jpeg'||
          file.mimetype === 'image/png'
        ){
            callback(null, true);
        }else{
            callback(new Error('This format is not supported'));
        }
    }
});

//upload file storage
fileUP = upload.single('myFile');

//post upload API
app.post('/upload',fileUP, (req, res) => {
    res.send('Uploaded successfully');
});


// Download
const Download_Local = './download/koi.jpg'

app.get('/download', (req,res) => {
    res.download(Download_Local,(error) => {
        if (!error) {
            res.send('File Download success');
        } else {
            res.send('File Download Failed!');
        }
    });
});


// error
app.use((err,req,res,next)=>{
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('THere is an uplode error!');
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send('Success');
    }
});


app.listen(PORT, ()=>{
    console.log(`server : http://localhost:${PORT}`);
});


