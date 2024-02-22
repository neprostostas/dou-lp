<script setup>
import Logo from "@/components/icons/Logo.vue";
</script>
<template>
  <footer>
    <div class="container">
      <Logo/>
      <div v-html="content['footer']['text']"></div>
      <div>
        <a v-for="social in content['footer']['socials']" :href="social['url']" class="social" target="_blank">
          <component :is="social['name']"></component>
        </a>
      </div>
    </div>
  </footer>
</template>