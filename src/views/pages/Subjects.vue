<template>
  <div scrollY="true" class="quiz-app-wrapper">
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
            <p>{{pageTitle}}</p>
            <ul class="q-menu-list">
                <template v-for="(subject,i) of subjects" :key="i">
                    <menu-item :link="getLink(subject)" :title="subject.title" icon="assets/img/book.png"></menu-item>
                </template>
                <!-- <menu-item title="Group Exam" icon="assets/img/academic-exam-icon.png"></menu-item> -->
            </ul>
        </div>
        <!-- <div class="category-slider">
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
        </div> -->
      </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import MenuItem from  '../components/layouts/MenuItem.vue'

export default defineComponent({
  name: 'Individual',
  data(){
    return {
      subjects:[],
      pageTitle:'',
    }
  },
  methods:{
      getLink(subject: any){
        if(this.$route.params.examModel=='individual'){
            return {name:'ExamList', params:{typeId:this.$route.params.typeId, subjectId:subject.id}};
        }else if(this.$route.params.examModel=='group'){
          return {name:'ExamCalender', params:{typeId:this.$route.params.typeId}};
        }
      },
      getTitle(id: any){
          if(localStorage.types!=null){
              const types=JSON.parse(localStorage.types);
              for(const _type of types){
                  if(_type.id==id){
                      return _type.title;
                  }
              }
          }
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
    const title=this.getTitle(this.$route.params.typeId);
    if(this.$route.params.examModel=='individual'){
      this.pageTitle="INDIVIDUAL - "+title;
    }else if(this.$route.params.examModel=='group'){
      this.pageTitle="GROUP - "+title;
    }
    this.$http.get('/'+this.$route.params.examModel+'_exam/type/'+this.$route.params.typeId).then(response=>{
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
