export const showLoading = (message = '加载中...') => {
  showLoadingToast({
    message,
    forbidClick: true,
  })
  return closeToast
}

export const showMessage = (message = '加载中...') => {
  let opts = {
    message: '',
    forbidClick: true,
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
