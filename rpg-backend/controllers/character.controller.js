const moduleModel = require("../models/module.model");
const Character = moduleModel.getCharacterModel();
const User = moduleModel.getUserModel();

exports.getCharacters = function (req, res) {
    Character.find({user: req.client.id}, function(err, characters) {
        res.status(200).send(characters || []);
     });
};
exports.createCharacter = function (req, res) {
    const character = new Character({user: req.client, name : "Test-"+makeid(3), level: 3});
    character.save((err,result)=> {
        if(err) {
            res.status(500).send({message:err.errmsg});
        }else{
            req.client.characters.push(result._id);
            req.client.save((errUser,resultUser)=> {
                if(errUser) {
                    res.status(500).send({message:errUser});
                }else{
                    res.status(200).send({message:resultUser});
                }
            });
        }
    });
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}