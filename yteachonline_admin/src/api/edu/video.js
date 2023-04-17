import request from '@/utils/request'
export default {
    deleteVideo(videoId) {
      return request({
        url: `/eduservice/video/deleteVideo/${videoId}`,
        method: 'delete'
      })
    },
  
    addVideo(video) {
      return request({
        url: `/eduservice/video/addVideo`,
        method: 'post',
        data: video
      })
    },
  
    getVideoInfo(videoId) {
      return request({
        url: `/eduservice/video/getVideoInfoById/${videoId}`,
        method: 'get'
      })
    },

    updateVideoInfo(video) {
      return request({
        url: `/eduservice/video/updateVideoInfo`,
        method: 'post',
        data: video
      })
    }
  }