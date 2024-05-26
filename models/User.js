const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    const user = this;

    // Hash the passsword only if it has been modified (or is new)

    if(!user.isModified('password')) return next();

    try{
        // hash password generation
        const  salt = await bcrypt.genSalt(10);
        
        //has password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // override the plain password with the hashed one
        user.password = hashedPassword;
        next();
    }catch(err){
        next(err);
    }
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
};


//create Person model
const User = mongoose.model('User', userSchema);
module.exports = User;