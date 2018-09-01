let loginBTN = document.querySelector('#login');
let registerBTN = document.querySelector('#register');
let postBTN = document.querySelector('#post');
let modalWindow = document.querySelector('.modalBG');
let modalLogin = document.querySelector('.modalLogin');
let modalRegister = document.querySelector('.modalRegister');
let modalPost = document.querySelector('.modalPost')
let plunderBTN = document.querySelector('#plunders')
let modalPlunders = document.querySelector('.modalPlunders');
let plunders = document.querySelectorAll('.post');
let navBTN = document.querySelector('.navLogo');
let loginForm = document.querySelector('.loginForm')
let postForm = document.querySelector('.postForm')
let registerForm = document.querySelector('.registerForm')
let mapBTNS = document.querySelectorAll('.mapBTN');
let modalMap = document.querySelector('.modalMap');


let loginSubmission = (event) => {
    event.preventDefault();
    let loginSubmissionObject = {username:'', password: ''};
    let usernameSubmit = document.querySelector('.inputFieldUsername');
    let passwordSubmit = document.querySelector('.inputFieldPassword');
    loginSubmissionObject['username'] = usernameSubmit.value;
    loginSubmissionObject['password'] = passwordSubmit.value;
    console.log(loginSubmissionObject);
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(loginSubmissionObject),
        headers: {'Content-Type': 'application/json'}
    })
    .then((result) => {
        return result.text()
    })
    .then((result)=>{
        console.log(result);
    })
}

let registerSubmission = (event) => {
    event.preventDefault();
    let registerSubmissionObject = {username:'', password:'', email:'', first:'', last:'', city:'', state:''}; // re-add userimg
    let usernameSubmit = document.querySelector('#username');
    let passwordSubmit = document.querySelector('#password');
    let emailSubmit = document.querySelector('#email');
    let firstNameSubmit = document.querySelector('#first');
    let lastNameSubmit = document.querySelector('#last');
    let citySubmit = document.querySelector('#city');
    let stateSubmit = document.querySelector('#state');
    
    registerSubmissionObject['username'] = usernameSubmit.value;
    registerSubmissionObject['password'] = passwordSubmit.value;
    registerSubmissionObject['email'] = emailSubmit.value;
    registerSubmissionObject['first'] = firstNameSubmit.value;
    registerSubmissionObject['last'] = lastNameSubmit.value;
    registerSubmissionObject['city'] = citySubmit.value;
    registerSubmissionObject['state'] = stateSubmit.value;

    let userImage = document.querySelector('#userimg');
    let profileImg = userImage.files[0];
    let registerFormData = new FormData()
    registerFormData.append('profile-image', profileImg)

    //registerSubmissionObject['userimg'] = 
    console.log(registerSubmissionObject);
    fetch('http://localhost:3000/register', {
        method: 'POST', 
        body: JSON.stringify(registerSubmissionObject),
        headers: {'Content-Type': 'application/JSON'}
    })
    .then((result) => {
        return result.json()
    })
    // .then((result) =>{
    //     console.log(result);
    //})
    .then((user) => {
        console.log(user)
        registerFormData.append('id', user.id)
        return fetch('http://localhost:3000/registerimageupload', {
            method: 'POST',
            body: registerFormData,
            mode: 'cors',
        })
    })
    empty(postArea);
    getReq(url);
}

let postSubmission = (event) => {
    event.preventDefault();
    let postSubmissionObject = {item:'', category:'', description:'', price:''}; //re-add descripimg:''
    let itemNameSubmit = document.querySelector('#item');
    let categorySubmit = document.querySelector('#category');
    let descriptionSubmit = document.querySelector('#description');
    let priceSubmit = document.querySelector('#price');
    postSubmissionObject['item'] = itemNameSubmit.value;
    postSubmissionObject['category'] = categorySubmit.value;
    postSubmissionObject['description'] = descriptionSubmit.value;
    postSubmissionObject['price'] = priceSubmit.value;
    console.log(postSubmissionObject);
    let descriptionImg = document.querySelector('#descripimg');
    let productImg = descriptionImg.files[0];
    let postFormData = new FormData()
    postFormData.append('post-image', productImg)
    
    fetch('http://localhost:3000/post', {
        method: 'POST',
        body: JSON.stringify(postSubmissionObject),
        headers: {'Content-Type': 'application/json'}
    })
    .then((result) => {
        return result.json()
    })
    .then((post) => {
        console.log(post)
        postFormData.append('id', post.id)
        return fetch('http://localhost:3000/postimageupload', {
            method: 'POST',
            body: postFormData,
            mode: 'cors',
        })
    })
    
    empty(postArea)
    getReq(url)
}
let showLogin = (event) => {
    modalWindow.classList.add('show');
    modalLogin.classList.add('show');
}

let showRegister = (event) => {
    modalWindow.classList.add('show');
    modalRegister.classList.add('show');
}

let showPost = (event) => {
    modalWindow.classList.add('show');
    modalPost.classList.add('show');
}

let showPlunders = (event) => {
    modalWindow.classList.add('show');
    modalPlunders.classList.add('showPlunders');
}

let hideModal = (event) => {
    if (event.target === modalWindow) {
        modalWindow.classList.remove('show');
        modalLogin.classList.remove('show');
        modalMap.classList.remove('show');
        modalRegister.classList.remove('show');
        modalPost.classList.remove('show');
        modalPlunders.classList.remove('showPlunders');
    }
}

navBTN.addEventListener('click', showPlunders);
plunderBTN.addEventListener('click', showPlunders);
registerBTN.addEventListener('click', showRegister);
postBTN.addEventListener('click', showPost)
modalWindow.addEventListener('click', hideModal);
loginBTN.addEventListener('click', showLogin);
loginForm.addEventListener('submit', loginSubmission);
postForm.addEventListener('submit', postSubmission);
registerForm.addEventListener('submit', registerSubmission);

// let getRefresh = () => {   //add listener, when, clicked- empy(postarea), then run getReq(url)
//     postForm.
//     getReq(URL)
// }

