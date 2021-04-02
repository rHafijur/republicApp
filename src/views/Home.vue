<template>
  <div scrollY="true" class="quiz-app-wrapper">
      <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Repblic Education</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <p>Repblic Education</p>
            <ul class="q-menu-list">
                <menu-item :link="{name:'Types',params:{examModel:'individual'}}" title="Individual Exam" icon="assets/img/academic-exam-icon.png"></menu-item>
                <menu-item :link="{name:'Types',params:{examModel:'group'}}" title="Group Exam" icon="assets/img/academic-exam-icon.png"></menu-item>
                <menu-item :link="{name:'EnrolledExamCalendar'}" title="Enrolled Group Exam" icon="assets/img/academic-exam-icon.png"></menu-item>
                <!-- <menu-item :link="{}" title="Group Exam" icon="assets/img/academic-exam-icon.png"></menu-item> -->
            </ul>
        </div>
        <div class="category-slider">
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
        </div>
      </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import MenuItem from  './components/layouts/MenuItem.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    MenuItem,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  }
});
</script>

<style scoped>

</style>
