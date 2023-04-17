import request from '@/utils/request'
export default {
    deleteVideobyId(id) {
      return request({
        url: `/admin/vod/video/removeVideo/${id}`,
        method: 'delete'
      })
    }
}