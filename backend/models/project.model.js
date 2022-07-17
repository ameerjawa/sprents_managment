const server = require("../../server");
exports.namespace = 'project';
exports.model = model;

function model(sequelize, DataTypes) {
  const Project = sequelize.define("project", {
    text: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });
  Project.addproject = addproject;
  Project.getUserprojects = getUserprojects;
  Project.removeproject = removeproject;
  Project.editproject = editproject;
  
  return Project;


}

function addproject(text, user_id){
   
  return new Promise(createprojectPromise);
  
  function createprojectPromise(resolve, reject) {
        return server.models.project.create({
          'text': text,
          'user_id': user_id,
      }).then(resolve).catch(reject); 
        
  }
}

function getUserprojects(user_id){
  return new Promise(getUserprojects);
  
  function getUserprojects(resolve, reject){
    return server.models.project.findAll({
      where:{
        'user_id': user_id
      }
  }).then(resolve).catch(reject); 
  }
}
function removeproject(project_id){

  return new Promise(removeOneproject);
  
  function removeOneproject(reslove, reject){
    return server.models.project.destroy({
      where: {
        id: project_id
      }
  }).then(reslove).catch(reject);
    
  }
}

function editproject(newValue){
  return new Promise(editOneproject);
  
  function editOneproject(reslove, reject){
    return server.models.project.update(
      newValue,
      {
        where: { id: newValue.id },
      }
    ).then(reslove).catch(reject);
  }
}