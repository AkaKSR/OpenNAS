import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import FileList from '@/components/lists/FileList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/fileList',
      name: 'FileList',
      component: FileList
    }
  ]
})
