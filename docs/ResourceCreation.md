# How to add Resources (images, links) using npm package Multer.

## In an HTML Form: 
Take note of the 
enctype="multipart/form-data" and name="uploaded_file" fields:

```HTML
<form action="/stats" enctype="multipart/form-data" method="post">
  <div class="form-group">
    <input type="file" class="form-control-file" name="uploaded_file">
    <input type="text" class="form-control" placeholder="Number of speakers" name="nspeakers">
    <input type="submit" value="Get me the stats!" class="btn btn-default">            
  </div>
</form>
```
## In your Javascript file:
You'll need to require multer and a destination for the file uploads. The name field in your html form must match. 
```js
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file, req.body)
});
```

## Where are the files stored?
 
Other options:<br>

DiskStorage:<br>
The disk storage engine gives you full control on storing files to disk.
MemoryStorage:<br>
The memory storage engine stores the files in memory as Buffer objects. It doesn’t have any options.

WARNING: Make sure that you always handle the files that a user uploads. Never add multer as a global middleware since a malicious user could upload files to a route that you didn’t anticipate. Only use this function on routes where you are handling the uploaded files.

