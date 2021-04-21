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
            <p class="text-center">Archive Exams</p>
            <ul class="model-test-list">
                <li v-for="(groupExam,i) of groupExams" :key="i">
                    <router-link :to="getLink(groupExam.id)">
                        <div class="mt-single">
                            <ul class="mt-list">
                                <li>
                                    <p>{{groupExam.exam.title}}</p>
                                    <span>Q -{{groupExam.exam.number_of_question}} , Time -{{groupExam.exam.total_duration}} min </span>
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
      groupExams:[],
    }
  },
  methods:{
      getLink(id: any){
          return { name: 'ArchiveExamDetail', params: { groupExamId: id } };
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
    const link='/archive/group_exams/'+this.$route.params.typeId;
    this.$http.get(link).then(response=>{
        // console.log(response.data);
        this.groupExams=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>

</style>
