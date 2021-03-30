import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import BottomNav from '../views/components/layouts/BottomNav.vue'
import Login from '../views/Login.vue'
import Types from '../views/pages/Types.vue'
import Subjects from '../views/pages/Subjects.vue'
import ExamList from '../views/pages/ExamList.vue'
import ExamCalender from '../views/pages/ExamCalender.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: to =>{
      if(localStorage.token != null){
        return "/home";
      }
      return '/login';
    }
  },
  {
    path:'/login',
    name: 'Login',
    component:Login,
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      default:Home,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/:examModel/types',
    name: 'Types',
    components: {
      default:Types,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/:examModel/subject/:typeId',
    name: 'Subjects',
    components: {
      default:Subjects,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/individual_exams/:typeId/:subjectId',
    name: 'ExamList',
    components: {
      default:ExamList,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/group_exams/:typeId/:subjectId',
    name: 'ExamCalender',
    components: {
      default:ExamCalender,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/individual_exams/:typeName',
    name: 'ExamListForTypeName',
    components: {
      default:ExamList,
      'bottom-nav':BottomNav
    }
  },
  {
    path: '/group_exams/:typeName',
    name: 'ExamCalenderForTypeName',
    components: {
      default:ExamCalender,
      'bottom-nav':BottomNav
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
