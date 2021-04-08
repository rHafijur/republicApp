<template>
<div class="quiz-app-wrapper qaw4">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header qhV2">
            <div class="q-container">
                <div class="q-row"> 
                    <div class="q-full-width">
                        <h3>Scores</h3> 
                        
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-notific-box qlV4">
            <div v-for="(test,i) of tests" :key="i" @click="itemClicked(test)" class="q-progress-head qphV2">
                <h5>{{test.exam.title}}</h5>
                <p>Score</p><span>{{test.date}}</span>
                <div v-if="test.is_finished==0" style="height:200px;">
                    <span style="margin:0 auto;font-size:30px">Continue</span>
                </div>
                <ul v-else>
                    <li>
                        <div class="prog-q-box">
                            <h4>{{test.earned_marks}}</h4>
                            <span>Marks</span>
                        </div>
                    </li>
                    <li>
                        <div class="single-pq-box">
                            <h4>{{test.number_of_correct_answers}}</h4>
                            <p>Correct</p>
                        </div>
                        <div class="single-pq-box">
                            <h4>{{test.exam.number_of_question - test.number_of_not_answered}}</h4>
                            <p>Attempted</p>
                        </div>
                        <div class="single-pq-box">
                            <h4>{{test.number_of_not_answered}}</h4>
                            <p>Remining</p>
                        </div>
                    </li> 
                </ul>
            </div>
        </div>  
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExamHistory',
  data(){
    return {
      tests:[],
    }
  },
  methods:{
      itemClicked(test: any){
          if(test.is_finished==1){
              this.$router.push({name:'TestResult',params:{id:test.id}});
          }else{
              this.$router.push({name:'McqQuestionPaper',params:{id:test.encId}});
          }
          
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
    const link='/exam_history';
    this.$http.get(link).then(response=>{
        // console.log(response.data);
        this.tests=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>

</style>
