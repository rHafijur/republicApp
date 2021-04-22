<template>
  <div class="quiz-app-wrapper login-register">
        
         
        <div class="login login-wrapper">
            <div class="loging-reg-head">
                <h3 class="login-reg-title">Reset Password</h3>
                 
            </div>
            <div class="login-hero">
                <img src="assets/img/sign-up-hero.png" alt="">
            </div>
            <div class="login-form">
                <div>
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
                        <input @click="tryResetPassword" type="submit" value="Submit">
                    </div>
                </div>

            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PasswordReset',
  data(){
    return {
      user:{
        password:'',
        retypePassword:'',
        tokenName:'mobile app'
      },
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
    tryResetPassword(){
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
      this.$http.post('forget_password/password/reset',{
          password:this.user.password,
          passwordResetToken:localStorage.passwordResetToken,
      }).then(response=>{
        if(response.data.status=='success'){
          localStorage.token=response.data.token;
          localStorage.types=response.data.types;
          this.$router.replace({name:'Home'});
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