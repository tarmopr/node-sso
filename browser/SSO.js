// dummy sso interface implementation based on local storage, this would come from the native application normally
var SSO = function() {

};

// in a real-world application, this could just always return null
SSO.prototype.getCredentials = function(callback) {
    if (typeof(window.localStorage.credentials) === 'undefined') {
        callback(null);

        return;
    }

    var credentials = JSON.parse(window.localStorage.credentials);

    if (typeof(callback) === 'function') {
        callback(credentials);
    }
};

SSO.prototype.storeCredentials = function(username, password, callback) {
    window.localStorage.credentials = JSON.stringify({
        username: username,
        password: password
    });

    if (typeof(callback) === 'function') {
        callback(true);
    }
};

SSO.prototype.removeCredentials = function(callback) {
    window.localStorage.removeItem('credentials');

    if (typeof(callback) === 'function') {
        callback(true);
    }
};

window.sso = new SSO();