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
            <p class="text-center">Balance</p>
            <div class="model-test-list">
              <div class="row d-flex justify-content-center">
                <div class="col-md-10 content">
                    <div>
                        <div class="form-row">
                          <div class="form-group col-md-12">
                              <label for="title">Remaining Trial</label>
                              <div class="val">
                                {{trial}}
                              </div>
                            </div>
                          <div class="form-group col-md-12">
                              <label for="fee">Credit Balance</label>
                              <div class="val">৳ {{credit}}</div>
                            </div>
                      </div>
                      <hr>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="question_type">Remaining Exam Balance</label>
                                <div class="val">{{exam}}</div>
                              </div>
                        </div>
                        <hr>
                        <div class="form-row history">
                          <div class="form-group col-md-12">
                            <label>Unlimited Exam Expire Date</label>
                            <div class="val">{{date}}</div>
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
// import { IonButton, IonLoading } from '@ionic/vue';

export default defineComponent({
  name: 'Balance',
  props: {
  },
  data() {
    return {
      exam:'' as string,
      trial:'' as string,
      credit:'' as string,
      date:'' as string,
    }
  },
  created(){
    //   console.log(this.content);
      
      this.$http.get('/balance',
      {
        cache: {
          maxAge: 1,
        }
      }
      ).then(response=>{
      this.exam=response.data.exam;
      this.trial=response.data.trial;
      this.credit=response.data.credit;
      this.date=response.data.date;
      

      }).catch(function (error) {
        console.log(error);
      });
  },
  components: {}
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