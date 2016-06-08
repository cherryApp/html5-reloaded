var express = require('express');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

app.use(cookieParser());

app.use('/build', express.static(__dirname + '/build'));

app.get('/', function (req, res) {
    var index = fs.readFileSync('build/index.html', 'utf8');
    console.log( index );
    res.send(index);
});

// Bejelentkezés.
app.post('/dologin', function (req, res) {
    var requestData = '';
    req.on('data', function(dataPackage){
        requestData += dataPackage;
    });
    req.on('end', function(){
        var serverResponse = {
            'userId': 0,
            'loggedIn': false
        };
        var user = findUser(JSON.parse(requestData));
        if (user !== null) {
            serverResponse.userId = user.id;
            serverResponse.loggedIn = true;
            res.writeHead(200, {
                'Set-Cookie': 'ittoken='+user.token,
                'Content-Type': 'application/json'
            });
        }
        res.end(JSON.stringify(serverResponse));        
    });
});

// Felhasználók lekérése.
app.get('/users', function(req, res){
    var user = checkUser(req, res);
    if ( !user ) return;
    
    res.send(JSON.stringify(getUsers()));
});

// Bejelentkezés ellenőrzése.
app.get('/checklogin', function(req, res){
    var user = checkUser(req, res);
    if ( !user ) return;
    
    var fullResponse = {
        'loggedIn': true,
        'user': user
    };
    res.send(JSON.stringify(fullResponse));
});

// Find user.
function findUser(loginData) {
    var currentUser = null;
    var users = getUsers();
    for( var k in users ) {
        if ( users[k].email === loginData.email && users[k].pass === loginData.pass ) {
            var d = new Date();
            var token = 'token_'+d.getTime();
            currentUser = users[k];
            currentUser.id = k;
            currentUser.token = token;
            saveSession({
                id: k,
                token: token
            });
        }
    }
    return currentUser;
}

// Userek beolvasása.
function getUsers() {
    var users = fs.readFileSync(__dirname + '/json/user.json', 'utf8');
    return JSON.parse(users);
}

// User ellenőrzése.
function checkUser(req, res) {
    // Munkamenetek kiolvasása.
    var sessions = getSessions();
    var users = getUsers();
    
    // Felhasználó keresése a cookie alapján.
    var cookie = req.cookies.ittoken;
    var user = false;
    for( var k in sessions ) {
        if ( sessions[k].token === cookie ) {
            user = users[sessions[k].id];
        }
    }
    if (user !== false) {
        return user;
    } else {
        var err = {'loggedIn': false};
        res.send(JSON.stringify(err));
        return false;
    }
}

// Munkamenetek beolvasása.
function getSessions() {
    // Munkamenetek kiolvasása.
    var sessions = fs.readFileSync(__dirname + '/json/session.json', 'utf8');
    if ( sessions === '' ) {
        sessions = [];
    } else {
        sessions = JSON.parse(sessions);
    }
    return sessions;
}


// Munkamenetek mentése.
function saveSession(sessionData) {
    // Munkamenetek kiolvasása.
    var sessions = getSessions();
    
    // Új munkamenet hozzáadása.
    sessions.push(sessionData);
    
    // Adatok visszaírása a fájlba.
    fs.writeFileSync(
        __dirname + '/json/session.json',
        JSON.stringify(sessions)
    );
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

