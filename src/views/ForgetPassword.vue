<template>
  <div class="quiz-app-wrapper login-register">
        
         
        <div class="login login-wrapper">
            <div class="loging-reg-head">
                <h3 class="login-reg-title">Forget Password</h3>
            </div>
            <div class="login-hero">
                <img src="assets/img/login-hero.png" alt="">
            </div>
            <div class="login-form">
                  <div class="r-form-group">
                        <label for="">Mobile No</label>
                        <input type="text" class="form-control" v-model="user.phone" :class="{'is-invalid':isPhoneError}" placeholder="Enter your Mobile no" name="" id="">
                        <div class="invalid-feedback">
                          {{errorMessage}}
                        </div>
                    </div>
                    <div class="r-form-submit">
                        <input @click="sendOtp" type="submit" value="Send Password Reset Code">
                    </div>

            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  data(){
    return {
      user:{
        phone:'',
      },
      isPhoneError:false as boolean,
      errorMessage:'' as string,
    }
  },
  components: {
    // IonContent,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  methods:{
    sendOtp(){
        if(this.user.phone.length!=11){
          this.errorMessage="Phone number must be 11 digit";
          this.isPhoneError=true;
          return;
        }else{
            this.isPhoneError=false;
        }
      this.$http.post('/forget_password',this.user).then(response=>{
        if(response.data.status=='error'){
          this.errorMessage=response.data.message;
          this.isPhoneError=true;
        }else{
          console.log(response.data);
          localStorage.uId=response.data.uId;
          this.$router.push({name:'ForgetPasswordOtp'});
        }
      }).catch((error) => {
            this.errorMessage="Something went wrong";
            this.isPhoneError=true;
            console.log(error);
      })
    }
  },
  
});
</script>

<style scoped>

</style>