// if no native implementation exists, use the dummy one
if (typeof(window.sso) === 'undefined') {
    window.sso = new DummySSO();
}

// logs the user in
function login(username, password, callback) {
    var req = new XMLHttpRequest(),
        success;

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            success = req.status === 200 ? true : false;

            callback(success);
        }
    };

    req.open('POST', '/login', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send('username=' + username + '&password=' + password);
}

// logs out
function logout(callback) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            success = req.status === 200 ? true : false;

            callback(success);
        }
    };

    req.open('GET', '/logout', true);
    req.send();
}