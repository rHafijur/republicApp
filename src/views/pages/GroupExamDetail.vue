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
            <p class="text-center">Exam Details</p>
            <div class="model-test-list">
              <div class="row d-flex justify-content-center">
                <div class="col-md-10 content">
                    <div v-if="!startPressed">
                        <div class="form-row">
                          <div class="form-group col-md-12">
                              <label for="title">Title</label>
                              <div class="val">
                                {{examInfo.title}}
                              </div>
                            </div>
                          <div class="form-group col-md-12">
                              <label for="fee">Exam fees (taka)</label>
                              <div class="val">{{examInfo.fee}}</div>
                            </div>
                      </div>
                      <hr>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                              <label for="exam_configuration_id">Starts At</label>
                              <div class="val">{{examInfo.starts_at}}</div>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="question_type">Question Type</label>
                                <div class="val">{{examInfo.type}}</div>
                              </div>
                        </div>
                        <hr>
                        <div class="form-row history">
                          <div class="form-group col-md-12">
                            <label>Institute</label>
                            <div class="val">{{examInfo.institue}}</div>
                          </div>
                          <div class="form-group col-md-12">
                            <label>Unit</label>
                            <div class="val">{{examInfo.unit}}</div>
                            </div>                         
                        </div>
                        <hr>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="number_of_question">Number of Questions</label>
                                <div class="val">{{examInfo.number_of_question}}</div>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="total_duration">Exam Duration (Minutes)</label>
                                <div class="val">{{examInfo.total_duration}}</div>
                              </div>
                        </div>
                        <hr>
                        <div class="form-row">
                          <div class="form-group col-md-12">
                            <label for="marks">Marks per Question</label>
                            <div class="val">{{examInfo.marks_per_question}}</div>
                          </div>
                        <div class="form-group col-md-12">
                            <label for="negative_marks_per_question">Negative marks per Question</label>
                            <div class="val">{{examInfo.negative_marks_per_question}}</div>
                          </div>
                        </div>
                        <hr>
                        <div class="form-row">
                          <div class="col-md-12">
                            <ion-button @click="initEnroll" v-if="!examInfo.hasEnroled" color="primary" expand="full">Enroll</ion-button>
                            <ion-button @click="start" v-if="examInfo.hasEnroled && examInfo.test==null" color="primary" expand="full">Start</ion-button>
                            <ion-button @click="continueExam" v-if="examInfo.hasEnroled && examInfo.test_id!=null && examInfo.test.is_finished!=1" color="primary" expand="full">Continue</ion-button>
                            <ion-button v-if="examInfo.hasEnroled && examInfo.test_id!=null && examInfo.test.is_finished==1" disabled color="primary" expand="full">Finished</ion-button>
                            <ion-button v-if="examInfo.hasEnroled" disabled color="success" expand="full">Enrolled</ion-button>
                          </div>
                            
                        </div>
                        </div>
                </div>
                <div v-if="startPressed">
                  <h5>The Exam Will be Started After:</h5>
                  <div class="timer">{{timer}}</div>
                  <ion-button @click="startPressed=false" color="secondary" expand="full">Return</ion-button>
                </div>
                <ion-loading
                      :is-open="isLoading"
                      cssClass="my-custom-class"
                      message="Please wait..."
                  >
                </ion-loading>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonLoading, alertController } from '@ionic/vue';

export default defineComponent({
  name: 'GroupExamDetail',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      examInfo: {} as any,
      timer: "" as string,
      startPressed:false as boolean,
      isLoading:false as boolean,
    }
  },
  created(){
      this.$http.get('group_exam/'+this.$route.params.id,
      {
        cache: {
          maxAge: 1,
        }
      }
      ).then(response=>{
      this.examInfo=response.data;
      console.log(this.examInfo);
      }).catch(function (error) {
        console.log(error);
      });
  },
  methods:{
    enroll(){
      this.$http.post('/group_exam/enroll',{
        groupExamId:this.examInfo.group_exam_id
      }).then(response=>{
        if(response.data.charge_failed==true){
          this.$router.push({name:'Packages'});
          console.log(response.data);
        }else{
          this.examInfo.hasEnroled=true;
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    async confirm() {
      const fee=this.examInfo.fee;
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Alert!',
          message: 'By starting the exam your account might be charged by BDT '+fee+' or 1 Exam unit.',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Okay',
              handler: () => {
                this.enroll();
              },
            },
          ],
        });
      return alert.present();
    },
    initEnroll(){
      if(this.examInfo.chargeAlert){
        this.confirm()
      }else{
        this.enroll();
      }
    },
    startExam(){
      this.isLoading=true;
      this.$http.get('/group_exam/'+this.examInfo.group_exam_id+'/start',
      {
        cache: {
          maxAge: 1,
        }
      }
      ).then(response=>{
        this.isLoading=false;
        if(response.data.status!='success'){
          console.log(response.data);
        }else{
          console.log(response.data);
          this.$router.replace({name:'McqQuestionPaper',params:{id:response.data.test_id}});
        }
        
      }).catch(error=>{
        this.isLoading=false;
        console.log(error);
      })
    },
    continueExam(){
      this.$router.replace({name:'McqQuestionPaper',params:{id:this.examInfo.test_id}});
    },
    start(){
      this.startPressed=true;
      let sec= (new Date(this.examInfo.starts_at).getTime()- new Date().getTime())/1000;
      if(sec<0){
        this.startExam();
      }else if(this.timer==''){
        const timer= setInterval(()=>{
          if(sec <=0 ){
            if(this.startPressed){
              this.startExam();
            }
            clearInterval(timer); 
          }
          const day= Math.floor(sec / (3600 * 24));
          const hour= Math.floor(sec / 3600);
          const minute= Math.floor((sec % 3600) / 60);
          const second= Math.floor((sec % 3600) % 60);
          this.timer=day+"d "+hour+"h "+minute+'m '+second+"s";
          sec--;
          
      },1000);
      }
    }
  },
  components: {IonButton, IonLoading}
});
</script>

<style scoped>
  
/* .all_calender_wrapper {
      position: relative;
  } */
  
  
  .form-row .form-group.col-md-12 {
      margin: 0px auto;
      border: 1px solid #6fb744;
      padding: 0px;
  }
  /*.all_calender_modal .form-row .form-group.col-md-6:last-child{*/
  /*    border-bottom: 1px solid #6fb744;*/
  /*}*/
   hr {
      display: none;
  }
  
  .form-row .form-group label {
      width: 48%;
      display: inline-block;
      margin: 0px auto;
      position: relative;
      vertical-align: middle;
      padding: 10px;
      font-weight: 700;
      font-size: 14px !important;
  }
  
  .form-row .form-group .val {
      width: 50%;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      padding: 6px;
      font-size: 14px !important;
  }
  
  .content {
      margin: 0px;
  }
  
  form#enroll_form {
      text-align: center;
      position: relative;
      margin: 15px auto 0px;
  }
  .form-row button {
      margin: 10px;
      margin-left: 0px;
  }
  .timer{
    font-size: 40px;
    padding: 30px 0 30px 0;
  }

</style>