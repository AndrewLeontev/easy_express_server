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

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.post('/contact/send', (req, res) => {
 const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
   user: 'Enter email',
   pass: 'Enter password'
  }
 });

 const mailOptions = {
  from: `Enter name <Enter email>`,
  to: 'Enter email',
  subject: 'Website Submission',
  text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
  html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
 };

 transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
   console.log(error);
   res.redirect('/');
  } else {
   console.log('Message Sent: '+info.response);
   res.redirect('/');
  }
 });
});

app.listen(3000);
console.log('Server is runing on port 3000...');