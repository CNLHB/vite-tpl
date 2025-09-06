import type { App } from "vue"
import { showLoading } from "./loading"

function appGlobalPropertiesUse(app: App) {
  app.config.globalProperties.$loading = showLoading
}

export {
  appGlobalPropertiesUse
}