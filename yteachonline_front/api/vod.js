import request from '@/utils/request'

export default {

  getPlayAuth(vid) {
    return request({
      url: `/admin/vod/video/getVideoPlay/${vid}`,
      method: 'get'
    })
  }

}