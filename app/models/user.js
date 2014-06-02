var bcrypt = require('bcrypt');
var userCollection = global.nss.db.collection('users');

class User{
  static register(obj, fn){
    var user = new User();
    user.email = obj.email;
    user.password = bcrypt.hashSync(obj.password, 8);
    userCollection.save(user, ()=>fn(user));
  }
}

module.exports = User;
