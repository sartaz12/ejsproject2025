const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
async function addUser(req, res) {
    try {
        // console.log(req.body, 'req.body');
        let user = new User(req.body);
        let encryptredPassword = bcrypt.hashSync(req.body.password, 10);
        // console.log(encryptredPassword, 'encryptredPassword');
        user.password = encryptredPassword;
        await user.save();
        // console.log("data saved  sucessfully....");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}
async function doLogin(req, res) {
    try {
        // console.log(req.body, 'req.body')
        let user = await User.findOne({ email: req.body.email });
        // console.log(user)
        if (user) {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                if (user.userType === 'Admin') {


                    let students = await Student.find({});
                    res.render('welcomeadmin', {
                        students: students
                    });
                }
                else {
                    res.render('welcomestudent');
                }
            } else {
                res.end('<h1>Invalid email/password...');
            }
        }

     else {
        res.end("<h1> User does not exsists...");
    }
} catch (err) {

}
}
module.exports = {
    addUser,
    doLogin
}