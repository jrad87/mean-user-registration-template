const auth = require('../controllers/auth');

module.exports = function(app){
    app.get('/api/auth/login', auth.login);
}

