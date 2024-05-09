import './assets/main.css'
import { createApp } from 'vue'
import {createRouter,createWebHistory} from "vue-router";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import colors from 'vuetify/util/colors'
import Home from "@/components/Home.vue";
import RecipeDetails from "@/components/RecipeDetails.vue";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    cyan:colors.cyan.darken3,
                    teal:colors.teal.accent4,
                    lightBlue:colors.lightBlue.darken2,
                    lightGreen:colors.lightGreen.darken2,
                    green:colors.green.darken3
                }
            },
        },
    },
})

// const app = createApp(App)

const routes = [
    { path:'/',name:'Home',component:Home},
    {path:'/recipe/:id',name:'RecipeDetails',component: RecipeDetails}
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

createApp(App).use(router).use(vuetify).mount('#app')
