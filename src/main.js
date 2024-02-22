import './assets/scss/style.scss'
import * as allContent from '../content.json'
import github from '@/components/icons/github.vue'
import facebook from '@/components/icons/facebook.vue'
import instagram from '@/components/icons/instagram.vue'
import twitter from '@/components/icons/twitter.vue'
import linkedin from '@/components/icons/linkedin.vue'
import telegram from '@/components/icons/telegram.vue'


import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.imagePath = "/images/"
app.config.globalProperties.content = allContent

app
    .component('github', github)
    .component('facebook', facebook)
    .component('instagram', instagram)
    .component('twitter', twitter)
    .component('linkedin', linkedin)
    .component('telegram', telegram)

app.mount('#app')
