const User = require('./models/User');
const bcrypt = require('bcrypt');
async function makeAdmine() {
    try {
        let user = await User.findOne({ email: 'sartajsaifi1000@gmail.com' });
        if (user) {
            console.log("USER UPDATED.......")
        } else {
            user = new User();
        user.firstName = 'SARTAJ';
        user.lastName = 'SAIFI';
        user.email = 'sartajsaifi1000@gmail.com';
        let encryptredPassword = bcrypt.hashSync('123456', 10);
        user.password = encryptredPassword;
        user.userType = 'Admin';
        await user.save();
        console.log('USER SAVED SUCESSFULLY........');
        }
    } catch (error) {
        console.log(error)
    }
} module.exports = makeAdmine;