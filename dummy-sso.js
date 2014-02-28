// dummy sso interface implementation based on local storage, this would come from the native application normally
var DummySSO = function() {

};

DummySSO.prototype.getCredentials = function() {
    if (typeof(window.localStorage.credentials) === 'undefined') {
        return null;
    }

    return JSON.parse(window.localStorage.credentials);
};

DummySSO.prototype.storeCredentials = function(username, password) {
    window.localStorage.credentials = JSON.stringify({
        username: username,
        password: password
    });

    return true;
};

DummySSO.prototype.removeCredentials = function() {
    window.localStorage.removeItem('credentials');

    return true;
};