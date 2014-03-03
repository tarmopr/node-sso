// dummy sso interface implementation based on local storage, this would come from the native application normally
var DummySSO = function() {

};

DummySSO.prototype.getCredentials = function(callback) {
    if (typeof(window.localStorage.credentials) === 'undefined') {
        callback(null);
    }

    var credentials = JSON.parse(window.localStorage.credentials);
    callback(credentials);
};

DummySSO.prototype.storeCredentials = function(username, password, callback) {
    window.localStorage.credentials = JSON.stringify({
        username: username,
        password: password
    });

    callback(true);
};

DummySSO.prototype.removeCredentials = function(callback) {
    window.localStorage.removeItem('credentials');

    callback(true);
};