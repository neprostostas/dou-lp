<script setup>
</script>

<template>
  <section id="address">
    <div class="container">
      <h2 v-html="content['address']['title']"></h2>
      <div class="items">
        <div v-for="item in content['address']['items']">
          <div class="image">
            <a v-if="item['image'].includes('map')" :href="content['address']['coordinates']" target="_blank">
              <img :src="imagePath + item['image']">
            </a>
            <img v-else :src="imagePath + item['image']">
          </div>
          <div class="info">
            <div v-for="info in item['info']">
              <p v-html="info['title']"></p>
              <div v-html="info['text']"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>