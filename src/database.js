//////////////////////////////////////////////////////////
// Factory Pattern
//////////////////////////////////////////////////////////

'use strict';

function Database() {

  return {

    save: function (dataObj, callback) {
      // nothing......
    },

    list: function () {
      // nothing......
    }

  };
}

module.exports = Database();


//////////////////////////////////////////////////////////
// Class Pattern
//////////////////////////////////////////////////////////

// 'use strict';
//
// // Constructor
// function Database() {
//
// }
//
// // Class methods
// Database.prototype.save = function (userObj, callback) {
//   console.log(userObj);
// };
//
// module.exports = Database;
