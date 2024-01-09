export default ({ app: { $request } }, inject) => {
  inject('api', {
    getRelatedLink() {
      return $request.get('/config/aboutUs/getRelatedLink')
    },
    showIndexTeacher(data) {
      return $request.post('/config/aboutUs/showIndexTeacher',data)
    },
  })
}
