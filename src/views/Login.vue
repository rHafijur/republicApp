<template>
  <div class="quiz-app-wrapper login-register">
        
         
        <div class="login login-wrapper">
            <div class="loging-reg-head">
                <h3 class="login-reg-title">Sign In</h3>
                <div class="lang-switch">
                    <span>EN</span>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="lang-slider round"></span>
                    </label>
                    <span>BN</span>
                </div>
            </div>
            <div class="login-hero">
                <img src="assets/img/login-hero.png" alt="">
            </div>
            <div class="login-form">
                  <div class="r-form-group">
                        <label for="">Mobile No</label>
                        <input type="text" class="form-control" v-model="user.phone" :class="{'is-invalid':isAuthenticationFailed}" placeholder="Enter your Mobile no" name="" id="">
                        <div class="invalid-feedback">
                          Wrong Phone or Password!
                        </div>
                    </div>
                    <div class="r-form-group no-mar">
                        <label for="">Password</label>
                        <input type="password" v-model="user.password" placeholder="Enter your password" name="" id="">
                    </div>
                    <div class="r-form-check">
                        <label for=""><input type="checkbox" name="" id=""> Remember me</label>
                        <span><a href="forget-password.html">Forget Password?</a></span>
                    </div>
                    <div class="r-form-submit">
                        <input @click="tryLogin" id="login" type="submit" value="Sign In">
                    </div>
                  <span class="ortext">Or</span>

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
                </ul>

                <div class="sign-up-text-btn">
                    <p>Don't Have an account? <router-link :to="{name:'Register'}">Sign Up</router-link></p>
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
        password:'',
        tokenName:'mobile app'
      },
      isAuthenticationFailed:false
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
    tryLogin(){
      this.$http.post('/login',this.user).then(response=>{
        if(response.data.status=='error'){
          this.isAuthenticationFailed=true;
        }else{
          console.log(response.data);
          localStorage.token=response.data.token;
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