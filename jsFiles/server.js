const jwt = require('jsonwebtoken');
const express = require('express');
const queries = require('./queries.js')
let ex = express();
ex.listen(3000);

let users = [
    {id: '1', name: 'Jaydoe', email: 'jayjay@jay.com', pw: 'shimmy'},
    {id: '2', name: 'XXXTentacion', email:'sonotdead@hiphop.com', pw: 'dondon'}
]

let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(body);
    });
};


let getUsers = (req, res) => {
    res.end(users[0].name);
}

let validateToken = (req, res, next) => {
    let token = req.query.token;
    let isValid = false;
    let payload;
    try {
        payload = jwt.verify(token, 'signature');
        isValid = true;
    } catch (err) {
        isValid = false;
    }
    console.log(payload.userID);
    req.user = payload;
    //creates a new property for the request object, called user
    if (isValid) {
        next();
    } else {
        res.end('youshallnotpass')
    }
}

let createToken = (req, res) => {
    readBody(req, body => {
        //body will eventually contain username and email
        let credentials = JSON.parse(body);
        let validUser = queries.usernameLogin();
        validUser.then(dbReply => {
            // this function serves an object with keys "username" and "password" from our form
            let loginID = JSON.stringify(dbReply.username);
            let loginPass = JSON.stringify(dbReply.password)
            let username = JSON.stringify(credentials.username);
            let password = JSON.stringify(credentials.password);
            if (loginID === username) {
                if (loginPass === password) {
                    let token = jwt.sign(
                        {userID: username},
                        'backendssignatureyo',
                        {expiresIn: '7d'}
                    );
                    res.end(token)
                    //this should be granted & held in localstorage for access later
                } else {
                    res.end('You entered an incorrect password, try again')
                }

            } else {
                res.end('You need to login, please enter username and password')
            }
        });
    });
}

        


ex.get('/users', validateToken, getUsers);
ex.post('/token', createToken);


// post to tokens, because it's to create a new thing
//npm install --save jjsonwebtoken

//username/id stored in webtoken
//password
//username can be reused so we use userID, don't want the token to 
//be replicant