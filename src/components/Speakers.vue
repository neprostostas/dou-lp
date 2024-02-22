<script setup>
import Lightbox from "@/components/Lightbox.vue";
import {ref} from "vue";

const props = defineProps({
  showLightbox: Boolean,
})
const emit = defineEmits(['handleLightbox'])

// const showLightbox = ref(false)
const lightboxData = ref({})

function showSpeaker({title, description, about_title, about_text, image, socials}) {
  lightboxData.value = {
    title,
    description,
    about_title,
    about_text,
    image,
    socials
  }
  emit('handleLightbox', true);

}

</script>

<template>
  <section id="speakers">
    <div class="container">
      <h2>{{ content['speakers']['title'] }}</h2>
      <div v-for="stage in content['speakers']['stages']" class="stage">

        <div class="main">
          <h3>{{ stage['main']['title'] }}</h3>
          <div class="list">
            <div v-for="item in stage['main']['list']" class="speaker_item">
<!--              <div v-for="item in stage['main']['list']" class="speaker_item" @click="showSpeaker(item)">-->
              <div class="image-box">
                <img :src="imagePath + item['image']" :alt="item['name']">
<!--                <Info @click="showSpeaker(item)"/>-->
              </div>
              <div class="content-box">
                <p class="title" v-html="item['title']" />
                <a class="link" :href="item['link']">
                  <span class="name" v-html="item['name']" />
                </a>
<!--                <span class="position" v-html="item['position']" />-->
              </div>
            </div>
          </div>
        </div>

        <div v-show="stage['sub']" class="sub">
          <h4>{{ stage['sub']['title'] }}</h4>
          <div class="list">
            <div v-for="item in stage['sub']['list']" class="speaker_item">
              <div class="image-box">
                <img :src="imagePath + item['image']" :alt="item['name']">
              </div>
              <div class="content-box">
                <a class="link" :href="item['link']">
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
      <p v-html="lightboxData.description"/>
      <div class="content">
        <div class="content-box">
          <p class="content-title" v-html="lightboxData.about_title" />
          <p v-html="lightboxData.about_text" />
        </div>
        <div class="image-box">
          <img class="avatar" :src="imagePath + lightboxData.image" :alt="lightboxData.title">
        </div>
      </div>

      <div>
        <a v-for="social in lightboxData.socials" :href="social['link']" class="social" target="_blank">
          <component :is="social['name']"></component>
        </a>
      </div>

    </div>
  </Lightbox>

</template>