import request from '@/utils/request'

export default {
  //根据手机号码发送短信
  getEmailCode(email) {
    return request({
      url: `/ucenterservice/ucenter/sendEmail`,
      method: 'post',
      data: email
    })
  },
  //用户注册
  UserRegister(userForm) {
    return request({
      url: `/ucenterservice/ucenter/register`,
      method: 'post',
      data: userForm
    })
  }
}