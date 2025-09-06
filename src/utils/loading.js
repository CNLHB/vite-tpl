import { showLoadingToast, closeToast } from 'vant';

export const showLoading = (message = '加载中...') => {
  showLoadingToast({
    message,
    forbidClick: true,
  })
  return closeToast
}
