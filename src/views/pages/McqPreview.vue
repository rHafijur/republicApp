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
                        <McqPreviewQuestion :qa="questionAnswer" :sl="i+1"> </McqPreviewQuestion>
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
                                            <span>Not Answer =</span> 
                                            <span class="white-round"></span>
                                            <span class="q-count">{{exam.number_of_question - numberOfAnswered}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="answer-sheet">
                        <ul class="as-list">
                            <li v-for="(quest,i) of questionAnswers" :key="i">
                                <span class="asl-count">{{i+1}}</span>
                                <p><input :class="{correct:quest.correct_option=='option_1',wrong:quest.correct_option!='option_1'}" :disabled="quest.selected_option!='option_1'" type="radio" value="option_1" v-model="quest.selected_option" id=""><span>A</span></p>
                                <p><input :class="{correct:quest.correct_option=='option_2',wrong:quest.correct_option!='option_2'}" :disabled="quest.selected_option!='option_2'" type="radio" value="option_2" v-model="quest.selected_option" id=""><span>B</span></p>
                                <p><input :class="{correct:quest.correct_option=='option_3',wrong:quest.correct_option!='option_3'}" :disabled="quest.selected_option!='option_3'" type="radio" value="option_3" v-model="quest.selected_option" id=""><span>C</span></p>
                                <p><input :class="{correct:quest.correct_option=='option_4',wrong:quest.correct_option!='option_4'}" :disabled="quest.selected_option!='option_4'" type="radio" value="option_4" v-model="quest.selected_option" id=""><span>D</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> 
        <div class="quiz-q-bottom-menus">
            <ul class="qqbm-list">
                <li>
                    <button @click="previewOn=false">Back to Questions</button>
                </li> 
                 
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import McqPreviewQuestion from '../components/McqPreviewQuestion.vue';

export default defineComponent({
  name: 'McqPreview',

  methods:{
  },
  components: {
    McqPreviewQuestion,
    // IonTitle,
    // IonToolbar
  },
  data(){
    return{
      exam:'' as any,
      questionAnswers:[] as any,
      user:null as any,
      previewOn:false as boolean,
    }
  },
 created(){
     this.$http.get('mcq_preview/'+this.$route.params.id).then(response=>{
      console.log(response.data);
      this.questionAnswers=response.data.questionAnswers;
      this.exam=response.data.exam;
      this.user=response.data.user;
      }).catch(function (error) {
        console.log(error);
      });
     
 },
 computed:{
     numberOfAnswered(){
         
        let cnt = 0;
        for(const ans of this.questionAnswers){
            if(ans.selected_option!=null){
                cnt++;
            }
        }
        return cnt;
     },
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
    .answer-sheet ul.as-list li p input[type="radio"].correct:checked:after {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        background-color: #02b72f !important;
        top: 0;
        left: 0;
        border-radius: 50%;
        border-color: #02b72f !important;
    }
    .answer-sheet ul.as-list li p input[type="radio"].wrong:checked:after {
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            background-color: #ff4322 !important;
            top: 0;
            left: 0;
            border-radius: 50%;
            border-color: #ff4322 !important;
    }
</style>
