import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Occupation from "@/components/Occupation"
import Apply from '@/components/Apply'
import Result from '@/components/Result'
import Check from '@/components/Check'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/Apply',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/Occupation',
          name:'Occupation',
          component:Occupation
        },
      	{
      		path:'/Apply',
      		name:'Apply',
      		component:Apply
      	},
      	{
      		path:'/Result/:select',
      		name:'Result',
      		component:Result
      	},
      	{
      		path:'/Check',
      		name:'Check',
      		component:Check
      	}
      ]
    }
  ]
})
