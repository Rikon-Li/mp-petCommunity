const {model} = require('mongoose');

module.exports = model('forum', {
  content:{
    type:String
  },
  openid: {
    type: String
  },
  support: {
    type: String,
    default:"0"
  },
  time:{
      type:String,
  },
  avatarUrl:{
      type:String
  },
  nickName:{
      type:String
  },
  pic:{
    type:Array
  }

})