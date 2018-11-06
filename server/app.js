/*
 *
 * Possible command line arguments
 *
 * https    : whether to run in HTTPS mode
 * ssl_cert : location of ssl certificate file  (default: ./certs/key.pem)
 * ssl_key  : location of ssl key file          (default: ./certs/cert.pem)
 * ssl_ca   : location of ca file if using one  (default: ./certs/ca.pem)
 */

/*
|--------------------------------------------------------------------------
| Imports and Basic Setup
|--------------------------------------------------------------------------
|
| Set up SSL, config a globally viewable basepath (__base), and 
| require node modules
|
*/

global.basePath = __dirname + '/';

let express   = require('express'),
    path      = require('path'),
    fs        = require('fs'),
    app       = express(),
    http      = require('http'),
    https     = require('https'),
    cors      = require('cors'),
    helmet    = require('helmet'),
    argv      = require('yargs').argv,        //grabs our app arguments
    colors    = require('colors'),
    port      = argv.port || process.env.PORT || 3002,
    env       = process.env.NODE_ENV || 'development';

const staticDir   = `./${env}`;
let sslConfig = (()=> {
    if(argv.https) {
        let certPath = argv.ssl_cert,
            keyPath  = argv.ssl_key,
            caPath   = argv.ssl_ca,
            config   = { https : true, options : {} };      

            if(caPath) {
                config.options.ca = fs.readFileSync(caPath);
            }
            else if(keyPath && certPath) {
                config.options.key  = fs.readFileSync(keyPath);
                config.options.cert = fs.readFileSync(certPath);
            }
            else {
                console.error('https flag requires "cert" and "key" or "ca" file parameters');
                process.exit();
            }

        return config;
    }
    else return { https : false };
})();

// disable layout
app.set("view options", { layout: false });
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//attach middleware to server
app.use(express.static(path.join(__dirname, 'public',staticDir)));
app.use(helmet());
app.use(cors());

/*
|--------------------------------------------------------------------------
| Front End Routes
|--------------------------------------------------------------------------
|
| Routes that should redirect to our main front end app
| are listed in this section
|
*/

function renderMainApp (req,res) {
    res.render(
        path.join(__dirname,'public', staticDir, 'index.html')
    );
}

app.get('/', renderMainApp);

/*
|--------------------------------------------------------------------------
| Errors
|--------------------------------------------------------------------------
|
| Generic 404 code for resources that are not found
|
*/

app.get('*', (req, res)=> {
    res.status(404).send(
        `<p>Sorry, the page you requested cannot be found. </p>
         <p>You can return to the main site by <a href="/">clicking here</p>.
         `
    );
});

/*
|--------------------------------------------------------------------------
| Start up the Server
|--------------------------------------------------------------------------
|
| Based on whether we're in SSL or not, launch a corresponding express server
| and give some an informative prompt to the user.
|
*/

let startServer = server => {
    let host    = server.address().address,
        port    = server.address().port,
        version = require('./../package.json').version,
        appName = require('./../package.json').name,
        protocol= (sslConfig.https ? 'https' : 'http');

    host = ((host == '0.0.0.0'|| host == '::') ? 'localhost' : host);

    console.log('%s '.white + '[v%s] %s', appName, version, argv.dev ? '(DEV MODE)' : '');
    console.log('-> currently running at ' + protocol.blue.bold + '://%s:%s'.blue.bold +
                ' in HTTP %s mode', host, port, sslConfig.https ? 'Secure' : 'Insecure');
    if(!sslConfig.https) {
        console.log('(to enable HTTPS, run app with the flags "https", "ssl_cert" and "ssl_key")');
    }

    return server;
};

let protocolSrc = sslConfig.https ? https : http;

let serverArgs = [ app ];

if(sslConfig.https) {
    serverArgs.splice(0,0,sslConfig.options);
}

let server =  protocolSrc.createServer(...serverArgs)
                    .listen(port, () => startServer(server) );