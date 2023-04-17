import request from '@/utils/request'
export default {
  //登录
  userLogin(userInfo) {
    return request({
      url: `/ucenterservice/ucenter/login`,
      method: 'post',
      data: userInfo
    })
  },
  //根据token获取用户信息
  getLoginInfo() {
    return request({
      url: `/ucenterservice/ucenter/getLoginInfo`,
      method: 'get',
    })
    //headers: {'token': cookie.get('guli_token')} 
  }
}