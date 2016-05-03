var Database = require('./database');

var setupNewUser = function (info, callback) {
  var user = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  try {
    Database.save(user, callback);
  }
  catch (err) {
    callback(err);
  }
};

module.exports = setupNewUser;
