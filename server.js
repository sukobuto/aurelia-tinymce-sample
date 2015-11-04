import express from "express"
import bodyParser from "body-parser"
import serveStatic from "serve-static"
import multer from "multer"
import path from "path"
import fs from "fs"
import prominence from "prominence"

let app = express();
let port = 3000;
let upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});
app.use(serveStatic('.'));

let onUpload = async function(req, res) {
	let file = req.file;
	let extension = path.extname(file.originalname);
	console.log(req.file);

	// append extension to filename.
	await prominence(fs).rename(file.path, file.path + extension);

	res.json({
		url: `/uploads/${file.filename}${extension}`
	});
};

app.post('/api/upload', upload.single('file'), onUpload);

app.listen(port, () => {
	console.log("listening http on port " + port)
});
