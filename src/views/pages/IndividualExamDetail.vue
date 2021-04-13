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
            <span @click="start" class="start-exam-btn">Start Your Exam</span>
            <div class="model-test-list">
              <div class="row d-flex justify-content-center">
                <div class="col-md-10 content">
                    <div>
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
                              <ion-loading
                                    :is-open="isLoading"
                                    cssClass="my-custom-class"
                                    message="Please wait..."
                                    
                                >
                                </ion-loading>
                            <!-- <ion-button @click="start" color="primary" expand="full">Start Exam</ion-button> -->
                          </div>
                            
                        </div>
                        </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonLoading } from '@ionic/vue';

export default defineComponent({
  name: 'GroupExamDetail',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      examInfo: {} as any,
      isLoading: false as boolean
    }
  },
  created(){
    //   console.log(this.content);
      
      this.$http.get('individual_exam/'+this.$route.params.id).then(response=>{
      this.examInfo=response.data;
      console.log(this.examInfo);
      

      }).catch(function (error) {
        console.log(error);
      });
  },
  methods:{
    start(){
        this.isLoading=true;
      this.$http.get('/individual_exam/'+this.examInfo.exam_id+'/start').then(response=>{
        this.isLoading=false;
        if(response.data.charge_failed==true){
          this.$router.push({name:'Packages'});
          console.log(response.data);
        }else{
          console.log(response.data);
          this.$router.replace({name:'McqQuestionPaper',params:{id:response.data.test_id}});
        }
        
      }).catch(error=>{
        this.isLoading=false;
        console.log(error);
      })
    }
  },
  components: { IonLoading}
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
  

</style>