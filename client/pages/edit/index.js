import {
  HOST,
  UploadImageApi
} from '../../http/api'
import request from '../../http/request'

Page({

  data: {
    content: '',
    time: '',
    type: '',
    images: [],
    showImages: []
  },
  contentChangeAction(ev) {
    this.setData({
      content: ev.detail.value
    });
  },
  async selectImageAction() {
    const result = await wx.chooseImage({
      sourceType: ['album', 'camera'],
      count: 3 - this.data.images.length
    });
    if (result.errMsg === "chooseImage:ok") {
      this.setData({
        showImages: result.tempFilePaths
      });

      // 上传照片到服务器
      const images = await request.uploadImages(UploadImageApi, result.tempFilePaths);
      this.setData({
        // showImages: images.map(item => (HOST + item)),
        images
      });
    }

  },



})