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