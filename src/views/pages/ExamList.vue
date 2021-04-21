<template>
  <div class="quiz-app-wrapper">

        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Republic Education</h3>
                        <p>Spread Your Knowledge</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <p class="text-center">{{title}}</p>
            <ul class="model-test-list">
                <li v-for="(exam,i) of exams" :key="i">
                    <router-link :to="getLink(exam.id)">
                        <div class="mt-single">
                            <ul class="mt-list">
                                <li>
                                    <p>{{exam.title}}</p>
                                    <span>Q -{{exam.number_of_question}} , Time -{{exam.total_duration}} min </span>
                                </li>
                                <li>
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </li>
                            </ul>
                        </div>
                    </router-link>
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
      title:''
    }
  },
  methods:{
      getLink(id: any){
          return { name: 'IndividualExamDetail', params: { id: id } };
      },
      setTitle(id: any){
          if(localStorage.types!=null){
              const types=JSON.parse(localStorage.types);
              for(const _type of types){
                  if(_type.id==id){
                      this.title=_type.title;
                      break;
                  }
              }
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
    let link;
    if(this.$route.params.typeId!=null){
        link='/individual_exams/'+this.$route.params.typeId+'/'+this.$route.params.subjectId;
        this.setTitle(this.$route.params.typeId);
    }else{
        link='/individual_exams/'+this.$route.params.typeName;
        this.title=this.$route.params.typeName.toString().toUpperCase().replace('_',' ');
    }
    this.$http.get(link).then(response=>{
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
