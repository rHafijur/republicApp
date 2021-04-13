<template>
  <div class="quiz-app-wrapper login-register">
        
         
        <div class="login login-wrapper">
            <div class="loging-reg-head">
                <h3 class="login-reg-title">Sign Up</h3>
                 
            </div>
            <div class="login-hero">
                <img src="assets/img/sign-up-hero.png" alt="">
            </div>
            <div class="login-form">
                <div>
                    <div class="r-form-group">
                        <label for="">Full Name</label>
                        <input class="form-control" v-model="user.name" :class="{'is-invalid':isNameError}" type="text" placeholder="Enter your full name" name="">
                        <div class="invalid-feedback">
                          Name must be at least 3 charecters
                        </div>
                    </div>
                    <div class="r-form-group">
                        <label for="">Phone Number</label>
                        <input class="form-control" v-model="user.phone" :class="{'is-invalid':isPhoneError}" type="text" placeholder="Enter your Phone no" name="">
                        <div class="invalid-feedback">
                          {{phoneError}}
                        </div>
                    </div>
                    <div class="r-form-group">
                        <label for="">Password</label>
                        <input class="form-control" v-model="user.password" :class="{'is-invalid':isPasswordError}" type="password" placeholder="Enter your password" name="">
                        <div class="invalid-feedback">
                          Password must be at least 6 charecters.
                        </div>
                    </div>
                    <div class="r-form-group">
                        <label for="">Confirm Password</label>
                        <input class="form-control" v-model="user.retypePassword" :class="{'is-invalid':isConfirmationFaild}" type="password" placeholder="Enter your password" name="">
                        <div class="invalid-feedback">
                          Could not match with Password
                        </div>
                    </div>
                    <!-- <div class="r-form-group">
                        <label for="">Academic Area</label>
                        <select name="">
                            <option value="0">Choose your academic area</option>
                            <option value="1">SSC</option>
                            <option value="2">HSC</option>
                            <option value="3">JSC</option>
                            <option value="4">Bank Job</option>
                        </select>
                    </div> -->
                    
                    <div class="r-form-submit">
                        <input @click="tryRegister" type="submit" value="Sign Up">
                    </div>
                </div>
                <!-- <span class="ortext">Or</span>

                <ul class="fg-list">
                    <li>
                        <a href="#">
                            <img src="assets/img/facebook.png" alt="">
                            <span>Facebook</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="assets/img/google.png" alt="">
                            <span>Google</span>
                        </a>
                    </li>
                </ul> -->

                <div class="sign-up-text-btn">
                    <p>Already Have Account? <router-link :to="{name:'Login'}">Sign In</router-link></p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { useBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  created() {
    useBackButton(10, () => {
      this.$router.go(-1);
    });
  },
  data(){
    return {
      user:{
        phone:'',
        name:'',
        password:'',
        retypePassword:'',
        tokenName:'mobile app'
      },
      phoneError:'',
      isPhoneError:false,
      isNameError:false,
      isPasswordError:false,
      isConfirmationFaild:false,
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
    tryRegister(){
      if(this.user.name.length<3){
          this.isNameError=true;
          return;
      }else{
          this.isNameError=false;
      }
      if(this.user.phone.length!=11){
          this.phoneError="Phone number must be 11 digit";
          this.isPhoneError=true;
          return;
      }else{
          this.isPhoneError=false;
      }
      
      if(this.user.password.length<6){
          this.isPasswordError=true;
          return;
      }else{
          this.isPasswordError=false;
      }
      
      if(this.user.password!=this.user.retypePassword){
          this.isConfirmationFaild=true;
          return;
      }else{
          this.isConfirmationFaild=false;
      }
      this.$http.post('/register',this.user).then(response=>{
        if(response.data.status=='error'){
          if(response.data.phoneNumberExists==true){
                this.phoneError="Phone already exists";
                this.isPhoneError=true;
          }
        }else{
          console.log(response.data);
          localStorage.uId=response.data.uId;
          localStorage.phoneVerified=false;
          this.$router.replace({name:'Otp'});
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  
});
</script>

<style scoped>

</style>