import { requestPort } from './requestPort';

export const articleColumn = ($axios)=> {
  return {
    getPositionAdvByType(position) {
      return $axios({
        url: `${requestPort.config}/officalHome/getPositionAdvByType/${position}`,
        method: 'get',
      })
    },
    queryRecommendArticle(type) {
      return $axios({
        url: `${requestPort.config}/userMergePage/queryRecommendArticle/${type}`,
        method: 'get',
      })
    },
    queryColumnAndCategoryList() {
      return $axios({
        url: `${requestPort.config}/userMergePage/queryColumnAndCategoryList`,
        method: 'get',
      })
    },
    articleShow(id) {
      return $axios({
        url: `${requestPort.config}/userMergePage/articleShow/${id}`,
        method: 'get',
      })
    },
    querySidebar() {
      return $axios({
        url: `${requestPort.config}/userMergePage/querySidebar`,
        method: 'get',
      })
    },
    submitClue(phone) {
      return $axios({
        url: `${requestPort.config}/userMergePage/submitClue/${phone}`,
        method: 'get',
      })
    },
    queryArticle(data) {
      return $axios({
        url: `${requestPort.config}/userMergePage/queryArticle`,
        method: 'post',
        data
      })
    },
  }
}
