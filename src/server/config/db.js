const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const js = new RegExp('.js$', 'i');
const modelsDir = path.resolve('src', 'server', 'models');

mongoose.connect('mongod://localhost/user-login-template_db');
mongoose.connection.on('connected', () => console.log('mongodb connected'));
mongoose.Promise = global.Promise;

fs.readdirSync(modelsDir).forEach(file => {
	if(js.test(file)) require(path.join(modelsDir, file));
});
