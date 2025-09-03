// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 定义路由模块的类型
interface RouteModule {
  default?: RouteRecordRaw | RouteRecordRaw[]
  [key: string]: any
}

// 动态导入所有路由文件
const routeModules = import.meta.glob('./modules/*/*.ts', { eager: true }) as Record<string, RouteModule>

// 收集所有路由
const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'home',
  component: () => import('@/pages/home/index.vue')
}]

Object.keys(routeModules).forEach((key: string) => {
  const module = routeModules[key]
  const moduleRoutes = module.default || module

  if (Array.isArray(moduleRoutes)) {
    routes.push(...moduleRoutes)
  } else if (moduleRoutes) {
    routes.push(moduleRoutes as RouteRecordRaw)
  }
})
// import.meta.env.VITE_BASE_URL  env变量。
console.log('import.meta.env.VITE_BASE_URL', import.meta.env.VITE_BASE_URL);
// import.meta.env.BASE_URL + import.meta.env.VITE_BASE_URL
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})
// 开发环境下显示路由信息
if (import.meta.env.DEV) {
  console.log('Loaded routes:', router.getRoutes())
  const isLocal = import.meta.env.DEV && window.location.hostname === 'localhost'
  // 开发local去除base影响
  if (isLocal) {
    router.isReady().then(() => {
      router.push('/')
    })
  }
}
export default router
