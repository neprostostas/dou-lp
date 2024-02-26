<script>
import {ref, onMounted} from 'vue';
import {fetchPeopleData, goEvent} from '@/services/api/fetchPeople.js';

export default {
  methods: {
    goEvent
  },
  setup() {
    const peopleImages = ref([]);

    const updatePeopleImages = async () => {
      peopleImages.value = await fetchPeopleData();
    };

    onMounted(async () => {
      await updatePeopleImages();
    });

    const goEventAndUpdate = async () => {
      await goEvent(updatePeopleImages);
    };

    return {
      peopleImages,
      goEventAndUpdate
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
        <button class="circle">
          <span>тисни</span>
          <span>ТУТ</span>
        </button>
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