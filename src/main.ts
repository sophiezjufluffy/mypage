import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 全局样式重置
app.config.globalProperties.$resetCSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    width: 100%;
    height: 100%;
  }
`

app.mount('#app')