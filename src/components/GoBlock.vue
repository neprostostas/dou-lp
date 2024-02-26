<script>
import {ref, onMounted} from 'vue';
import {fetchPeopleData, goEvent} from '@/services/api/fetchPeople.js';

export default {
  methods: {
    goEvent
  },
  setup() {
    const peopleImages = ref([]);
    const isUserGoes = ref(false); // Реактивна обгортка
    const eventData = ref({});

    onMounted(async () => {
      await updatePeopleImages();
      isUserGoes.value = window.USER_GOES; // Встановлення початкового стану
      console.log("onMount: isUserGoes - ", isUserGoes.value);
    });

    const updatePeopleImages = async () => {
      peopleImages.value = await fetchPeopleData();
      console.log(peopleImages);
    };

    const goEventAndUpdate = async () => {
      // if (!isUserGoes.value) {
        const response = await goEvent();
        if (response.success) {
          await updatePeopleImages();
          isUserGoes.value = true;
          eventData.value = response.eventData; // Store the event data
          console.log("eventData: ", eventData.value);
          console.log("after API: isUserGoes - ", isUserGoes.value);
        }
      // }
    };


    return {
      peopleImages,
      goEventAndUpdate,
      isUserGoes,
      eventData
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
        <button v-if="!isUserGoes.value" class="circle">
          <span>тисни</span>
          <span>ТУТ</span>
        </button>
        <a v-else :href="eventData?.url" target="_blank">
          <img :src="eventData?.imgSrc" :alt="eventData?.name">
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