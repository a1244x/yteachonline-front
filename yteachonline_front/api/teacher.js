import request from '@/utils/request'
export default {
  getPageList(current, limit) {   
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${current}/${limit}`,
      method: 'get'
    })
  },
  getById(teacherId) {
    return request({
        url: `/eduservice/teacherfront/getTeacherInfo/${teacherId}`,
        method: 'get'
    })
}
}