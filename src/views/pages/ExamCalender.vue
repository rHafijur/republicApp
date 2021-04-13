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
            <p class="text-center">Group Exam</p>
            <div class="model-test-list">
              <!-- <div ref="calendar"></div> -->
              <FullCalendar :events="exams" :options="options" />
            </div>
            <div>
              <ion-button @click="$router.push({name:'ArchiveExamList',params:{typeId:$route.params.typeId}})" color="primary" expand="full">Archive</ion-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
// import {Calendar} from '@fullcalendar/core';
import FullCalendar from 'primevue/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';

export default defineComponent({
  name: 'ExamCalender',

  methods:{
       eventClicked(data: any){
        this.$router.push({name:'GroupExamDetail', params:{id:data.event._def.publicId}});
      }
  },
  components: {
    FullCalendar,
    IonButton,
    // IonTitle,
    // IonToolbar
  },
  data(){
    return{
      options: {
          plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
          headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridDay'
          },
          editable: false,
          eventClick:this.eventClicked,
      },
      exams:[] as any,
    }
  },
  mounted(){
    const link='/group_exams/'+this.$route.params.typeId;

    this.$http.get(link).then(response=>{
      const exams=[];
      for(const exam of response.data){
        exams.push({
            id:exam.group_exam_id,
            title:exam.title,
            start:exam.starts_at
        })
      }
      this.exams=exams;

      }).catch(function (error) {
        console.log(error);
      });

  },
});
</script>

<style scoped>

</style>
