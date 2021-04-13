<template>
<div class="quiz-app-wrapper qaw3 pad-bottom-0">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header qhV2">
            <div class="q-container">
                <div class="q-row">
                    <div class="qh-back-btn">
                        <button style="background:transparent;font-size: 24px;color:#fff" @click="$router.go(-1)"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                    </div>
                    <div class="q-full-width">
                        <h3>Packages</h3> 
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-notific-box qlV2">
           <div class="package-boxes">
            <div v-for="(pkg,i) of packages" :key="i" class="rep-single-package">
                <div class="card-header">
              <h4 class="my-0 font-weight-normal">{{pkg.title}}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">৳{{pkg.price}} <small style="font-size: 15px" class="text-muted">{{pkg.val}}</small></h1>
              
              <div class="mt-3 mb-4 rsp-content">
                  {{pkg.description}}
              </div>
              <button @click="purchagePackage(pkg.id)" type="button" class="btn btn-lg btn-block btn-outline-primary">Buy Now</button>
            </div>
                
            </div>
           </div>
          
        </div>  
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { Browser } from '@capacitor/browser';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Packages',
  data(){
    return {
      packages:[],
      uid:'' as string
    }
  },
  methods:{
      async purchagePackage(id: number){
          await Browser.open({ url: 'https://student.republiceducationbd.com/app/purchage/package/'+this.uid+"/"+id });
          Browser.addListener('browserFinished',()=>{
              this.$router.push({name:'Balance'});
          });
      }
  },
  components: {
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  created(){
    //   console.log("Page created");
    const link='/packages';
    this.$http.get(link).then(response=>{
        // console.log(response.data);
        this.packages=response.data.pkgs;
        this.uid=response.data.uid;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>
        .rep-single-package {
        max-width: 300px;
        margin: 30px auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: all 0.3s;
        margin-bottom: 40px;
        box-shadow: 0 0 7px 4px #e8e8e8;
        position: relative;
    }
    
    .rep-single-package .card-header {
        position: relative;
        padding: 15px;
        text-align: center;
        text-transform: uppercase;
        background-color: #f5f5f5;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .rep-single-package .card-header h4 {
        font-size: 20px;
        line-height: 25px;
    }
    
    .rep-single-package .card-body {
        text-align: center;
        border-top: 10px solid #6fb744;
        border-bottom: 10px solid #6fb744;
        position: relative;
        padding: 0px !important;
    }
    
    .rep-single-package .card-body .pricing-card-title {
        position: relative;
        padding: 25px;
        color: #fff;
        background-color: #6fb744;
        padding-bottom: 60px;
        padding-top: 30px;
        clip-path: polygon(0% 0%, 100% 0, 100% 80%, 50% 100%, 0 80%);
        font-weight: 800;
    }
    
    .rep-single-package .card-body .pricing-card-title small {
        color: #fff !important;
        font-weight: 700;
    }
    
    .rsp-content {
            position: relative;
        padding: 25px;
        font-size: 16px;
        line-height: 30px;
        font-weight: 600;
        padding-top: 55px;
        /*padding-bottom: 5px;*/
    }
    
    .rep-single-package button {
            position: relative;
        width: 100%;
        background-color: #6fb744;
        padding: 6px 30px;
        text-transform: uppercase;
        border: 2px solid #6fb744;
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        line-height: 34px;
        transition: all 0.5s linear;
        -webkit-box-shadow: -5px 25px 34px -8px rgb(0 0 0 / 63%);
        box-shadow: -5px 25px 19px -8px rgb(0 0 0 / 30%);
        margin-bottom: 35px;
    }
    
    .rep-single-package form {
        padding: 0px 30px;
    }
    
    .rep-single-package button:hover {
         
        color: #fff; 
    }
    .rsp-content {
        border-top: 10px solid #6dd633d9;
        margin-top: 0px !important;
    }
    
    
    
    @media (max-width: 767px) {
        .package-wrapper {}
    
    .package-wrapper header.bg-white>div {
        position: relative;
        padding: 0px;
    }
    
    .package-wrapper .this-page-title {
        position: absolute;
        top: -10px;
        left: 120px;
        display: inline-block;
    }
    
    .package-box {
            padding: 0px !important;
        margin: 15px auto !important;
        position: relative;
    }
    
    .package-box .rep-single-package {
        margin-top: 15px;
    }
    
    .rep-single-package .card-body .pricing-card-title {
        /*padding-top: 10px;*/
        /*padding-bottom: 30px;*/
        /*font-size: 30px;*/
    }
    
    .rep-single-package .card-body .pricing-card-title small {
        font-size: 13px !important;
    }
    
    .rsp-content {
        padding-top: 20px !important;
        padding-bottom: 0px;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 18px !important;
    }
    
    .rep-single-package button {
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 30px;
    }
    
    .rep-single-package .card-header {
        padding: 10px;
    }
}
</style>
