// return whether the script is running on iOS platform
function isIOS() {
    return navigator.userAgent.match(/iPhone/i) ||navigator.userAgent.match(/iPod/i);
}

// return whether the script is running on iOS platform
function isAndroid() {
    return navigator.userAgent.match(/Android/i);
}

// return whether the script is running on iOS platform
function loadScript(src, callback) {
    var script,
        loaded = false;

    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = script.onreadystatechange = function() {
        if (!loaded && (!this.readyState || this.readyState == 'complete')) {
            loaded = true;

            if (typeof(callback) === 'function') {
                callback();
            }
        }
    };

    document.getElementsByTagName('head')[0].appendChild(script);
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

// called when platform is ready
function bootstrap() {
    // implement ssoReady that is called when SSO information can be requested
    if (typeof(ssoReady) === 'function') {
        ssoReady();
    }
}

// load platform code and bootstrap the application
if (isIOS()) {
    loadScript('ios/SSO.js', function() {
        bootstrap();
    });
} else if (isAndroid()) {
    loadScript('android/SSO.js', function() {
        bootstrap();
    });
} else {
    loadScript('browser/SSO.js', function() {
        bootstrap();
    });
}