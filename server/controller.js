const UserModel = require('../db/index.js');

const controller = {
  post: (req, res) => {
    // console.log('params: ', req.params);
    let { username, region } = req.params;
    UserModel.findOrCreate({
      where: {
        username,
        region,
      }
    })
      .spread((userData, created) => {
        console.log('user, created: ', userData.dataValues, created);
        // res.status(created ? 202 : 200).send(userData.dataValues);
        res.redirect(`/stats/region=${userData.dataValues.region}/username=${userData.dataValues.username}`);
      })
      .catch(err => res.status(404).send(err));
  },

};

module.exports = controller;