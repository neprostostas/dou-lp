<script>
import { ref } from 'vue';
import people1 from '../../public/images/people1.png';
import people2 from '../../public/images/people2.png';
import people3 from '../../public/images/people3.png';
import people4 from '../../public/images/people4.png';
import people5 from '../../public/images/people5.png';

export default {
  setup() {
    const images = [people1, people2, people3, people4, people5];
    const peopleImages = ref([]);
    const totalImages = images.length;
    const targetCount = 39;
    for (let i = 0; i < targetCount; i++) {
      const imageIndex = i % totalImages;
      peopleImages.value.push({
        src: images[imageIndex],
        alt: `Person ${imageIndex + 1}`
      });
    }
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

      <div class="flex-center">
        <button class="circle">
          <span>тисни</span>
          <span>ТУТ</span>
        </button>
      </div>

      <div class="info second">
        <div class="text" v-html="content['goblock']['text']"></div>
      </div>

      <div class="people">
        <img v-for="(image, index) in peopleImages" :key="index" :src="image.src" :alt="image.alt" />
      </div>

    </div>
  </section>

</template>