<template>
    <div class="q-bottom-menus">
            <ul class="qbm-list">
                <li>
                    <router-link :to="{name:'Home'}">
                        <div class="qbm-single">
                            <img src="assets/img/home.png" alt="">
                            <p>Home</p>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Faq'}">
                        <div class="qbm-single">
                            <img src="assets/img/faq.svg" alt="">
                            <p>FAQ</p>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Types',params:{examModel:'individual'}}">
                        <div class="qbm-single">
                            <img src="assets/img/quiz.png" alt="">
                            <p>QUIZ</p>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'ScoreCard'}">
                        <div class="qbm-single">
                            <img src="assets/img/score.png" alt="">
                            <p>Score</p>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'Profile'}">
                        <div class="qbm-single">
                            <img src="assets/img/profile.png" alt="">
                            <p>Profile</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BottomNav',
  components: {
    // IonContent,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar
  }
});
</script>

<style scoped>
h1{
    color:aqua
}
</style>