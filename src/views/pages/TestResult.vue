<template>
<div class="quiz-app-wrapper qaw4">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header qhV2">
            <div class="q-container">
                <div class="q-row"> 
                    <div class="q-full-width">
                        <h3>{{exam.title}}</h3> 
                        <p>My Study Progress</p>
                    </div>
                    <div class="q-progress-head">
                        <ul>
                            <li>
                                <div class="prog-q-box">
                                    <h4><span style="font-size: 1.2em; display:inline">{{test.earned_marks}}</span>/{{exam.number_of_question * exam.marks_per_question}}</h4>
                                    <span>Marks</span>
                                </div>
                            </li>
                            <li>
                                <div class="single-pq-box">
                                    <h4>{{exam.number_of_question - test.number_of_not_answered}}</h4>
                                    <p>Total Answer</p>
                                </div>
                                <div class="single-pq-box">
                                    <h4>{{test.number_of_correct_answers}}</h4>
                                    <p>Correct Answer</p>
                                </div>
                                <div class="single-pq-box">
                                    <h4>{{test.number_of_wrong_answers}}</h4>
                                    <p>Wrong Answer</p>
                                </div>
                                <div class="single-pq-box">
                                    <h4>{{test.number_of_not_answered}}</h4>
                                    <p>Not Answered</p>
                                </div>
                                <!-- <div class="single-pq-box">
                                    <h4>{{test.time_taken}}</h4>
                                    <p>Time taken</p>
                                </div> -->
                            </li> 
                    </ul></div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-notific-box qlV4">
            <div class="days-leftexam">
                <ul>
                    <li>
                        <p>Positive Marks</p>
                        <span>{{test.positive_marks}}</span>
                    </li>
                    <li>
                        <p>Negative Marks</p>
                        <span>{{test.negative_marks}}</span>
                    </li>
                </ul>
            </div>
            <div class="days-leftexam">
                <ul>
                    <li>
                        <p>Total time</p>
                        <span>{{totalTime}}</span>
                    </li>
                    <li>
                        <p>Time taken</p>
                        <span>{{test.time_taken}}</span>
                    </li>
                    
                </ul>
            </div>
            <div class="days-leftexam">
                <ul>
                    <li>
                        <p>Model</p>
                        <span>{{exam.model}}</span>
                    </li>
                    <li>
                        <p>Merit Position</p>
                        <span v-html="ranking" class="ranking"></span>
                    </li>
                </ul>
            </div>
            <!-- <div class="start-training">
                <h4>Start Training</h4>
                <div class="sb-tn">
                    <a href="#">
                        <h5>Quick 10 Question</h5>
                        <p>Get Started Now</p>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
                <div class="sb-tn">
                    <a href="#">
                        <h5>Build Exam</h5>
                        <p>Get Started Now</p>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div> -->

            <div class="pastEvery-exam-result">
                <router-link :to="{name:'McqPreview', params:{id:$route.params.id}}">Preview <i class="fa fa-angle-right"></i></router-link>
                
            </div>
            <div class="pastEvery-exam-result">
                <router-link :to="{name:'MeritList', params:{id:$route.params.id}}">Merit List <i class="fa fa-angle-right"></i></router-link>
                
            </div>
        </div>  
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestResult',
  data(){
    return {
        test: {} as any,
        exam: {} as any,
        ranking: "" as string,
        totalTime:"",
    }
  },
  methods:{
    addZiro(num: any){
        num=Math.floor(num);
            if(num<10){
                return "0"+num;
            }else{
                return num;
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
    const link='/test_result/'+this.$route.params.id;
    this.$http.get(link).then(response=>{
        this.test=response.data.test;
        this.exam=response.data.exam;
        this.ranking=response.data.ranking;
        const seconds=response.data.exam.total_duration * 60;
        const hr=seconds/(60*60);
        const mn=(seconds%(60*60))/60;
        const sc=(seconds%(60*60))%60;
        this.totalTime=this.addZiro(hr)+":"+this.addZiro(mn)+":"+this.addZiro(sc);
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>
.qaw4 img.app_header_top_bg {
    height: 450px;
}
.days-leftexam ul li span span{
    display: inline !important;
}
.prog-q-box{
    top:60px;
}
</style>
