// @ts-nocheck
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from "unplugin-vue-components/resolvers";
import VitePluginStyleInject from 'vite-plugin-style-inject';
import pkg from './package.json'
import path from "path";
const projectName = pkg.name
const { NODE_ENV } = process.env
// https://vite.dev/config/ 
let env = loadEnv(NODE_ENV || '', process.cwd())
let idc = NODE_ENV === 'production'
let isDev = NODE_ENV === 'development'
let isBeta = NODE_ENV === 'beta'
let isAdmin = env.VITE_IS_ADMIN === 'yes'
console.log('NODE_ENV', NODE_ENV, 'isAdmin', isAdmin, 'isDev', isDev, 'isBeta', isBeta, 'idc', idc);


function getRollupOptOptions(projectName, isBeta) {
  if (isBeta && isAdmin) {
    return {
      // 所有代码打包到单个文件
      manualChunks: (_id) => {
        // 无论是什么模块，都打包到 app 中
        return 'app'
      },
      // 文件命名
      entryFileNames: `${projectName}/js/app.js`,
      chunkFileNames: `${projectName}/js/app.js`,
    }
  }
  return {
    // 处理其他资源文件
    entryFileNames: (_entryInfo) => {
      return `${projectName}/js/[name]-[hash].js`;
    },
    chunkFileNames: (_chunkInfo) => {
      const regex = /\/pages\/([^\/]+)\/.*\.vue$/
      let name = ''
      if (_chunkInfo.facadeModuleId) {
        const match = _chunkInfo.facadeModuleId.match(regex) || []
        // console.log('匹配到的目录名:', match[1]) // 输出: account
        name = match[1]
      }
      return `${projectName}/js/${name ? name : '[name]'}-[hash].js`;
    },
    manualChunks: {
      vue: ["vue"],
    },
  }
}
export default defineConfig({
  base: env.VITE_STATIC_URL,
  plugins: [
    vue(),
    isBeta && isAdmin ? VitePluginStyleInject() : null,
    AutoImport({
      imports: [{ 'vue': ['reactive', 'computed', 'ref', 'watch', 'onMounted', 'onUnmounted'] }, 'vue-router'],
      dts: true,
      resolvers: [
        VantResolver()
      ],
    }),
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
        rewrite: (path) => {
          // 移除基础路径，让 Vue Router 处理
          return '/'
        }
      },
    },
    host: '0.0.0.0' // 允许外部访问
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    cssCodeSplit: idc,
    rollupOptions: {
      output: {
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
