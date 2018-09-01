const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres1@localhost:5432/notop');


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const UserModel = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['na', 'euw', 'eune', 'kr']],
    }
  },
});

UserModel.sync({force: false}).then((err) => {
  if (err) { console.error(err); } else { console.log('db synced'); }
});

module.exports = UserModel;