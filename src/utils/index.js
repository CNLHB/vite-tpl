import { showLoading } from './loading'

function appGlobalPropertiesUse(app) {
  app.config.globalProperties.$loading = showLoading
}

export { appGlobalPropertiesUse }
