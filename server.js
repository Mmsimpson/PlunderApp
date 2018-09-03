
const jwt = require('jsonwebtoken');
const express = require('express');
const ex = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const dbq = require('./queries.js');
const maps = require('./maps');
ex.use(cors());
ex.use('/images/', express.static('./images'));
ex.use(express.static('./frontend'));
ex.use(jsonParser);
let multer = require('multer');
let upload = multer({dest: './images'});

ex.post("/postimageupload", upload.single('post-image'), (req, res)  =>  {
    let postid = req.body.id;
    console.log(postid)
    dbq.postAddImage(postid, './images/' + req.file.filename)
    .then(row => {
        res.send(row)
    })
})

ex.post("/registerimageupload", upload.single('profile-image'), (req, res)  =>  {
    let userid = req.body.id;
    console.log(userid)
    dbq.registerAddImage(userid, './images/' + req.file.filename)
    .then(row => {
        res.send(row)
    })
})
//Request All Users
let getUsers = (req, res) => {
    dbq.listAllUsers()
        .then(results => res.send(results));
}

//Get posts - page initialization
let getPosts = (req, res) => {
    dbq.listAllPosts()
        .then(results => res.send(results));
}

//Get posts by specific user
let postsByUser = (req, res) => {
    let user = req.params.username;
    dbq.allPostsByUser(user)
        .then(results => res.send(results));
}

//Get specific post by specific user
let postByUser = (req, res) => {
    let user = req.params.username;
    let post = req.params.postid;
    dbq.onePostsByUser(user, post)
        .then(results => res.send(results));
}

//Get posts by category
let postsByCat = (req, res) => {
    let category = req.params.category;
    console.log(category);
    dbq.listPostsByCategory(category)
        .then(results => res.send(results));
}

//Get Posts by Location
let postsByLocation = (req, res) => {
    let state = req.params.location;
    let city = req.params.location;
    dbq.listPostsByLocation(city, state)
        .then(results => res.send(results));
}

let newUser = (req,res) => {
    let userForm = req.body;
    dbq.createUser(userForm)
        .then(results => {
            res.send(results)
        });
}

//Create a new post
let newPost = (req, res) => {
    let postForm = req.body;  
    console.log(postForm);              
    dbq.createPost(postForm)
        .then(results => {
            res.send(results)
        });
}

// let registerToken = (req, res) =>{
    
// }

// //validation middlewhere takes in url query for ?token='webtoken'
// let validateToken = (req, res, next) => {
//     let token = req.query.token;
//     let isValid = false;
//     let payload;
//     console.log(token);
//     try {
//         payload = jwt.verify(token, 'secretsig');
//         isValid = true;
//     } catch (err) {
//         isValid = false;
//     }
//     req.user = payload;
//     //creates a new property for the request object, called user
//     if (isValid) {
//         next();
//     } else {
//         res.end('youshallnotpass')
//     }
// }
// let createToken = (req, res) => {
//     let credentials = req.body;
//     console.log(credentials)
//     let registeringUser = dbq.newUser(credentials.username, credentials.password, credentials.email, credentials.first, credentials.last, credentials.city, credentials.state);
      
    


// let createToken = (req, res) => {
//         let credentials = req.body;
//         console.log(credentials)
//         let validUser = dbq.usernameLogin(credentials.username, credentials.password, credentials.email, credentials.first, credentials.last, credentials.city, credentials.state);
//         validUser.then(dbReply => {
//             // this function serves an object with keys "username" and "password" from our form
//             let loginID = JSON.stringify(dbReply.username);
//             let loginPass = JSON.stringify(dbReply.password)
//             let username = JSON.stringify(credentials.username);
//             let password = JSON.stringify(credentials.password);
//             if (loginID === username) {
//                 if (loginPass === password) {
//                     let token = jwt.sign(
//                         {userID: username},
//                         'secretsig',
//                         {expiresIn: '7d'}
//                     );
//                     res.end(token)
//                     //this should be granted & held in localstorage for access later
//                 } else {
//                     res.end('You entered an incorrect password, try again')
//                 }

//             } else {
//                 res.end('You need to login, please enter username and password')
//             }
//         });
//     ;
// }

//geocoding
let getGeocode = (req, res) => {
    console.log(req.body);
    maps.geocode(req.body.city, req.body.state)
        .then(results => {
            maps.mapQuery(results)
            .then(results => {
                res.send(results.json.results);
            })
        })
}


// ex.post('/login', createToken);
ex.post('/register', newUser)
ex.post('/post', newPost)
ex.post('/map', jsonParser, getGeocode);
ex.get('/users', getUsers);
ex.get('/posts', getPosts);
ex.get('/:username/posts', postsByUser);
ex.get('/:username/posts/:postid', postByUser);
ex.get('/posts/cat/:category', postsByCat);
ex.get('/posts/state/:location', postsByLocation);

ex.listen(3000);





