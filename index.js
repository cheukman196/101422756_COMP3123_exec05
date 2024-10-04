const express = require('express');
const router = express.Router();
const path = require('path');
const userData = require('./user.json')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  const fileName = 'home.html';
  res.sendFile(path.join(__dirname, './' , fileName));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  const fileName = 'user.json';
  res.sendFile(path.join(__dirname, './' , fileName));
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  password is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ status: false, message: "Username and password must be provided."});

  if (username != userData.username)
    return res.status(400).send({ status: false, message: "Username is invalid."});

  if (password != userData.password)
    return res.status(400).send({ status: false, message: "Password is invalid."});

  return res.status(200).send({ status: true, message: "User is valid."});
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username?', (req,res) => {
  const username = req.params.username;
  if(!username)
    return res.status(400).send({ status: false, message: "Username not provided."});

  return res.status(200).send(`<b>${username} successfully logged out.<b>`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  const errorObject = {
    status: err.status || 500,
    message: 'Server Error',
    err: err.message
  }
  res.status(err.status || 500).send(errorObject);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));