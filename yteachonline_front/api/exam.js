import request from '@/utils/request_exam'

export default {
  getExamList() {
    return request({
      url: `/examservice/exam/list`,
      method: 'get',
    })
  },
  getExamId(id){
    return request({
      url: `/examservice/exam/getExam/${id}`,
      method: 'get',
    })
  },
  getByExamId(examId){
    return request({
      url: `/examservice/examExamPaper/getByExamId/${examId}`,
      method: 'post',
    })
  },
  getPaperQuestion(paperId){
    return request({
      url: `/examservice/question/getPaperQuestion/${paperId}`,
      method: 'post',
    })
  },

  addAnswer(paperAnswer){
    return request({
      url: `/examservice/examQuestionAnswer/addAnswer`,
      method: 'post',
      data: paperAnswer
    })
  },
  checkExamIdAndUserId(examId,userId){
    return request({
      url: `/examservice/examQuestionAnswer/checkExamIdAndUserId/${examId}/${userId}`,
      method: 'get',
    })
  },
  getFinalScore(examId,userId){
    return request({
      url: `/examservice/examQuestionAnswer/getFinalScore/${examId}/${userId}`,
      method: 'get',
    })
  }

}