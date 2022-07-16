const server = require("../../server");
exports.namespace = 'item';
exports.model = model;

function model(sequelize, DataTypes) {
  const Item = sequelize.define("item", {
    text: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });
  Item.addItem = addItem;
  Item.getUserItems = getUserItems;
  Item.removeItem = removeItem;
  Item.editItem = editItem;
  
  return Item;


}

function addItem(text, user_id){
   
  return new Promise(createItemPromise);
  
  function createItemPromise(resolve, reject) {
        return server.models.item.create({
          'text': text,
          'user_id': user_id,
      }).then(resolve).catch(reject); 
        
  }
}

function getUserItems(user_id){
  return new Promise(getUserItems);
  
  function getUserItems(resolve, reject){
    return server.models.item.findAll({
      where:{
        'user_id': user_id
      }
  }).then(resolve).catch(reject); 
  }
}
function removeItem(item_id){

  return new Promise(removeOneItem);
  
  function removeOneItem(reslove, reject){
    return server.models.item.destroy({
      where: {
        id: item_id
      }
  }).then(reslove).catch(reject);
    
  }
}

function editItem(newValue){
  return new Promise(editOneItem);
  
  function editOneItem(reslove, reject){
    return server.models.item.update(
      newValue,
      {
        where: { id: newValue.id },
      }
    ).then(reslove).catch(reject);
  }
}