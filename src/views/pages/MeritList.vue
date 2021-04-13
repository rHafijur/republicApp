<template>
<div class="quiz-app-wrapper pad-bottom-0">
        
        <img src="assets/img/top-bg.png" alt="" class="app_header_top_bg">
        <!-- Header Area -->
        <div class="quiz-header qhV2">
            <div class="q-container">
                <div class="q-row">
                    <div class="qh-back-btn">
                        <button style="background:transparent;font-size: 24px;color:#fff" @click="$router.go(-1)"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                    </div>
                    <div class="q-full-width">
                        <h3>Merit List</h3> 
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /Header Area -->
        <!-- <DataTable :value="tests" responsiveLayout="scroll">
            <Column field="user.name" header="Name"></Column>
            <Column field="earned_marks" header="Marks"></Column>
            <Column header="Position">
                <template let-i="rowIndex">
                    {{i+1}}
                </template>
            </Column>
        </DataTable> -->
        <table class="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Marks</th>
                    <th>Positon</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(test,i) of tests" :key="i">
                    <td>{{test.user.name}}</td>
                    <td>{{test.earned_marks}}</td>
                    <td style="text-align:right !important">{{i+1}}</td>
                </tr>
            </tbody>
        </table>
        <!-- <div class="q-notific-box qlV2">
            <ul class="qnot-list">
                <li v-for="(test,i) of tests" :key="i">
                    <div class="single-merit">
                        <span class="sm-count">{{i+1}}.</span><span class="sm-name">{{test.user.name}} :</span> <span class="sm-number">{{test.earned_marks}}</span>
                    </div>
                </li>
            </ul> 
        </div>   -->
    </div>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MeritList',
  data(){
    return {
      tests:[],
    }
  },
  methods:{
      getLink(id: any){
          return { name: 'IndividualExamDetail', params: { id: id } };
      }
  },
  components: {
    // DataTable,
    // Column,
    // IonTitle,
    // IonToolbar
  },
  created(){
    //   console.log("Page created");
    const link='/merit_list/'+this.$route.params.id;
    this.$http.get(link).then(response=>{
        // console.log(response.data);
        this.tests=response.data;
      }).catch(function (error) {
        console.log(error);
      })
  }
});
</script>

<style scoped>

</style>
