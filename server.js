const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
	saveUninitialized: true,
	resave: false,
	rolling: true,
	name: 'currentUser',
	secret: 'kmklkmklkmklkm',
	cookie: {
		secure: false,
		httpOnly: false,
		maxAge: 86400 * 1000
	}
}));
app.use(cookieParser('hjhbhjhbhjsfdsdsasd'));

app.use(express.static(path.resolve('src', 'client', 'public')));

require(path.resolve('src', 'server', 'config', 'db'));
require(path.resolve('src', 'server', 'config', 'routes'))(app);

app.listen(port, () => console.log(`listening on port ${port}`));

