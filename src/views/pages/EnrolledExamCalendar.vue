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
        </div>
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
// import {Calendar} from '@fullcalendar/core';
import FullCalendar from 'primevue/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';

export default defineComponent({
  name: 'EnrolledExamCalender',

  methods:{
       eventClicked(data: any){
        this.$router.push({name:'GroupExamDetail', params:{id:data.event._def.publicId}});
      }
  },
  components: {
    FullCalendar,
    // IonContent,
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
    const link='/enrolled/group_exams';

    this.$http.get(link).then(response=>{
      const exams=[];
      for(const groupExam of response.data){
        exams.push({
            id:groupExam.id,
            title:groupExam.exam.title,
            start:groupExam.starts_at
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
