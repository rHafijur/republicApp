<template>
<div class="quiz-app-wrapper pad-bottom-0">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header qhV2">
            <div class="q-container">
                <div class="q-row">
                    <div class="qh-back-btn">
                        <button style="background:transparent;font-size: 24px;color:#fff" @click="$router.go(-1)"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                    </div>
                    <div class="q-full-width">
                        <h3>Exam History</h3> 
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-notific-box qlV2">
            <ul class="qnot-list">
                <li v-for="(test,i) of tests" :key="i" @click="itemClicked(test)">
                    <div class="single-merit smv2">
                        <span class="sm-count">{{i+1}}.</span>
                        <span class="sm-name">{{test.exam.title}}</span> 
                        <span class="sm-date">{{test.date}}</span>
                        <span v-if="test.is_finished==1" class="marks-box">
                            <span class="pfp">{{test.earned_marks}}</span>
                            <!-- <span class="pf">Pass</span> -->
                        </span>
                        <span style="position:absolute;top:0;right:0" v-else><button class="btn btn-info">Continue</button></span>
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
