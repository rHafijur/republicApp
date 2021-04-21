<template>
    <!-- <ion-router-outlet name="bottom-nav" />
    <ion-router-outlet /> -->
    <ion-app>
      <ion-content>
        <router-view></router-view>
        <router-view name="bottom-nav"></router-view>
      </ion-content>
    </ion-app>
</template>

<script lang="ts">
// import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    // IonContent
  }
});
</script>
<style>
.fc-icon-chevron-left:before {
    content: "<" !important;
}
.fc-icon-chevron-right:before {
    content: ">" !important;
}
.fc-view-harness{
  height:  475px !important ;
}
body *{
  -webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
-o-user-select: none;
user-select: none;
}
</style>