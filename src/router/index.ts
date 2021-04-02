import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import BottomNav from '../views/components/layouts/BottomNav.vue'
import Login from '../views/Login.vue'
import Types from '../views/pages/Types.vue'
import Subjects from '../views/pages/Subjects.vue'
import ExamList from '../views/pages/ExamList.vue'
import ExamCalender from '../views/pages/ExamCalender.vue'
import EnrolledExamCalendar from '../views/pages/EnrolledExamCalendar.vue'
import GroupExamDetail from '../views/pages/GroupExamDetail.vue';
import IndividualExamDetail from '../views/pages/IndividualExamDetail.vue';
import McqQuestionPaper from '../views/pages/McqQuestionPaper.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: to =>{
      console.log(to);
      
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
  },
  {
    path: '/group_exams/enrolled',
    name: 'EnrolledExamCalendar',
    components: {
      default:EnrolledExamCalendar,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/group_exam/:id',
    name: 'GroupExamDetail',
    components: {
      default:GroupExamDetail,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/individual_exam/:id',
    name: 'IndividualExamDetail',
    components: {
      default:IndividualExamDetail,
      'bottom-nav':BottomNav
    },
  },
  {
    path: '/mcq_question_paper/:id',
    name: 'McqQuestionPaper',
    component:McqQuestionPaper 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
