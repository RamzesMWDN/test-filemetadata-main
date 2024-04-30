var express = require('express');
var cors = require('cors');
require('dotenv').config();
var app = express();

const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => 
  {    
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => 
  {    
    cb(null, file.originalname);
  }
});
// Create the multer instance
const upload = multer({ storage: storage });

//module.exports = upload;


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => 
{  
  // Handle the uploaded file
  //{"name":"testAppConsole.runtimeconfig.json","type":"application/json","size":268}  
  let result = { name:req.file.originalname,type:req.file.mimetype,size:req.file.size };
  console.log(result);
  res.json(result);
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});






const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
