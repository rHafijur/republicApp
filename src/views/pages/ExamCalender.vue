<template>
  <div class="quiz-app-wrapper">

        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Repblic Education</h3>
                        <p>Republic Engineering Daily Exam Preparation.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <p class="text-center">Group Exam</p>
            <div class="model-test-list">
              <div ref="calendar"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import {Calendar} from '@fullcalendar/core';
// import FullCalendar from 'primevue/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export default defineComponent({
  name: 'ExamCalender',
  data(){
    return {
      exams:<Array<any>>[],
      // examEvents: [
			// 	{
			// 		"id": 1,
			// 		"title": "All Day Event",
			// 		"start": "2019-01-01"
			// 	},
			// 	{
			// 		"id": 2,
			// 		"title": "Long Event",
			// 		"start": "2019-01-07",
			// 		"end": "2019-01-10"
			// 	},
			// 	{
			// 		"id": 3,
			// 		"title": "Repeating Event",
			// 		"start": "2019-01-09T16:00:00"
			// 	},
			// 	{
			// 		"id": 4,
			// 		"title": "Repeating Event",
			// 		"start": "2019-01-16T16:00:00"
			// 	},
			// 	{
			// 		"id": 5,
			// 		"title": "Conference",
			// 		"start": "2019-01-11",
			// 		"end": "2019-01-13"
			// 	},
			// 	{
			// 		"id": 6,
			// 		"title": "Meeting",
			// 		"start": "2019-01-12T10:30:00",
			// 		"end": "2019-01-12T12:30:00"
			// 	}
			// ],
      // options: {
      //           plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
      //           initialDate: '2019-01-01',
      //           headerToolbar: {
      //               left: 'prev,next',
      //               center: 'title',
      //               right: 'dayGridMonth,timeGridWeek,timeGridDay'
      //           },
      //           editable: true
      //       },
    }
  },
  methods:{
      getLink(type: any){
          return "/";
      }
  },
  components: {
    // FullCalendar,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  mounted(){
    console.log('mounted');
    let link;
    if(this.$route.params.typeId!=null){
        link='/group_exams/'+this.$route.params.typeId+'/'+this.$route.params.subjectId;
    }else{
        link='/group_exams/'+this.$route.params.typeName;
    }
    let events=[];
    this.$http.get(link).then(response=>{
        console.log(response.data);

        for(let exam of response.data){
          let ev={
    					id: exam.id,
    					title: exam.title,
    					start: exam.starts_at,
    				}
            events.push(ev);
        }
        let calendar = new Calendar(<HTMLElement> this.$refs.calendar, {
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridDay'
        },
        events:events,
        eventClick: function(info) {
                        console.log(info.event._def.publicId);
                        // $('#examInfoModal').modal('show')
                        // $("#exam_info").html(`Loading...`);
                        // $.get(`http://127.0.0.1:8000/student/group_exam/info/ajax/`+info.event._def.publicId,function(data,status) {
                        //     if(status=='success'){
                        //         $("#exam_info").html(data);
                        //     }else{
                        //         $("#exam_info").html("Something went wrong! please try again");
                        //     }
                        // });
                    },
        });
        calendar.render();
        // this.examEvents=events;

      }).catch(function (error) {
        console.log(error);
      });
    // let el=document.getElementById('calendar');

  },
});
</script>

<style scoped>

</style>
