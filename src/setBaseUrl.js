let baseUrl = "";
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "http://10.246.9.4:9000"
    // baseUrl = "http://10.246.9.2:9000"
    // baseUrl = "http://10.246.164.2:9000"
    // baseUrl = "http://10.246.9.67:9000"
    // baseUrl = "http://localhost:8080"
    break
  case 'test':
    baseUrl = process.env.VUE_APP_BASE_URL + "/back" //测试环境
    break
  case 'production':
    baseUrl = "https://www.cnblogs.com/XHappyness/p/7686267.html"   //生产环境
    break
}

export default baseUrl;
