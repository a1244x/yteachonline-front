import request from '@/utils/request'

export default {

  addCourseInfo(courseInfo) {
        return request({
        url: `/eduservice/course/addCourseInfo`,
        method: 'post',
        data: courseInfo
      })
    },
  getListTeacher(){
      return request({
        url: `/eduservice/teacher/findAll`,
        method: 'get'
    })
  },
  getCourseInfoById(id) {
    return request({
        url: `/eduservice/course/getCourseInfo/${id}`,
        method: 'get'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
        url: `/eduservice/course/updateCourseInfo`,
        method: 'post',
        data: courseInfo
    })
  },
  getPublishCourseInfo(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },
  publishCourse(id) {
    return request({
      url: `/eduservice/course/publishCourse/${id}`,
      method: 'post'
    })
  },

  getCoursePageList(page, limit, courseQuery) {
    return request({
      url: `/eduservice/course/coursePage/${page}/${limit}`,
      method: 'get',
      params: courseQuery
    })
  },
  removeById(id) {
    return request({
        url: `/eduservice/course/deleteCourse/${id}`,
        method: 'delete'
    })
}

}