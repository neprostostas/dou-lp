<script setup>
</script>

<template>
  <section id="partners">
    <div class="container">
<!--      <div class="main-partner">-->
<!--        <h2 v-html="content['partners']['main']['title']"></h2>-->
<!--        <img :src="imagePath + content['partners']['main']['image']">-->
<!--      </div>-->
      <h2 v-html="content['partners']['title']"></h2>
      <div class="partners-list">
        <div class="image" v-for="partner in content['partners']['images']" >
          <a :href="partner.url" target="_blank"> <!-- Bind the href to partner.url -->
            <img :src="imagePath + partner.name" :alt="partner.alt">
          </a>
        </div>
      </div>

      <div class="text">
        <span v-html="content['partners']['text']"></span>
        <a :href="'mailto:' + content['common']['email']" class="link">{{ content['common']['email'] }}</a>
      </div>
    </div>
  </section>

</template>