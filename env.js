module.exports={
  dev:{
    MODE:'development',
    // API_URL:'http://10.204.42.157:9091',
    API_URL:'https://test.talk915.com',
    BASE_PATH:'http://localhost',
    IM_LINK:'https://test.usongshu.com/im/index.html#/robot',
  },
  test:{
    MODE:'test',
    API_URL:'https://test.talk915.com',
    BASE_PATH:'https://test.talk915.com',
    IM_LINK:'https://test.usongshu.com/im/index.html#/robot',
  },
  prod:{
    MODE:'production',
    API_URL:'https://www.talk915.com',
    BASE_PATH:'https://www.talk915.com',
    IM_LINK:'https://platform.usongshu.com/im/index.html#/robot',
  }
}