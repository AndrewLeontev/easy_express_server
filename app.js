const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index',{title: 'Добро пожаловать!'});
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.listen(3000);
console.log('Server is runing on port 3000...');