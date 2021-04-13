<template>
<div class="quiz-app-wrapper">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="profile-head-box">
                        <img src="assets/img/profile-img.png" alt="" class="user-img">
                        <h4>{{user.name}}</h4>
                        <span>{{user.phone}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box profile-menu-box"> 
            <ul class="q-menu-list">
                <li>
                    <div class="single-menu">
                        <router-link :to='{name:"EditProfile"}'>
                             <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/edit-profile.png" alt="">
                            </div> 
                            <p>Edit Profile</p>
                        </router-link>
                    </div>
                </li>
                <li>
                    <div class="single-menu">
                        <router-link :to="{name:'Categories'}"> 
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/exam-history.png" alt="">
                            </div> 
                            <p>Categories</p>
                        </router-link>
                    </div>
                </li>
                <li>
                    <div class="single-menu">
                        <router-link :to="{name:'Balance'}">
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/balance.png" alt="">
                            </div> 
                            <p>Balance</p>
                        </router-link>
                    </div>
                </li>
                <li>
                    <div class="single-menu">
                        <router-link :to="{name:'Packages'}"> 
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/payment-history.png" alt="">
                            </div> 
                            <p>Packages</p>
                        </router-link>
                    </div>
                </li>
                <li>
                    <div class="single-menu">
                        <router-link :to="{name:'ScoreCard'}">
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/scoreboard.png" alt="">
                            </div> 
                            <p>Score Board</p>
                        </router-link>
                    </div>
                </li>
                <li>
                    <div class="single-menu">
                        <a href="university.html">
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/previous-exam.png" alt="">
                            </div> 
                            <p>Previous Exam</p>
                        </a>
                    </div>
                </li>
                <li>
                    <div class="single-menu">
                        <router-link :to="{name:'ExamHistory'}">
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/exam-history.png" alt="">
                            </div> 
                            <p>Exam History</p>
                        </router-link>
                    </div>
                </li>
                <li>
                    <div class="single-menu" >
                            <span @click="logout">
                                <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/help-support.png" alt="">
                                </div> 
                                <p>Logout</p>
                            </span>
                    </div>
                </li>
            </ul>
        </div>
         
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Profile',
  data(){
    return {
      user:[],
    }
  },
  methods:{
      getLink(id: any){
          return { name: 'IndividualExamDetail', params: { id: id } };
      },
      logout(){
          localStorage.token=null;
           this.$router.push({ name: 'Login' });
      }
  },
  components: {
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  created(){
    //   console.log("Page created");
    const link='/profile';
    this.$http.get(link).then(response=>{
        // console.log(response.data);
        this.user=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>
.single-menu span {
    position: relative;
    display: block;
    background-color: #fff;
    padding: 14px 15px;
    -webkit-box-shadow: 0px 0px 12px -8px rgb(0 0 0 / 75%);
    -moz-box-shadow: 0px 0px 12px -8px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px -8px rgb(0 0 0 / 75%);
    min-height: 105px;
}
</style>
