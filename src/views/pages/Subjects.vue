<template>
  <div scrollY="true" class="quiz-app-wrapper">
      <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header">
            <div class="q-container">
                <div class="q-row">
                    <div class="q-full-width">
                        <h3>Repblic Education</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <div class="q-menu-box">
            <p>Repblic Education</p>
            <ul class="q-menu-list">
                <template v-for="(subject,i) of subjects" :key="i">
                    <menu-item :link="getLink(subject)" :title="subject.title" icon="assets/img/academic-exam-icon.png"></menu-item>
                </template>
                <!-- <menu-item title="Group Exam" icon="assets/img/academic-exam-icon.png"></menu-item> -->
            </ul>
        </div>
        <div class="category-slider">
            <p>Republic Categories</p>
            <div class="cs-owl-slider owl-carousel owl-theme">
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>HSC</p>
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>SSC</p>
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>JSC</p>
                        </a>
                    </div>
                </div>
                <div class="item">
                    <div class="q-single-cat">
                        <a href="#">
                            <p>BCS</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import MenuItem from  '../components/layouts/MenuItem.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Individual',
  data(){
    return {
      subjects:[],
    }
  },
  methods:{
      getLink(subject: any){
          return {name:'ExamList', params:{typeId:this.$route.params.typeId, subjectId:subject.id}};
      }
  },
  components: {
    MenuItem,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  },
  created(){
    //   console.log("Page created");
    this.$http.get('/individual_exam/type/'+this.$route.params.typeId).then(response=>{
        // console.log(response.data);
        this.subjects=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>

</style>