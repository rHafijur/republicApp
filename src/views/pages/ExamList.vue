<template>
  <div class="quiz-app-wrapper">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Repblic Education</h3>
                        <p>Republic Engineering Daily Exam Preparation.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <p class="text-center">Daily Exam</p>
            <ul class="model-test-list">
                <li v-for="(exam,i) of exams" :key="i">
                    <a href="#">
                        <div class="mt-single">
                            <ul class="mt-list">
                                <li>30%</li>
                                <li>
                                    <p>{{exam.title}}</p>
                                    <span>Q -{{exam.number_of_question}} , Time -{{exam.total_duration}} min </span>
                                </li>
                                <li>
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </li>
                            </ul>
                        </div>
                    </a>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExamList',
  data(){
    return {
      exams:[],
    }
  },
  methods:{
      getLink(type: any){
          return "/";
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
    this.$http.get('/individual_exams/'+this.$route.params.typeId+'/'+this.$route.params.subjectId).then(response=>{
        // console.log(response.data);
        this.exams=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>

</style>