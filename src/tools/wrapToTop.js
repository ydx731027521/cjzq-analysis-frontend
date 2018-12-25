export const wrapToTop = (ele) => {
  ele.$nextTick(() => {
    document.querySelector(".wrap").scrollTop = 0
  })
}