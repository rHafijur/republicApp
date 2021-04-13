<template>
    <li>
        <div class="single-menu">
            <router-link :to="link">
                <div class="menu-single-icon menu-icon-style-b">
                    <img :src="icon" :alt="title">
                </div> 
                <p>{{title}}</p>
            </router-link>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuItem',
  props:['icon','title','link'],
  components: {
    // IonContent,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  }
});
</script>