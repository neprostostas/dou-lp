<script setup>
import Lightbox from "@/components/Lightbox.vue";
import {ref, computed, onMounted, onUnmounted} from "vue";

const props = defineProps({
  showLightbox: Boolean,
})
const emit = defineEmits(['handleLightbox'])

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    emit('handleLightbox', false)
  }
}

onMounted(() => {
  window.addEventListener('keydown', onEscKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onEscKeyPress);
});

const lightboxData = ref({})

function showSpeaker({title, description, about_title, about_text, image, socials}, stage) {
  lightboxData.value = {
    title,
    description,
    about_title,
    about_text,
    image,
    socials
  }

  const isSecretGuest = about_title === 'Секретний спікер' ? true : false

  // don't open modal for "Main Stage" and "SecretGuest"
  stage['main']['title'] === "Main Stage" || isSecretGuest ? null : emit('handleLightbox', true)

}

function handleClick(link) {
  if (!link) {
    event.preventDefault();
  }
}

const processedDescription = computed(() => {
  if (!lightboxData.value.description) return [];
  return lightboxData.value.description.split('\n').filter(line => line.trim() !== '');
});

</script>

<template>
  <section id="speakers">
    <div class="container">
      <div class="speakers-title">
        <h2>{{ content['speakers']['title'] }}</h2>
        <p class="subtitle">{{ content['speakers']['subtitle'] }}</p>
      </div>
      <div v-for="stage in content['speakers']['stages']" :class="{'stage-hidden': stage.main.title === 'Main Stage'}" class="stage">

        <h3>{{ stage['main']['title'] }}</h3>

        <div class="main" v-if="false">
          <h3>{{ stage['main']['title'] }}</h3>
          <div class="list">
            <div v-for="item in stage['main']['list']" class="speaker_item" :class="{ unhover: stage['main']['title'] === 'Main Stage' || item['name'] === 'Секретний спікер', soon: item['soon'] === true }" @click="showSpeaker(item, stage)">
              <div class="image-box">
                <img :src="imagePath + item['image']" :alt="item['name']">
              </div>
              <div class="content-box">
                <p v-if="false" class="title" v-html="item['title']" />
                  <span class="name" v-html="item['name']" />
                <span class="position" v-html="item['position']" />
              </div>
            </div>
          </div>
        </div>

        <div v-show="stage['sub']" class="sub">
          <!--<h4>{{ stage['sub']['title'] }}</h4>-->
          <div class="list">
            <div v-for="item in stage['sub']['list']" class="speaker_item unhover">
              <div class="image-box">
                <img :src="imagePath + item['image']" :alt="item['name']">
              </div>
              <div class="content-box">
                <a class="link" :href="item['link']" target="_blank">
                  <span class="name" v-html="item['name']" />
                </a>
                <span class="position" v-html="item['position']" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <Lightbox :show="showLightbox" @close="emit('handleLightbox', false)">
    <div class="about-speaker">
      <div class="title" v-html="lightboxData.title" />
      <div class="content">
        <div class="content-box">
          <p class="content-title" v-html="lightboxData.about_title" />
          <p class="about-text" v-for="(line, index) in processedDescription" :key="index" v-html="line"></p>
        </div>
        <div class="image-box">
          <img class="avatar" :src="imagePath + lightboxData.image" :alt="lightboxData.title">
        </div>
      </div>

      <div>
        <template  v-for="social in lightboxData.socials">
          <a v-if="social['link']"
             :href="social['link']"
             @click="handleClick(social['link'])"
             class="social"
             target="_blank">
            <component v-if="social['link']" :is="social['name']"></component>
          </a>
        </template>
      </div>

    </div>
  </Lightbox>

</template>

<style scoped>
.stage-hidden {
  display: none!important;
}
.soon {
  display: none!important;
}
</style>