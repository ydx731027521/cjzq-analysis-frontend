export function getData(obj, url, tableName) {
  let currentPage = obj.currentPage
  let pageSize = obj.currentPageSize
  obj.$http.get(url, {
    params: {
      currentPage,
      pageSize
    }
  }).then(res => {
    if (res.status === 200 && res.data.status == 0) {
      let { data } = res.data
      obj[tableName] = data["items"]
      obj.loading = false
      obj.total = data.totalNum
    }
  })
}