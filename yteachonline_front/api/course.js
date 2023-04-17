import request from '@/utils/request'
export default {
  getPageList(current, limit, courseInfo) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${current}/${limit}`,
      method: 'post',
      data: courseInfo
    })
  },
  // 获取课程二级分类
  getTreeList() {
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  },
  getById(courseId) {
    return request({
        url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
        method: 'get'
    })
}
}