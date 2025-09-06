export const showLoading = (message = '加载中...') => {
  showLoadingToast({
    message,
    forbidClick: true,
  })
  return closeToast
}
export const hideLoading = () => {
  closeToast()
}
export const showMessage = (message = '') => {
  let opts = {
    message: '',
    forbidClick: false,
    duration: 3 * 1000,
  }
  if (!message) {
    return
  }
  if (typeof message === 'string') {
    opts.message = message
  } else {
    opts = message
  }
  showToast(opts)
}
