import Vue from 'vue'
import Router from 'vue-router'
import ProgressBar from '@/components/ProgressBar.vue'
import PoweredBy from '@/components/PoweredBy.vue'
import Start from '@/components/Start.vue'
import Description from '@/components/Description.vue'

import Finish from '@/components/Finish.vue'
import P404 from '@/components/P404.vue'
import PrintQRcode from '@/components/PrintQRcode.vue'
import Accuracy from '@/components/Accuracy.vue'

// асинхронные модули
const SendFiles = () => import('@/components/SendFiles.vue')
const Test = () => import('@/components/Test.vue')
const Photo = () => import('@/components/Photo.vue')
const EndFirst = () => import('@/components/EndFirst.vue')
const LoadScreen = () => import('@/components/LoadScreen.vue')

Vue.use(Router)

export default new Router({
  base: '/showroom/wildberries/',
  mode: 'history',
  routes: [
    {
      path: '*',
      components: {
        P404,
        PoweredBy
      }
    },
    {
      path: '/',
      name: 'home',
      components: {
        Start,
        PoweredBy
      }
    },
    {
      path: '/scan',
      name: 'home-dome',
      components: {
        Start,
        PoweredBy
      }
    },
    {
      path: '/description',
      name: 'description',
      components: {
        Description,
        ProgressBar,
        PoweredBy
      }
    },
    {
      path: '/scan/description',
      name: 'description-dome',
      components: {
        Description,
        ProgressBar,
        PoweredBy
      }
    },
    {
      path: '/send-files',
      name: 'send-files',
      components: {
        SendFiles,
        ProgressBar,
        PoweredBy
      }
    },
    {
      path: '/scan/test',
      name: 'test',
      components: {
        Test,
        ProgressBar,
        PoweredBy
      }
    },
    {
      path: '/scan/load-screen',
      name: 'load-screen',
      components: {
        LoadScreen,
        PoweredBy
      }
    },
    {
      path: '/scan/photo',
      name: 'photo',
      components: {
        Photo,
        ProgressBar,
        PoweredBy
      }
    },
    {
      path: '/scan/end-first',
      name: 'end-first',
      components: {
        EndFirst,
        PoweredBy
      }
    },
    {
      path: '/finish',
      name: 'finish',
      components: {
        Finish,
        PoweredBy
      }
    },

    {
      path: '/print-qr-code',
      name: 'print-qr-code',
      components: {
        PrintQRcode,
        PoweredBy
      }
    },

    {
      path: '/accuracy',
      name: 'accuracy',
      components: {
        Accuracy,
        PoweredBy
      }
    }
  ]
})
