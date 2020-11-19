import {
  HOST
} from './api'
class Request {
  // 设置服务器的地址
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  };

  async request(method, url, data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        method,
        url: this.baseUrl + url,
        data,
        header,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            reject(res.data.message);
          }
        },
        fail(error) {
          reject(error);
        }
      });
    });
  };

  get(url, data = {}) {
    return this.request('GET', url, data);
  };

  post(url, data = {}) {
    return this.request('POST', url, data);
  };

  put(url, data = {}) {
    return this.request('PUT', url, data);
  };

  async uploadImages(url, filePaths = []) {
    const result = await Promise.all(
      filePaths.map(filePath => {
        return new Promise((resolve, reject) => {
          wx.uploadFile({
            filePath: filePath,
            name: 'images',
            url: this.baseUrl + url,
            success(res) {
              const {
                imagePath
              } = JSON.parse(res.data);
              resolve(imagePath);
            }
          })
        })
      })
    );
    return result;
  }
}

export default new Request(HOST);