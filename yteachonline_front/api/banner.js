import request from '@/utils/request'
export default {
  getAllBanner() {
    return request({
      url: `/cmsservice/bannerfront/getAllBanner`,
      method: 'get'
    })
  }
}