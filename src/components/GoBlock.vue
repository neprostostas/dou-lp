<script>
import {ref, onMounted} from 'vue';
import {fetchPeopleData, goEvent} from '@/services/api/fetchPeople.js';

export default {
  methods: {
    goEvent
  },
  setup() {
    const peopleImages = ref([]);
    const isUserGoes = ref(false);
    const user_imgSrc = ref("");
    const user_name = ref("");

    onMounted(async () => {

      const userData = JSON.parse(localStorage.getItem('user_data'));
      if (userData) {
        user_imgSrc.value = userData.imgSrc;
        user_name.value = userData.name;
      }

      await updatePeopleImages();
      isUserGoes.value = window.USER_GOES; // Встановлення початкового стану
      console.log("onMount: isUserGoes - ", isUserGoes.value);
    });

    const updatePeopleImages = async () => {
      peopleImages.value = await fetchPeopleData();
      console.log(peopleImages);
    };

    const goEventAndUpdate = async () => {
      if (!isUserGoes.value) {
        const response = await goEvent();
        if (response.success) {

          const userData = JSON.parse(localStorage.getItem('user_data'));
          if (userData) {
            user_imgSrc.value = userData.imgSrc;
            user_name.value = userData.name;
          }

          await updatePeopleImages();
          isUserGoes.value = true;
          console.log("after API: isUserGoes - ", isUserGoes.value);
        }
      }
    };


    return {
      peopleImages,
      goEventAndUpdate,
      isUserGoes,
      user_imgSrc,
      user_name,
    };
  },
};
</script>

<template>
  <section id="goblock">
    <div class="container">
      <div class="info">
        <div v-html="content['goblock']['title']"></div>
      </div>

      <div class="flex-center" @click="goEventAndUpdate">
        <button v-if="!isUserGoes" class="circle">
          <span>тисни</span>
          <span>ТУТ</span>
        </button>
        <div v-else class="a-image-me">
          <img class="image-me" :src="user_imgSrc.replace('/25x25', '/200x200').replace('/50x50', '/200x200')" :alt="user_name">
        </div>
      </div>

      <div class="info second">
        <div class="text" v-html="content['goblock']['text']"></div>
      </div>

      <div class="people">
        <a v-for="(image, index) in peopleImages" :key="index" :href="image?.url" target="_blank">
          <img :src="image?.src" :alt="image?.alt" />
        </a>
      </div>

    </div>
  </section>

</template>