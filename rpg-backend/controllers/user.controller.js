const moduleModel = require("../models/module.model");
const User = moduleModel.getUserModel();
var jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || "maiconSantanaKupping";
exports.getUsers = function (req, res) {
    User.find({}, function(err, Users) {
        res.status(200).send(Users || []);
     });
};
var login = function (req, res) {
    // console.log(res);
    console.log("Login...",req.body.username);
    User.findOne({"username":req.body.username}, function(err, user) {
        if(err)
        {
            res.status(500).send(err);
        }else if(!user){
            res.status(400).send("Username or Password Invalid");
        }else{

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err || !isMatch){ res.status(400).send("Username or Password Invalid");}else{
                const token = jwt.sign({
                    data: {id:user._id,organizer:user.organizer,attendee:user.attendee}
                }, jwtSecret, { expiresIn: '24h' });
                res.status(200).json({token:token});
            }
        });
        }
     });
};
exports.login = login
exports.getUserById = function(id) {
    return User.findOne({_id:id});
}
exports.insertUser = function (req, res) {
    if(req.body.username === "test12345678" && !req.insertUser) {
        login(req,res);
    }else{
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        User.findOne({$or:[{email:user.email},{username:user.username}]}).then(resUser=>{
            if(!resUser){
                user.save(function (err, results) {
                    if(err) {
                        console.error("Error",err);
                        res.status(500).send(err);
                    }else{
                        const token = jwt.sign({
                            data: {id:results._id,organizer:results.organizer,attendee:results.attendee}
                        }, jwtSecret, { expiresIn: '24h' });
                        res.status(200).json({token:token});
                    }
                });
            }else{
                if(resUser.email == user.email && resUser.username == user.username){
                    res.status(403).send("Email and Username already exists");
                }else if(resUser.email == user.email){
                    res.status(403).send("Email already exists");
                }else if(resUser.username == user.username){
                    res.status(403).send("Username already exists");
                }
            }
        }).catch(errUser=>{
            res.status(500).json({error:errUser.message});
        });
    }
};