import request from '@/utils/request'
export default {
    getPaperListPage(current,limit,examPaperVo){
        return request({
            url: `/examservice/paper/pagePaper/${current}/${limit}`,
            method: 'post',
            data: examPaperVo
          })
    },
    
    getAllPaper() {
      return request({
        url: `/examservice/paper/list`,
        method: 'get'
      })
    },
    addPaper(examPaper) {
      return request({
          url: `/examservice/paper/addPaper`,
          method: 'post',
          data: examPaper
      })
    },
    getPaper(id){
      return request({
        url: `/examservice/paper/getPaper/${id}`,
        method: 'get',
      })
    },
    updatePaper(examPaper) {
      return request({
          url: `/examservice/paper/updatePaper`,
          method: 'post',
          data: examPaper
      })
    },
    removeById(id) {
        return request({
            url: `/examservice/paper/deletePaper/${id}`,
            method: 'delete'
        })
    },
    addPaperAndQuestion(PaperQuestion){
      return request({
        url: `/examservice/examPaperQuestion/addPaperIdAandQuestionId`,
        method: 'post',
        data: PaperQuestion
    })
    },
    getPaperQuestionPage(current1,limit1,examPaperQuestion){
      return request({
          url: `/examservice/examPaperQuestion/selectPaperId/${current1}/${limit1}`,
          method: 'post',
          data: examPaperQuestion
        })
    },
    deleteById(id) {
      return request({
          url: `/examservice/examPaperQuestion/deleteById/${id}`,
          method: 'delete'
      })
    },
    getScore(id){
      return request({
        url: `/examservice/examPaperQuestion/getScore/${id}`,
        method: 'post'
    })
    },
    

}