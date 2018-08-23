var OSS = require('ali-oss').Wrapper
export function client(data) {
  var client = new OSS({
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: ''
  })  //后端提供数据
  return client
}