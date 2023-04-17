import request from '@/utils/request'
export default {

    getAllChapterVideo(courseId){
        return request({
          url: `/eduservice/chapter/getChapterVideo/${courseId}`,
          method: 'get'
      })
    },
    removeChapterById(chapterId) {
      return request({
        url: `/eduservice/chapter/${chapterId}`,
        method: 'delete'
      })
    },
  
    addChapter(chapter) {
      return request({
        url: `/eduservice/chapter/addChapter`,
        method: 'post',
        data: chapter
      })
    },
  
    getChapterById(chapterId) {
      return request({
        url: `/eduservice/chapter/getChapterInfo/${chapterId}`,
        method: 'get'
      })
    },

    updateChapterById(chapter) {
      return request({
        url: `/eduservice/chapter/updateChapter`,
        method: 'post',
        data: chapter
      })
    }
  }