<template>
  <div class="quiz-app-wrapper">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Enter Verification Code</h3>
                        <p>We have send a 6 digit  verification code  to your mobile number.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <div v-if="verificationFailed">
                <p style="color:red;font-size:22px">OTP Verification failed</p>
            </div>
            <div v-if="invalidCode">
                <p style="color:red;font-size:22px">Please Enter valid code</p>
            </div>
            <div class="forget-pass-box">
                <div>
                    <ul class="fp-inputs">
                        <li>
                            <input v-model="codes[0]" @click="$event.preventDefault()" @focus="$event.target.select()" v-on:keyup="goToNext" type="text" placeholder="">
                        </li>
                        <li>
                            <input v-model="codes[1]" @click="$event.preventDefault()" @focus="$event.target.select()" v-on:keyup="goToNext" type="text" placeholder="">
                        </li>
                        <li>
                            <input v-model="codes[2]" @click="$event.preventDefault()" @focus="$event.target.select()" v-on:keyup="goToNext" type="text" placeholder="">
                        </li>
                        <li>
                            <input v-model="codes[3]" @click="$event.preventDefault()" @focus="$event.target.select()" v-on:keyup="goToNext" type="text" placeholder="">
                        </li>
                        <li>
                            <input v-model="codes[4]" @click="$event.preventDefault()" @focus="$event.target.select()" v-on:keyup="goToNext" type="text" placeholder="">
                        </li>
                        <li>
                            <input v-model="codes[5]" @click="$event.preventDefault()" @focus="$event.target.select()" v-on:keyup="$event.target.blur()" type="text" placeholder="">
                        </li>
                    </ul>
                    <span v-show="seconds>0">please wait {{seconds}} seconds</span>
                    <p v-show="seconds<=0">Don't receive the OTP? <span @click="resendOtp" style="cursor:pointer">Resend OTP</span></p>
                    <div class="r-form-submit">
                        <input @click="verify" type="submit" value="Verify">
                    </div>
                </div>
                
            </div> 
        </div> 
        <ion-loading
            :is-open="isLoading"
            cssClass="my-custom-class"
            message="Please wait..."
            
        >
        </ion-loading> 
    </div>
</template>

<script lang="ts">
import { IonLoading } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Otp',
  data(){
    return {
        codes:['','','','','',''] as any,
        verificationFailed:false as boolean,
        isLoading:false as boolean,
        invalidCode:false as boolean,
        seconds:45 as number,
    }
  },
  components: {
    IonLoading,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  created(){
      this.timer();
  },
  methods:{
    goToNext(event: any){
        const el=event.target.parentElement.nextElementSibling.children[0];
        // console.log(event.target.value);
        
        el.focus();
        // el.select();
    },
    timer(){
        this.seconds=45;   
        const countdown=setInterval(()=>{
            if(this.seconds<=0){
                clearInterval(countdown);
            }
            this.seconds--;
        },1000);
    },
    resendOtp(){
        this.$http.post('/register/otp/resend',
        {
            uId:localStorage.uId,
        }
        ).then(response=>{
            if(response.data.status=='success'){
                this.timer();
            }
        this.isLoading=false;
      }).catch(error=>{
        this.isLoading=false;
        console.log(error);
      })
    },
    verify(){
        const code=this.codes.join('');
        console.log(code);
        
        if(code.length!=6){
            this.invalidCode=true;
            return;
        }else{
            this.invalidCode=false;
        }
        this.$http.post('/forget_password/otp/verify',
        {
            uId:localStorage.uId,
            code:code,
        }
        ).then(response=>{
        this.isLoading=false;
        if(response.data.status=='failed'){
          this.verificationFailed=true;
        }else{
          localStorage.passwordResetToken=response.data.passwordResetToken;
          this.$router.replace({name:'PasswordReset'});
        }
        
      }).catch(error=>{
        this.isLoading=false;
        console.log(error);
      })
    }
  },
  
});
</script>

<style scoped>

</style>