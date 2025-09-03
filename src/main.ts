import { createApp } from 'vue'
import './style.css'
import { AdminContainer, AdminAuth } from '@xysfe/admin-menu-vue3'
import ElementPlus, { ElSubMenu } from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import { createPinia } from "pinia";
import router from './router/index'
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(AdminContainer, { router })
app.use(AdminAuth)
app.use(ElementPlus)
app.component(
  // 注册的名字
  'el-submenu',
  ElSubMenu
)
// el-submenu
app.mount("#app");

