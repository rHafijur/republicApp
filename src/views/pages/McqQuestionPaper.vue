<template>
    <div class="quiz-app-wrapper qaw-v2">
         
        <!-- Header Area -->
        <div class="quiz-header quizHeaderV2">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-back">
                        <button @click="$router.go(-1)"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                    </div>
                    <div class="q-full-width">
                        
                        <h3>{{exam.title}}</h3>
                        <span class="quiz-countdown">
                            {{timer}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="quiz-wrapper">
            <div class="qoustion-area">
                <div class="question-box">
                    <ul class="questions q-list">
                        <template v-for="(questionAnswer,i) of questionAnswers" :key="i" >
                        <McqQuestion :qa="questionAnswer" :sl="i+1" v-on:answered="previews[i].option=$event" v-on:reviewed="previews[i].review=$event"> </McqQuestion>
                        </template>
                    </ul>
                </div>
            </div>
        </div> 
        <div class="quiz-q-bottom-menus">
            <ul class="qqbm-list">
                <li>
                    <button @click="previewOn=true">Preview</button>
                    
                </li>
                <li>
                    <button @click="finishExam">Finish Exam</button>
                </li>
                 
            </ul>
        </div>
    </div>
    <div v-if="previewOn" class="quiz-app-wrapper qaw-v2 preview">
         
        <!-- Header Area -->
        <div class="quiz-header quizHeaderV2">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-back">
                        <button @click="previewOn=false"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                    </div>
                    <div class="q-full-width">
                        
                        <h3>Preview</h3>
                        <span class="quiz-countdown">
                            {{timer}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="quiz-wrapper">
            <div class="infos-area">
                <div class="info-box">
                    <div class="info-head">
                        <ul>
                            <li>Name</li>
                            <li>{{user.name}}</li>
                            <li>Time</li>
                            <li>
                                <span id="time_remain" data-remaintime="10">{{timer}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="exam-review">
                        <ul>
                            <li>
                                <p>Exam Name - <span>{{exam.title}}</span></p>
                                <p>Exam Type - <span>{{exam.exam_type.title}}</span></p>
                            </li>
                            <li>
                                <div class="aer">
                                    <ul>
                                        <li>
                                            <span>Answer =</span> 
                                            <span class="black-round"></span>
                                            <span class="q-count">{{numberOfAnswered}}</span>
                                        </li>
                                        <li>
                                            <span>Review =</span> 
                                            <span class="yellow-round"></span>
                                            <span class="q-count">{{numberOfReview}}</span>
                                        </li>
                                        <li>
                                            <span>Not Answer =</span> 
                                            <span class="white-round"></span>
                                            <span class="q-count">{{previews.length - numberOfAnswered}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="answer-sheet">
                        <ul class="as-list">
                            <li v-for="(preview,i) of previews" :key="i">
                                <span class="asl-count">{{i+1}}</span>
                                <p><input :disabled="preview.option!='option_1'" type="radio" value="option_1" v-model="preview.option" id=""><span :class="{'on-review': preview.option==null && preview.review=='option_1'}">A</span></p>
                                <p><input :disabled="preview.option!='option_2'" type="radio" value="option_2" v-model="preview.option" id=""><span :class="{'on-review': preview.option==null && preview.review=='option_2'}">B</span></p>
                                <p><input :disabled="preview.option!='option_3'" type="radio" value="option_3" v-model="preview.option" id=""><span :class="{'on-review': preview.option==null && preview.review=='option_3'}">C</span></p>
                                <p><input :disabled="preview.option!='option_4'" type="radio" value="option_4" v-model="preview.option" id=""><span :class="{'on-review': preview.option==null && preview.review=='option_4'}">D</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> 
        <div class="quiz-q-bottom-menus">
            <ul class="qqbm-list">
                <li>
                    <button @click="previewOn=false">Back to exam</button>
                </li> 
                 
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import McqQuestion from '../components/McqQuestion.vue';

export default defineComponent({
  name: 'McqQuestionPaper',

  methods:{
      finishExam(){
        const link='/mcq_test/generate_result';
        this.$http.post(link,{id:this.$route.params.id}).then(response=>{
            if(response.data.status=='success'){
                const id= response.data.id;
                this.$router.replace({name:'TestResult', params:{id:id}});
            }
        }).catch(function (error) {
            console.log(error);
        })
      }
  },
  components: {
    McqQuestion,
    // IonTitle,
    // IonToolbar
  },
  data(){
    return{
      exam:'' as any,
      questionAnswers:[] as any,
      user:null as any,
      timer:'00:00:00' as string,
      previewOn:false as boolean,
      previews:[] as any,
    }
  },
 created(){
     this.$http.get('mcq_test/'+this.$route.params.id).then(response=>{
      console.log(response.data);
      this.questionAnswers=response.data.questionAnswers;
      this.exam=response.data.exam;
      this.user=response.data.user;
      let sec=response.data.remainingMinutes * 60;
    //   let sec=3610;
    
      const prevs: any = [];
      for(const ans of this.questionAnswers){
          prevs.push({
              option:ans.selected_option,
              review:null
          });
      }
      this.previews=prevs;

      const addZiro=(numb: number): any =>{
          if(numb<10){
              return "0"+numb;
          }
          return numb;
      }
      const timer= setInterval(()=>{
          if(sec <=0 ){
              this.finishExam();
             clearInterval(timer); 
          }
          const hour= addZiro(Math.floor(sec / 3600));
          const minute= addZiro(Math.floor((sec % 3600) / 60));
          const second= addZiro(Math.floor((sec % 3600) % 60));
          this.timer=hour+":"+minute+':'+second;
          sec--;
          
      },1000);
      }).catch(function (error) {
        console.log(error);
      });
     
 },
 computed:{
     numberOfAnswered(){
         
        let cnt = 0;
        for(const ans of this.previews){
            if(ans.option!=null){
                cnt++;
            }
        }
        return cnt;
     },
     numberOfReview(){
        let cnt = 0;
        for(const ans of this.previews){
            if(ans.option==null && ans.review!=null){
                cnt++;
            }
        }
        return cnt;
     }
 }
});
</script>

<style scoped>
    .preview{
        z-index: 1;
        position: fixed;
        margin: 0 auto i !important;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #FFFFFF;
        overflow-y:scroll;
    }
    .on-review{
    color: #29922b;
    border: 2px #29922b;
    background: #FFFF01;
    font-style: italic;
    font-size: 1.2em;
    font-weight: bold;
}
</style>
