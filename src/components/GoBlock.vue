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
    const user_imgSrc = ref("")
    const user_name = ref("")
    const user_url = ref("")

    onMounted(async () => {
      await updatePeopleImages();
      isUserGoes.value = window.USER_GOES; // Встановлення початкового стану
      console.log("onMount: isUserGoes - ", isUserGoes.value);

      user_imgSrc.value = window.user_imgSrc
      user_name.value = window.user_name
      user_url.value = window.user_url
    });

    const updatePeopleImages = async () => {
      peopleImages.value = await fetchPeopleData();
      console.log(peopleImages);
    };

    const goEventAndUpdate = async () => {
      if (!isUserGoes.value) {
        const response = await goEvent();
        if (response.success) {
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
      user_url
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
        <a v-else class="a-image-me" :href="user_url" target="_blank">
          <img class="image-me" :src="user_imgSrc?.replace('/25x25', '/200x200').replace('/50x50', '/200x200')" :alt="user_name">
        </a>
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