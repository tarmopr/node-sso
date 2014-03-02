
var SSO = function() {
    
};

SSO.prototype.getCredentials = function(callback) {
    
    try {
        // Call native with credentials json and get the result with username/password json object
        NativeBridge.call("getCredentials", null, function(result) {
                          callback(result);
                          });
    } catch(e) {
        console.log(e);
        callback(null);
    }
};

SSO.prototype.storeCredentials = function(username, password, callback) {
    
    var cred = {
        username: username,
        password: password
    };
    
    try {
        // Call native with credentials json and get the result with boolean param
        NativeBridge.call("storeCredentials", cred, function(result) {
                          callback(result);
                          });
    } catch(e) {
        console.log(e);
        callback(false);
    }
};

SSO.prototype.removeCredentials = function(callback) {
    
    try {
        // Call native with credentials json and get the result with boolean param
        NativeBridge.call("removeCredentials", null, function(result) {
                          callback(result);
                          });
    } catch(e) {
        console.log(e);
        callback(false);
    }
};
