var http = require('http'),
    querystring = require('querystring'),
    Cookies = require('cookies'),
    crypto = require('crypto'),
    fs = require('fs'),
    path = require('path'),
    cookies,
    sessions = {},
    host = '127.0.0.1',
    port = 80;

if (process.argv.length >= 3) {
    host = process.argv[2];
}

if (process.argv.length >= 4) {
    port = parseInt(process.argv[3], 10);
}

console.log('Starting server on ' + host + ':' + port);

http.createServer(function(request, response) {
    cookies = new Cookies(request, response);

    var postData = '',
        parameters = {};

    try {
        if (request.method === 'POST') {
            request.on('data', function (data) {
                postData += data;
            });
            request.on('end', function () {
                parameters = querystring.parse(postData);

                handleRequest(request.url, parameters, response, cookies, request);
            });
        } else {
            if (!sendFile(request.url, response)) {
                handleRequest(request.url, {}, response, cookies, request);
            }
        }
    } catch (e) {
        console.log('Error occured', e);
    }
}).listen(port, host);

function handleRequest(url, parameters, response, cookies, request) {
    var sessionId = cookies.get('session-id'),
        sessionExists = typeof(sessionId) === 'string' && typeof(sessions[sessionId]) !== 'undefined';

    if (request.url === '/login' && typeof(parameters.username) === 'string') {
        login(parameters.username, parameters.password);

        response.writeHead(302, {'Location': '/'});
        response.end();

        return;
    } else if (request.url === '/logout') {
        if (sessionExists) {
            delete sessions[sessionId];

            cookies.set('session-id'); // remove it
        }

        response.writeHead(302, {'Location': '/'});
        response.end();

        return;
    }

    response.writeHead(200, {'Content-Type': 'text/html'});

    if (sessionExists) {
        response.end(render('logged-in.html', {
            sessionId: sessionId,
            username: sessions[sessionId].username,
            password: sessions[sessionId].password
        }));
    } else {
        response.end(render('login.html'));
    }
}

function sendFile(url, response) {
    var mimeTypes = {
            'html': 'text/html',
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'png': 'image/png',
            'js': 'text/javascript',
            'css': 'text/css'
        },
        filename = url.substr(1),
        extension,
        mimeType;

    if (filename.length === 0 || !fs.existsSync(filename)) {
        return false;
    }

    extension = path.extname(filename).split('.')[1];
    mimeType = mimeTypes[extension] || 'text/plain';

    response.writeHead(200, {'Content-Type': mimeType});

    fs.createReadStream(filename).pipe(response);

    console.log('sending file', filename, mimeType);

    return true;
}

function generateSessionId() {
    return crypto.createHash('sha256').update(Math.random().toString()).digest('hex');
}

function render(templateFilename, data) {
    var templateContent = fs.readFileSync(templateFilename, { encoding: 'UTF8' }),
        key;

    if (typeof(data) === 'object' && data !== null) {
        for (key in data) {
            templateContent = templateContent.replace(new RegExp('{' + key + '}', 'g'), data[key]);
        }
    }

    return templateContent;
}

function login(username, password) {
    var sessionId = generateSessionId();

    sessions[sessionId] = {
        username: username,
        password: password
    };

    cookies.set('session-id', sessionId);

    console.log('login', username, password, generateSessionId());
}