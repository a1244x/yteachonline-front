import request from '@/utils/request'
export default {
    getExamListPage(current,limit,examExamVo){
        return request({
            url: `/examservice/exam/pageExam/${current}/${limit}`,
            method: 'post',
            data: examExamVo
          })
    },
    getAllExam() {
      return request({
        url: `/examservice/exam/list`,
        method: 'get'
      })
    },
    addExam(examExam) {
      return request({
          url: `/examservice/exam/addExam`,
          method: 'post',
          data: examExam
      })
    },
    addExamAndPaper(examExamPaper) {
      return request({
          url: `/examservice/examExamPaper/addExamAndPaper`,
          method: 'post',
          data: examExamPaper
      })
    },
    
    getExam(id){
      return request({
        url: `/examservice/exam/getExam/${id}`,
        method: 'get',
      })
    },
    updateExam(examExam) {
      return request({
          url: `/examservice/exam/updateExam`,
          method: 'post',
          data: examExam
      })
    },
    removeById(id) {
        return request({
            url: `/examservice/exam/deleteExam/${id}`,
            method: 'delete'
        })
    },
    getExamPaperPage(current1,limit1,getExamAndPaper){
      return request({
          url: `/examservice/examExamPaper/getExamAndPaper/${current1}/${limit1}`,
          method: 'post',
          data: getExamAndPaper
        })
  },
  deleteById(id) {
    return request({
        url: `/examservice/examExamPaper/deleteById/${id}`,
        method: 'delete'
    })
  },

}