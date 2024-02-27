// 抓包 炫迈小程序

const axios = require('axios'); // 面板需要 安装 AXIOS
const urls = {
  scanCodeVV: 'https://stride-mini.emdlz.com.cn/api/mini/lottery/scanCodeV2'
};

async function postRequests(users) {
  const promises = users.map(user => {
    const data = {
      "activityCode2": "",
      "activityCode": "lottery_10",
      "appId": 'wx88058d3396ba51cb', 
      "province": "XX省", // 自定义省份
      "nation": "中国",
      "scene": 1089,
      "code": '045MVP' + Math.floor(Math.random() * 900 + 100).toString(), // 生成一个随机的三位数
      "lat": 23.130452288995162,
      "memberId": user.memberId,
      "city": "XX市", // 自定义市区
      "district": "XX区", // 自定义区域
      "sceneId": 10010,
      "lng": 113.36908388535966,
      "openId": user.openId, 
    };
   
    let currentTimestamp = Date.now(); // 生成当前时间戳

    const config = {
      headers: {
        'Host': 'stride-mini.emdlz.com.cn',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'authorization': user.authorization,
        'time':currentTimestamp,
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'Referer': 'https://servicewechat.com/wx88058d3396ba51cb/230/page-frame.html'

       }
    };                                  
    return axios.post(urls.scanCodeVV, data, config);                           
  });

  try {
    const responses = await Promise.all(promises);
    responses.forEach((response, i) => {
      console.log(`user ${users[i].userName}: `, response.data);
    });
  } catch (error) {
    console.error(error);
  }
}


const users = [
  {userName:'游客', memberId:'你的MEMBERID', openId:'你的OPENID', authorization:'你的AUTHORIZETION'},
];
postRequests(users);
