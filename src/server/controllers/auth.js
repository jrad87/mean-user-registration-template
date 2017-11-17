const User = require('mongoose').model('User');
const errorHandler = require('../utils/error-handler');

module.exports = {
  login(req, res){	
    User.findOne({username: req.body.username})
      .then(user => {
	if (!user) throw new Error('Invalid credentials');
	return user.verifyPassword(req.body.password, user.password);
      })
      .then(user => login(req, res, user)) 
      .catch(errorHandler.bind(response));
  },
  register(req, res){
    if(req.body.password !== req.body.confirmPW){ 
      errorHandler.call(response, new Error('Password must match confirmation'));
    } else {
      User.findOne({username: req.body.username})
	.then(user => {
	  if(user) throw new Error('');
	})
	.catch(errorHandler.bind(response));
    }
  },
  logout(req, res){
    
  }
}

function login(request, response, user){
  request.session.user = user.toObject();
  delete request.session.user.password;
  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 86400 * 1000);
  response.json(request.session.user);
}
