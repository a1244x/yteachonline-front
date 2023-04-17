import request from '@/utils/request'
export default {
    getQuestionListPage(current,limit,examQuestionVo){
        return request({
            url: `/examservice/question/pageQuestion/${current}/${limit}`,
            method: 'post',
            data: examQuestionVo
          })
    },
    getAllQuestion() {
      return request({
        url: `/examservice/question/list`,
        method: 'get'
      })
    },
    addQuestion(examQuestion) {
      return request({
          url: `/examservice/question/addQuestion`,
          method: 'post',
          data: examQuestion
      })
    },
    getQuestion(id){
      return request({
        url: `/examservice/question/getQuestion/${id}`,
        method: 'get',
      })
    },
    updateQuestion(examQuestion) {
      return request({
          url: `/examservice/question/updateQuestion`,
          method: 'post',
          data: examQuestion
      })
    },
    removeById(id) {
        return request({
            url: `/examservice/question/deleteQuestion/${id}`,
            method: 'delete'
        })
    },
}