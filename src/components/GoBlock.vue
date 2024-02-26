<script>
import { ref, onMounted } from 'vue';
import {fetchPeopleData, goEvent} from '@/services/api/fetchPeople.js';

export default {
  methods: {
    goEvent
  },
  setup() {
    const peopleImages = ref([]);

    onMounted(async () => {
      peopleImages.value = await fetchPeopleData();
    });

    return {
      peopleImages,
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

      <div class="flex-center" @click="goEvent">
        <a class="circle" href="javascript:void(0);" target="_blank">
          <span>тисни</span>
          <span>ТУТ</span>
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