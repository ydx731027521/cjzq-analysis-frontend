let baseUrl = "";
let host = window.document.location.host;

switch (process.env.NODE_ENV) {
  case "development":
    // wo
    // baseUrl = "http://10.246.9.104:9000"
    // wang
    // baseUrl = "http://10.246.164.21:9000";
    baseUrl = "http://10.246.164.1:9000"
    // zhuo
    // baseUrl = "http://10.246.9.81:9000"
    break;
  case "test":
    baseUrl = "http://" + host + "/back"; //测试环境
    break;
  case "production":
    baseUrl = "http://" + host + "/back"; //生产环境
    break;
}

export default baseUrl;