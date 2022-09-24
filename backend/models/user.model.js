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
  User.editDetails = editDetails;
  
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
                'user': user,
                'message': 'User Succesfully Logedin'
            })
        
        }
    }
}

function editDetails(id, name, email, password){
    
    console.log(id,name, email , password);
        
    return new Promise(editUserDetailsPromise);
    
    function editUserDetailsPromise(resolve, reject) {
        return server.models.user.findOne({
            'where': {
                'id': id
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
            var values = { 
                name: name ? name: user.name,
                email: email ? email : user.email,
                password: password ? password: user.password
            };
            var selector = { 
                where: {
                    id
                }
            };
            return server.models.user.update(values, selector).then(onUserDetailsUpdated)
            .catch(reject);
            
            function onUserDetailsUpdated(user_id){
                return server.models.user.findOne({
                    'where': {
                        'id': user_id
                    }
                })
                    .then(onUserFound)
                    .catch(reject);
                    
                function onUserFound(user){
                    console.log("user is -> ",user);
                    return resolve({
                        'error': false,
                        'message': 'details was updated', //'failed to create domain, name collision',
                        'statusCode': 200,
                        'user': user
                    });  
                }    
                         
            }
        }
    }
}



