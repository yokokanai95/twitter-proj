'use strict';

let path            = require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    twit            = require('twit');


let app = express();
app.use(bodyParser.json({}));
app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');
app.use(bodyParser.urlencoded({ extended: true }));
let staticPath = path.join(__dirname, '../../public');
app.use(express.static(staticPath));
app.use(logger('combined'));

let twitter = new twit({
    consumer_key: "kwfjAyzPCO5qjvKbbB0EShUwr",
    consumer_secret: "ASK YOKO",
    app_only_auth: true
});

app.get('/v1/user/:username/tweets', function(req, res) {
    console.log('REQUEST BEGINS');
    let params = { 
        screen_name: req.params.username.toLowerCase(),
        count: 200,
        trim_user: 1,
        exclude_replies: 1,
        include_rts: 0
    }
    if (req.query.max_id) {
        params.max_id = req.query.max_id;
    }

    let tweets = twitter.get('statuses/user_timeline',
        params,
        function(err, data, response) {
            if (err) {
                res.status(404).send({ error: err });
            } else {
                res.status(200).send(data);
            }
        });
});

app.get('*', function(req, res) {
    res.render('base', {
        title: 'TWITTER APP'
    });
});



let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});