exports.namespace = 'tutorial';
exports.model = model;

function model(sequelize, DataTypes) {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    published: {
      type: DataTypes.BOOLEAN
    }
  });
  return Tutorial;


}