<template>
<div class="quiz-app-wrapper">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="profile-head-box">
                        <img src="assets/img/profile-img.png" alt="" class="user-img">
                        <h3>Republic Education</h3>
                        <p>Spread Your Knowledge</p>
                    </div>
                 
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box profile-menu-box"> 
           <div class="edit-reg-box">
                <div class="login-form">
                    <form action="">
                        <div class="r-form-group">
                            <label for="">Full Name</label>
                            <input class="form-control" :class="{'is-invalid':isNameError}" type="text" placeholder="Enter Your Full Name" v-model='user.name'>
                            <div class="invalid-feedback">
                                Name must be at least 3 charecters
                            </div>
                        </div>
                        <div class="r-form-group">
                            <label for="">Mobile No</label>
                            <input class="form-control" type="text" placeholder="Enter your Mobile no" :value="user.phone" disabled>
                        </div>
                        <div class="r-form-group">
                            <label for="">Email Address</label>
                            <input class="form-control" :class="{'is-invalid':isEmailError}" type="email" placeholder="Enter your email" v-model="user.email">
                            <div class="invalid-feedback">
                                Invalid Email
                            </div>
                        </div>
                        <div class="r-form-submit">
                            <input type="button" @click="updateProfile" value="Update Profile">
                        </div>
                        <div class="r-form-group">
                            <label for="">Current Password</label>
                            <input class="form-control" :class="{'is-invalid':isPasswordError}" type="password" placeholder="Enter your password" v-model="password">
                            <div class="invalid-feedback">
                                Password must be at least 6 charecters.
                            </div>
                        </div>
                        <div class="r-form-group">
                            <label for="">New Password</label>
                            <input class="form-control" :class="{'is-invalid':isConfirmationFaild}" type="password" placeholder="Enter your password" v-model="retypePassword">
                            <div class="invalid-feedback">
                                Could not match with Password
                            </div>
                        </div>
                      
                        
                        <div class="r-form-submit">
                            <input type="button" @click="updatePassword" value="Save Change">
                        </div>
                    </form>
                     
                </div>
           </div>
        </div>
    </div>
</template>

<script lang="ts">
import { toastController } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExamList',
  data(){
    return {
      user:[] as any,
      password:'',
      retypePassword:'',
      isEmailError:false,
      isNameError:false,
      isPasswordError:false,
      isConfirmationFaild:false,
    }
  },
  methods:{
      getLink(id: any){
          return { name: 'IndividualExamDetail', params: { id: id } };
      },
      async showtoast(message: string){
          const toast = await toastController
        .create({
          message: message,
          duration: 2000
        })
        return toast.present();
      }
      ,
      updateProfile(){
        if(this.user.name.length<3){
            this.isNameError=true;
            return;
        }else{
            this.isNameError=false;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(! re.test(this.user.email)){
            this.isEmailError=true;
            return;
        }else{
            this.isEmailError=false;
        }

        const link='/profile/update';
        this.$http.post(link,this.user).then(response=>{
            if(response.data.status=='success'){
                this.showtoast('Profile Updated Successfully');
            }
        }).catch((error)=>{
                this.showtoast('Profile Update Failed');
            console.log(error);
        })
      },
      updatePassword(){
        if(this.password.length<6){
          this.isPasswordError=true;
          return;
        }else{
            this.isPasswordError=false;
        }
        
        if(this.password!=this.retypePassword){
            this.isConfirmationFaild=true;
            return;
        }else{
            this.isConfirmationFaild=false;
        }
        const link='/profile/password/update';
        this.$http.post(link,{
            password:this.password
        }).then(response=>{
            if(response.data.status=='success'){
                this.password='';
                this.retypePassword='';
                this.showtoast('Password Updated');
            }
        }).catch((error)=>{
                this.showtoast('Password Update Failed');
            console.log(error);
        })
      }
  },
  components: {
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  created(){
    //   console.log("Page created");
    const link='/profile';
    this.$http.get(link).then(response=>{
        // console.log(response.data);
        this.user=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  },
});
</script>

<style scoped>

</style>
