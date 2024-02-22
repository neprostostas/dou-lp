<script setup>
</script>

<template>
  <section id="partners">
    <div class="container">
      <div class="main-partner">
        <h2 v-html="content['partners']['main']['title']"></h2>
        <img :src="imagePath + content['partners']['main']['image']">
      </div>
      <h2 v-html="content['partners']['title']"></h2>
      <div class="partners-list">
        <div class="image" v-for="imageUrl in content['partners']['images']" >
          <img :src="imagePath + imageUrl">
        </div>
      </div>
      <div class="text">
        <span v-html="content['partners']['text']"></span>
        <a :href="'mailto:' + content['common']['email']" class="link">{{ content['common']['email'] }}</a>
      </div>
    </div>
  </section>

</template>