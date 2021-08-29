var jwt = require('jsonwebtoken');
const router = require("express").Router();
const userController = require('./controllers/user.controller');
const characterController = require('./controllers/character.controller');

router.get('/private/character', checkLogin, characterController.getCharacters);
router.post('/private/character',checkLogin, characterController.createCharacter);
router.get('/private/user', checkLogin, getUserName);
// router.get('/public/user', (req, res)=>{res.status(200).send("Test");});

module.exports = router;
const jwtSecret = process.env.JWT_SECRET || "maiconSantanaKupping";
function checkLogin(req,res,next) {
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization.replace("Bearer ",""), jwtSecret, function(err, decoded) {
            if(err){
                res.status(401).send(err);
            }else{
                if(decoded.data.id){
                    userController.getUserById(decoded.data.id).then(resUser=>{
                        if(resUser){
                            req.client = resUser;
                            return next();
                        }else{
                            res.status(401).send("Token not valid");
                        }
                    }).catch(errUser=>{
                        res.status(401).send("Token not valid");
                    });
                }else{
                    res.status(401).send("Token not valid");
                }
            }
        });
    }else{
        res.status(400).send("Token Required");
    }
}

function getUserName (req, res) {
    res.status(200).send({username:req.client.username});
};