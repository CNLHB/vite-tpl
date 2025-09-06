import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { createHtmlPlugin } from 'vite-plugin-html'
import eslint from 'vite-plugin-eslint'
import pkg from './package.json'
import path from 'path'
const projectName = pkg.name
const { NODE_ENV = '' } = process.env
// https://vite.dev/config/
const env = loadEnv(NODE_ENV, process.cwd())
const isProduction = NODE_ENV === 'production'
const isDevelopment = NODE_ENV === 'development'
const isBeta = NODE_ENV === 'beta'

console.log(
  'NODE_ENV',
  NODE_ENV,
  'isDevelopment',
  isDevelopment,
  'isBeta',
  isBeta,
  'isProduction',
  isProduction
)

export default defineConfig({
  base: env.VITE_STATIC_URL,
  plugins: [
    eslint(),
    // Vue 官方插件
    vue(),
    // 自动导入 Vue 相关 API
    AutoImport({
      imports: [
        // Vue 组合式 API
        {
          vue: ['reactive', 'computed', 'ref', 'watch', 'onMounted', 'onUnmounted'],
        },
        // Vue Router
        'vue-router',
      ],
      dts: true,
      resolvers: [VantResolver()],
      // eslint报错解决
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/main.js',
          filename: `${projectName}.html`,
          template: `${projectName}.html`,
        },
      ],
    }),
    // 自动导入组件
    Components({
      resolvers: [VantResolver()],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/api': path.resolve(__dirname, 'src/api'),
    },
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 3003,
    cors: true,
    // 开发环境模拟生产环境路径
    proxy: {
      // 模拟页面访问路径
      [`^${env.VITE_BASE_URL}`]: {
        target: 'http://localhost:3003',
        changeOrigin: true,
        rewrite: _path => {
          // console.log("rewrite", _path);
          // 移除基础路径，让 Vue Router 处理
          return '/'
        },
      },
    },
    host: '0.0.0.0', // 允许外部访问
  },
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    assetsInlineLimit: 0,
    cssCodeSplit: isProduction,
    // Rollup 配置
    rollupOptions: {
      output: {
        // 修改这里的文件名
        entryFileNames: () => `${projectName}/js/[name]-[hash].js`,
        // 代码分割文件命名
        chunkFileNames: chunkInfo => {
          // 提取页面目录名作为文件名
          const regex = /\/pages\/([^\/]+)\/.*\.vue$/
          const match = chunkInfo.facadeModuleId?.match(regex) || []
          const name = match[1] || '[name]'
          return `${projectName}/js/${name}-[hash].js`
        },
        assetFileNames: assetInfo => {
          let chunkName = assetInfo.name || ''
          let extType = chunkName.split('.')[1]
          if (/css/i.test(extType)) {
            extType = 'css'
          }
          if (/png|jpg|jpeg|gif|svg|webp/i.test(extType)) {
            extType = 'images'
          }
          return `${projectName}/${extType}/[name]-[hash][extname]`
        },
        // 手动代码分割
        manualChunks: {
          // vue: ["vue"],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        // additionalData: '@use "@/styles/variables.scss" as *;',
      },
    },
  },
})
