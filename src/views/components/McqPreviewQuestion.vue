<template>
    <li>
        <div class="single-question">
            <div class="question">
                <span class="question-no">{{sl}}</span>
                <h4 v-html="qa.question.question_text"></h4>
            </div>
            <div class="select-answer">
                <ul>
                    <li><input :class="{correct:qa.correct_option=='option_1',wrong:qa.correct_option!='option_1'}" disabled type="radio" value="option_1" v-model="option"><div class="opt-name"><span>A</span><div class="opt-text" v-html="qa.question.mcq_question.option_1"></div></div></li>
                    <li><input :class="{correct:qa.correct_option=='option_2',wrong:qa.correct_option!='option_2'}" disabled type="radio" value="option_2" v-model="option"><div class="opt-name"><span>B</span><div class="opt-text" v-html="qa.question.mcq_question.option_2"></div></div></li>
                    <li><input :class="{correct:qa.correct_option=='option_3',wrong:qa.correct_option!='option_3'}" disabled type="radio" value="option_3" v-model="option"><div class="opt-name"><span>C</span><div class="opt-text" v-html="qa.question.mcq_question.option_3"></div></div></li>
                    <li><input :class="{correct:qa.correct_option=='option_4',wrong:qa.correct_option!='option_4'}" disabled type="radio" value="option_4" v-model="option"><div class="opt-name"><span>D</span><div class="opt-text" v-html="qa.question.mcq_question.option_4"></div></div></li>
                </ul>
                <p class="sa-correct-ans">Correct Ans: {{getOption()}}</p>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'McqPreviewQustion',
  props:['qa','sl'],
  data(){
      return {
          option:'' as string
      }
  },
  methods:{
      getOption(){
          switch(this.qa.correct_option){
            case 'option_1':{
                return 'A';
            }   
            case 'option_2':{
                return 'B';
            }
            case 'option_3':{
                return 'C';
            }
            case 'option_4':{
                return 'D';
            }
          }
      }
  },
  created(){
      if(this.qa.selected_option!=null){
          this.option= this.qa.selected_option;
      }
  }
});
</script>
<style scoped>
input[type='radio'].correct:checked:after {
    background-color: #08ff46 !important;
    border: 2px solid #08ff46 !important;
}
input[type='radio'].wrong:checked:after {
    background-color: #ff2d08 !important;
    border: 2px solid #ff2d08 !important;
}
</style>