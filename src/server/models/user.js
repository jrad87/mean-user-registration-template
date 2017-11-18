const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    password: {
	type: String,
	required: [true, 'Password is reauired'],
	minlength: [8, 'Password must be at least 8 characters']
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    bcrypt.gensalt(10, (error, salt) => {
	if(error) return next(error);
	bcrypt.hash(this.password, salt, (error, hashedPW) => {
	    if (error) return next(error);
	    this.password = hashedPW;
	    return next();
	});
    });
});

userSchema.statics.verifyPassword = function(candidate, user){
    return new Promise( (resolve, reject) => {
	bcrypt.compare(candidate, hashed, (success, error) => {
	    if(error) reject(error);
	    success ? resolve(user) : reject(new Error('Invalid Credentials'));
	});	
    });
}

module.exports = mongoose.model('User', userSchema);

