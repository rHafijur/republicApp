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
                <div v-else>
                    <div v-if="isResultPending(test)">
                        <div v-if="isResultPending" class="q-progress-haed">
                            <div class="result-pending">
                                <div class="result-pending-head">Result is still pending</div>
                                <div class="result-pending-body">Please wait a while for the result</div>
                            </div>
                        </div>
                    </div>
                   <div v-else>
                        <ul>
                    <li>
                        <div class="prog-q-box">
                            <h4><span style="font-size: 1.2em; display:inline">{{test.earned_marks}}</span>/{{test.exam.number_of_question * test.exam.marks_per_question}}</h4>
                            <span>Marks</span>
                        </div>
                    </li>
                    <li>
                        <div class="single-pq-box">
                            <h4>{{test.number_of_correct_answers}}</h4>
                            <p>Correct Answer</p>
                        </div>
                        <div class="single-pq-box">
                            <h4>{{test.number_of_wrong_answers}}</h4>
                            <p>Wrong Answer</p>
                        </div>
                        <div class="single-pq-box">
                            <h4>{{test.exam.number_of_question - test.number_of_not_answered}}</h4>
                            <p>Total Answer</p>
                        </div>
                        
                    </li> 
                </ul>
                   </div>
                </div>
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
          
      },
      isResultPending(test: any){
          if(test.group_exam==null){
              return false;
          }
          if(test.group_exam.is_result_published==0){
              return true;
          }
          return false;
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
    this.$http.get(link,
     {
        cache: {
          maxAge: 1,
        }
      }
      ).then(response=>{
        // console.log(response.data);
        this.tests=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>
.result-pending{
    padding-top:45px ;
    padding-bottom: 60px;
    margin: auto;

}
.result-pending-head{
    font-size:24px;
    color: rgb(247, 62, 62);
}
.result-pending-body{
    font-size: 15px;
    color: rgb(0, 0, 0);
}
</style>
