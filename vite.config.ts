import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from "unplugin-vue-components/resolvers";
import VitePluginStyleInject from 'vite-plugin-style-inject';
import pkg from './package.json'
import path from "path";
const projectName = pkg.name;
const { NODE_ENV = '' } = process.env;
// https://vite.dev/config/
const env = loadEnv(NODE_ENV, process.cwd());
const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';
const isBeta = NODE_ENV === 'beta';
const isAdmin = env.VITE_IS_ADMIN === 'yes';

console.log('NODE_ENV', NODE_ENV, 'isAdmin', isAdmin, 'isDevelopment', isDevelopment, 'isBeta', isBeta, 'isProduction', isProduction);


/**
 * 根据项目配置生成 Rollup 输出选项
 * @param projectName 项目名称
 * @param isBeta 是否为 Beta 环境
 * @returns Rollup 输出选项
 */
const getRollupOptOptions = (projectName: string, isBeta: boolean) => {
  // Beta 环境且为管理员模式时的特殊配置
  if (isBeta && isAdmin) {
    return {
      // 将所有代码打包到单个文件
      manualChunks: () => 'app',
      // 入口文件命名
      entryFileNames: `${projectName}/js/app.js`,
      // 代码分割文件命名
      chunkFileNames: `${projectName}/js/app.js`,
    };
  }
  // 默认配置
  return {
    // 入口文件命名
    entryFileNames: () => `${projectName}/js/[name]-[hash].js`,
    // 代码分割文件命名
    chunkFileNames: (chunkInfo: any) => {
      // 提取页面目录名作为文件名
      const regex = /\/pages\/([^\/]+)\/.*\.vue$/;
      const match = chunkInfo.facadeModuleId?.match(regex) || [];
      const name = match[1] || '[name]';
      return `${projectName}/js/${name}-[hash].js`;
    },
    // 手动代码分割
    manualChunks: {
      vue: ["vue"],
    },
  };
};
export default defineConfig({
  base: isDevelopment ? "/static" : env.VITE_STATIC_URL,
  plugins: [
    // Vue 官方插件
    vue(),

    // 仅在 Beta 环境且为管理员模式时启用样式注入插件
    isBeta && isAdmin ? VitePluginStyleInject() : null,

    // 自动导入 Vue 相关 API
    AutoImport({
      imports: [
        // Vue 组合式 API
        {
          'vue': [
            'reactive',
            'computed',
            'ref',
            'watch',
            'onMounted',
            'onUnmounted'
          ]
        },
        // Vue Router
        'vue-router'
      ],
      dts: true,
      resolvers: [
        VantResolver()
      ],
    }),

    // 自动导入组件
    Components({
      resolvers: [VantResolver()],
      dts: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    port: 5173,
    cors: true,
    // 开发环境模拟生产环境路径
    proxy: {
      // 模拟页面访问路径
      [`^${env.VITE_BASE_URL}`]: {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (_path) => {
          // 移除基础路径，让 Vue Router 处理
          return '/'
        }
      },
    },
    host: '0.0.0.0' // 允许外部访问
  },
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'static',
    assetsInlineLimit: 0,
    cssCodeSplit: isProduction || !isAdmin,
    // Rollup 配置
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, `${projectName}.html`),
      },
      output: {
        // 修改这里的文件名
        ...getRollupOptOptions(projectName, isBeta),
        assetFileNames: (assetInfo) => {
          let chunkName = assetInfo.name || "";
          let extType = chunkName.split(".")[1] as string;
          if (/css/i.test(extType)) {
            extType = "css";
          }
          if (/png|jpg|jpeg|gif|svg|webp/i.test(extType)) {
            extType = "images";
          }
          return `${projectName}/${extType}/[name]-[hash][extname]`
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      // less: {
      //   modifyVars: {
      //     // 修改主题变量
      //     'primary-color': '#1DA57A',
      //   },
      //   javascriptEnabled: true,
      // },
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        // additionalData: '@use "@/styles/variables.scss" as *;',
      }
    },
  },
})
