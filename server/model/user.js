const {model} = require('mongoose');

module.exports = model('user', {
  openid: String,
  nickName: {
    type: String,
    required: false
  }
})