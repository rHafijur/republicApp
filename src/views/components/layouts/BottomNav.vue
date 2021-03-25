<template>
    <div class="q-bottom-menus">
            <ul class="qbm-list">
                <li>
                    <a href="#">
                        <div class="qbm-single">
                            <img src="assets/img/home.png" alt="">
                            <p>Home</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="qbm-single">
                            <img src="assets/img/search.png" alt="">
                            <p>Search</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="qbm-single">
                            <img src="assets/img/quiz.png" alt="">
                            <p>QUIZ</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="qbm-single">
                            <img src="assets/img/score.png" alt="">
                            <p>Score</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="qbm-single">
                            <img src="assets/img/profile.png" alt="">
                            <p>Profile</p>
                        </div>
                    </a>
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