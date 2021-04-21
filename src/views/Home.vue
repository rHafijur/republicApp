<template>
  <div scrollY="true" class="quiz-app-wrapper">
      <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Republic Education</h3>
                        <p>Spread Your Knowledge</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <!-- <p>Republic Education</p> -->
            <ul class="q-menu-list">
                <menu-item :link="{name:'Types',params:{examModel:'individual'}}" title="INDIVIDUAL EXAM" icon="assets/img/individual.svg"></menu-item>
                <menu-item :link="{name:'Types',params:{examModel:'group'}}" title="GROUP EXAM" icon="assets/img/group.svg"></menu-item>
                <menu-item :link="{name:'EnrolledExamCalendar'}" title="ENROLLED GROUP EXAM" icon="assets/img/enrolled.svg"></menu-item>
                <li>
                    <div class="single-menu">
                        <span @click="openRoutine">
                            <div class="menu-single-icon menu-icon-style-b">
                                <img src="assets/img/routine.png" alt="Routine">
                            </div> 
                            <p>ROUTINE</p>
                        </span>
                    </div>
                </li>
                <menu-item :link="{name:'ExamHistory'}" title="MY RESULTS" icon="assets/img/result.svg"></menu-item>
                <menu-item :link="{name:'Packages'}" title="PACKAGE" icon="assets/img/package.svg"></menu-item>
                <!-- <menu-item :link="{}" title="Group Exam" icon="assets/img/academic-exam-icon.png"></menu-item> -->
            </ul>
        </div>
        <!-- <div class="category-slider">
            <p>Republic Categories</p>
            <div class="cs-owl-slider owl-carousel owl-theme">
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>HSC</p>
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>SSC</p>
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>JSC</p>
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>BCS</p>
                        </a>
                    </div>
                </div>
            </div>
        </div> -->
      </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import MenuItem from  './components/layouts/MenuItem.vue';
import { Browser } from '@capacitor/browser';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    MenuItem,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  methods:{
     async openRoutine(){
           await Browser.open({ url: 'https://student.republiceducationbd.com/routine.pdf'});
      }
  }
});
</script>

<style scoped>
q-menu-list>*{
    text-transform: capitalize;
}
</style>
