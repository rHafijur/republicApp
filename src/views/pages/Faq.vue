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
            <p class="text-center">Frequently asked questions</p>
            <div class="model-test-list">
              <div class="row d-flex justify-content-center">
                  <Accordion>
                    <AccordionTab v-for="(faq,i) of faqs" :key="i" :header="faq.text">
                        {{faq.ans}}
                    </AccordionTab>
                </Accordion>
              </div> 
        </div>
    </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
// import { IonButton, IonLoading } from '@ionic/vue';

export default defineComponent({
  name: 'Balance',
  props: {
  },
  data() {
    return {
      faqs: [] as any
    }
  },
  created(){
    //   console.log(this.content);
      
      this.$http.get('/faq').then(response=>{
      this.faqs=response.data.faqs;
      
      }).catch(function (error) {
        console.log(error);
      });
  },
  components: {Accordion,AccordionTab}
});
</script>

<style>
  .p-accordion-header-text {
    line-height: 2 !important;
    font-size: 15px;
    text-align: start;
}
.p-accordion-content {
    font-size: 14px;
    color: black !important;
    font-weight: 350;
}
.p-accordion .p-accordion-tab {
    margin-bottom: 5px !important;
}
</style>