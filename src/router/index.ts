import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import BottomNav from '../views/components/layouts/BottomNav.vue'
import Login from '../views/Login.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import Register from '../views/Register.vue'
import Otp from '../views/Otp.vue'
import ForgetPasswordOtp from '../views/ForgetPasswordOtp.vue'
import PasswordReset from '../views/PasswordReset.vue'
import Profile from '../views/pages/Profile.vue'
import EditProfile from '../views/pages/EditProfile.vue'
import Types from '../views/pages/Types.vue'
import Subjects from '../views/pages/Subjects.vue'
import ExamList from '../views/pages/ExamList.vue'
import ExamCalender from '../views/pages/ExamCalender.vue'
import EnrolledExamCalendar from '../views/pages/EnrolledExamCalendar.vue'
import GroupExamDetail from '../views/pages/GroupExamDetail.vue';
import IndividualExamDetail from '../views/pages/IndividualExamDetail.vue';
import McqQuestionPaper from '../views/pages/McqQuestionPaper.vue';
import McqPreview from '../views/pages/McqPreview.vue';
import TestResult from '../views/pages/TestResult.vue';
import ExamHistory from '../views/pages/ExamHistory.vue';
import MeritList from '../views/pages/MeritList.vue';
import ScoreCard from '../views/pages/ScoreCard.vue';
import Packages from '../views/pages/Packages.vue';
import Balance from '../views/pages/Balance.vue';
import Faq from '../views/pages/Faq.vue';
import Categories from '../views/pages/Categories.vue';
import ArchiveExamList from '../views/pages/ArchiveExamList.vue';
import ArchiveExamDetail from '../views/pages/ArchiveExamDetail.vue';

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (localStorage.token == null) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (localStorage.token != null) {
    if(localStorage.phoneVerified=='false'){
      next({name:'Otp'});
    }else{
      if(localStorage.types!=null && localStorage.types.length > 0 ){
        next();
        return;
      }
      next({name:'Categories'});
      return
    }
  }
  next('/login')
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () =>{
      
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
    beforeEnter:ifNotAuthenticated
  },
  {
    path:'/forget_password',
    name: 'ForgetPassword',
    component:ForgetPassword,
    beforeEnter:ifNotAuthenticated
  },
  {
    path:'/register',
    name: 'Register',
    component:Register,
    beforeEnter:ifNotAuthenticated
  },
  {
    path:'/otp',
    name: 'Otp',
    component:Otp,
  },
  {
    path:'/forget_password/otp',
    name: 'ForgetPasswordOtp',
    component:ForgetPasswordOtp,
  },
  {
    path:'/forget_password/password/reset',
    name: 'PasswordReset',
    component:PasswordReset,
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      default:Home,
      'bottom-nav':BottomNav
    },
    beforeEnter: ifAuthenticated
  },
  {
    path: '/profile',
    name: 'Profile',
    components: {
      default:Profile,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/profile/edit',
    name: 'EditProfile',
    components: {
      default:EditProfile,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/exam/:examModel/types',
    name: 'Types',
    components: {
      default:Types,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/:examModel/subject/:typeId',
    name: 'Subjects',
    components: {
      default:Subjects,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/individual_exams/:typeId/:subjectId',
    name: 'ExamList',
    components: {
      default:ExamList,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/group_exams/:typeId/',
    name: 'ExamCalender',
    components: {
      default:ExamCalender,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/group_exams/:typeId/archive',
    name: 'ArchiveExamList',
    components: {
      default:ArchiveExamList,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/group_exam/:groupExamId/archive',
    name: 'ArchiveExamDetail',
    components: {
      default:ArchiveExamDetail,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/individual_exams/:typeName',
    name: 'ExamListForTypeName',
    components: {
      default:ExamList,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/group_exams/enrolled',
    name: 'EnrolledExamCalendar',
    components: {
      default:EnrolledExamCalendar,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/group_exam/:id',
    name: 'GroupExamDetail',
    components: {
      default:GroupExamDetail,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/individual_exam/:id',
    name: 'IndividualExamDetail',
    components: {
      default:IndividualExamDetail,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/mcq_question_paper/:id',
    name: 'McqQuestionPaper',
    component:McqQuestionPaper ,
    beforeEnter:ifAuthenticated
  },
  {
    path: '/mcq_preview/:id',
    name: 'McqPreview',
    component:McqPreview ,
    beforeEnter:ifAuthenticated
  },
  {
    path: '/test_result/:id',
    name: 'TestResult',
    components: {
      default:TestResult,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/merit_list/:id',
    name: 'MeritList',
    components: {
      default:MeritList,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/exam_history',
    name: 'ExamHistory',
    components: {
      default:ExamHistory,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/score_card',
    name: 'ScoreCard',
    components: {
      default:ScoreCard,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/packages',
    name: 'Packages',
    components: {
      default:Packages,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/balance',
    name: 'Balance',
    components: {
      default:Balance,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
  {
    path: '/categories',
    name: 'Categories',
    components: {
      default:Categories,
      'bottom-nav':BottomNav
    },
    beforeEnter:(to: any, from: any, next: any) => {
      if (localStorage.token != null) {
        next();
      }
      next('/login')
    }
  },
  {
    path: '/faqs',
    name: 'Faq',
    components: {
      default:Faq,
      'bottom-nav':BottomNav
    },
    beforeEnter:ifAuthenticated
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
