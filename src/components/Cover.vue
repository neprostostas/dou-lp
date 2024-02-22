<script setup>
import Logo from "@/components/icons/Logo.vue";
import Button from "@/components/Button.vue";
</script>

<template>
  <section id="cover">
    <div class="container">
      <div class="info">
<!--        <Logo/>-->
        <div class="address" v-html="content['cover']['address']"></div>
        <div v-html="content['cover']['date']"></div>
      </div>

      <h1 v-html="content['cover']['title']" />

<!--      <div class="mobile-address" v-html="content['cover']['address']"></div>-->

      <div class="btn-row">
        <Button/>
      </div>
    </div>
  </section>

</template>