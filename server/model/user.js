const {model} = require('mongoose');

module.exports = model('user', {
  openid: String,
  avatarUrl:{
    type:String,
    required:false
  },
  nickName: {
    type: String,
    required: false
  },
  pet:{
    type:String,
    required:false,
  }

})