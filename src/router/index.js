// router/index.ts
import { createRouter, createWebHistory } from "vue-router";

// 动态导入所有路由文件
const routeModules = import.meta.glob("./modules/*/*.ts", {
  eager: true,
});

// 收集所有路由
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home/index.vue"),
  },
];

Object.keys(routeModules).forEach((key) => {
  const module = routeModules[key];
  const moduleRoutes = module.default || module;

  if (Array.isArray(moduleRoutes)) {
    routes.push(...moduleRoutes);
  } else if (moduleRoutes) {
    routes.push(moduleRoutes);
  }
});
// import.meta.env.VITE_BASE_URL  env变量。
console.log("import.meta.env.VITE_BASE_URL", import.meta.env.VITE_BASE_URL);
// import.meta.env.BASE_URL + import.meta.env.VITE_BASE_URL
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});
// 开发环境下显示路由信息
if (import.meta.env.DEV) {
  console.log("Loaded routes:", router.getRoutes());
  const isLocal =
    import.meta.env.DEV && window.location.hostname === "localhost";
  // 开发local去除base影响
  if (isLocal) {
    router.isReady().then(() => {
      console.log("router isReady");
      router.push("/");
    });
  }
}
export default router;
