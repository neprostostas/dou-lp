<script setup>
import Lightbox from "@/components/Lightbox.vue";
import {ref, watch, watchEffect} from "vue";

const props = defineProps({
  showLightbox: Boolean,
})
const emit = defineEmits(['handleLightbox'])

// const showLightbox = ref(false)
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

</script>

<template>
  <section id="speakers">
    <div class="container">
      <h2>{{ content['speakers']['title'] }}</h2>
      <div v-for="stage in content['speakers']['stages']" class="stage">

        <div class="main">
          <h3>{{ stage['main']['title'] }}</h3>
          <div class="list">
            <div v-for="item in stage['main']['list']" class="speaker_item" @click="showSpeaker(item, stage)">
              <div class="image-box">
                <img :src="imagePath + item['image']" :alt="item['name']">
                <!--<Info @click="showSpeaker(item)"/>-->
              </div>
              <div class="content-box">

           <!-- TODO: HARDCODE - uncomment when title will appear -->
                <p v-if="false" class="title" v-html="item['title']" />
           <!-- <p class="title" v-html="item['title']" />-->

                <span v-if="stage['main']['title'] !== 'Main Stage'" class="name" v-html="item['name']" />

                <a v-else-if="stage['main']['title'] === 'Main Stage'"  class="link" :href="item['link']" v-if="item['name'] !== 'Секретний спікер'">
                  <span class="name" v-html="item['name']" />
                </a>

                <span v-else class="name" v-html="item['name']" />
                <span class="position" v-html="item['position']" />
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
        <a v-for="social in lightboxData.socials" :href="social['link'] || 'javascript:void(0);'" @click="handleClick(social['link'])" class="social" target="_blank">
          <component :is="social['name']"></component>
        </a>

      </div>

    </div>
  </Lightbox>

</template>