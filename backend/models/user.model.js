const server = require("../../server");
exports.namespace = 'user';
exports.model = model;


function model(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
  
  User.register = register;
  User.login = login;
  
  return User;


}

function register(name, email, password){
   
    
    return new Promise(createUserPromise);
    
    function createUserPromise(resolve, reject) {
        return server.models.user.findOne({
            'where': {
                'email': email
            }
        })
            .then(onUserFound)
            .catch(reject);

        function onUserFound(userWithSameEmail) {
            if(userWithSameEmail) {
                return resolve({
                    'error': true,
                    'message': 'this user email is already taken', //'failed to create domain, name collision',
                    'statusCode': 400
                });
            }

            return server.models.user.create({
                'name': name,
                'email': email,
                'password': password
            }).then(resolve).catch(reject);
            
            
        }
    }
}

function login(email, password){
   
    
    return new Promise(loginUserPromise);
    
    function loginUserPromise(resolve, reject) {
        return server.models.user.findOne({
            'where': {
                'email': email
            }
        })
            .then(onUserFound)
            .catch(reject);

        function onUserFound(user) {
            if(!user) {
                return resolve({
                    'error': true,
                    'message': 'User Not Found', //'failed to create domain, name collision',
                    'statusCode': 400
                });
            }
            if(user.password !== password) {
                return resolve({
                    'error': true,
                    'message': 'Password Incorrect For This User', //'failed to create domain, name collision',
                    'statusCode': 400
                });
            }
            return resolve({
                'error': false,
                'message': 'User Succesfully Logedin'
            })
        
        }
    }
}



