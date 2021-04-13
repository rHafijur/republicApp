<template>
    <li>
        <div class="single-question">
            <div class="question">
                <span class="question-no">{{sl}}</span>
                <h4 v-html="qa.question.question_text"></h4>
            </div>
            <div class="select-answer">
                <ul>
                    <li><input @change="optionSelected" :disabled="option != ''" type="radio" value="option_1" v-model="option"><div class="opt-name" @click="setOnReview('option_1')" :class="{'on-review':option=='' && onReview=='option_1'}"><span>A</span><div class="opt-text" v-html="qa.question.mcq_question.option_1"></div></div></li>
                    <li><input @change="optionSelected" :disabled="option != ''" type="radio" value="option_2" v-model="option"><div class="opt-name" @click="setOnReview('option_2')" :class="{'on-review':option=='' && onReview=='option_2'}"><span>B</span><div class="opt-text" v-html="qa.question.mcq_question.option_2"></div></div></li>
                    <li><input @change="optionSelected" :disabled="option != ''" type="radio" value="option_3" v-model="option"><div class="opt-name" @click="setOnReview('option_3')" :class="{'on-review':option=='' && onReview=='option_3'}"><span>C</span><div class="opt-text" v-html="qa.question.mcq_question.option_3"></div></div></li>
                    <li><input @change="optionSelected" :disabled="option != ''" type="radio" value="option_4" v-model="option"><div class="opt-name" @click="setOnReview('option_4')" :class="{'on-review':option=='' && onReview=='option_4'}"><span>D</span><div class="opt-text" v-html="qa.question.mcq_question.option_4"></div></div></li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'McqQustion',
  props:['qa','sl'],
  data(){
      return {
          onReview:'' as string,
          option:''
      }
  },
  components: {
  },
  methods:{
      setOnReview(opt: string): void{
          this.onReview=opt;
          this.$emit('reviewed',opt);
      },
      optionSelected(){
        this.$http.post('mcq_test/single_answer',{id:this.qa.id,option:this.option}).then(response=>{
            this.option=response.data;
            this.$emit('answered',this.option);
        }).catch(error=> {
            this.option="";
            console.log(error);
        });
            
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
.on-review{
    color: #29922b;
    font-style: italic;
    font-size: 1.2em;
    font-weight: bold;
}
</style>