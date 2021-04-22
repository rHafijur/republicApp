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
            <p class="text-center">My Categories</p>
            <div class="model-test-list">
                <ion-item v-if="open">
                    <ion-label>Academic Types</ion-label>
                    <ion-select multiple="true" placeholder="Select Types" v-model="data.selectedAcademicTypes" @IonChange="save">
                        <ion-select-option  v-for=" (type,i) of data.academicTypes" :key="i"  :value="type.value" :title="type.label">{{type.label}}</ion-select-option>
                    </ion-select>
                </ion-item>
            </div>
        </div>
        
        
        <!-- <MultiSelect v-model="data.selectedAcademicTypes" :options="data.academicTypes" optionLabel="label" placeholder="Select Academic Types" /> -->
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonSelect, IonSelectOption} from '@ionic/vue';
// import MultiSelect from 'primevue/multiselect';

export default defineComponent({
  name: 'Categories',
  props: {
  },
  data() {
    return {
    open:false as boolean,
      data: {
        academicTypes:[] as any,
        selectedAcademicTypes:[] as any,  
      }
    }
  },
  methods:{
      save(){
          this.$http.post('/categories/save',{types:this.data.selectedAcademicTypes});
          localStorage.types=this.data.selectedAcademicTypes;
      }
  },
  created(){
    //   console.log(this.content);
      
      this.$http.get('/categories',
      {
        cache: {
          maxAge: 1,
        }
      }
      ).then(response=>{
          const types=[];
          for(const t of response.data.academicTypes){
              console.log(t);
              
              types.push({label:t.title,value:t.id});
          }
      this.data.academicTypes=types;
      this.data.selectedAcademicTypes=response.data.selectedAcademicTypes;
      localStorage.types=response.data.selectedAcademicTypes;
      this.open=true;
      }).catch(function (error) {
        console.log(error);
      });
  },
  components: {IonItem, IonSelect, IonSelectOption}
});
</script>
<style scoped>
.q-menu-box{
    padding: 15px 3px !important;
}
</style>
<style>
.alert-wrapper {
    width: 80% !important;
    max-width: 80% !important;
}
</style>