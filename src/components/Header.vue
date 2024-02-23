<script setup>
import Button from "@/components/Button.vue";
import {ref} from "vue";

const isOpen = ref(false);
</script>
<template>
  <header>
    <div class="container">
      <nav class="nav" :class="{'is-open': isOpen}">
        <a  v-for="menuItem in content['header']['menuItems']" :href="menuItem['url']" @click="isOpen = false"> {{ menuItem['title'] }} </a>
      </nav>

      <div class="wrap">

        <div class="wrapper-date">
          <div class="address" v-html="content['cover']['address']"></div>
          <div v-html="content['cover']['date']"></div>
        </div>

        <div id="burger" class="open-main-nav" :class="{'is-open': isOpen}" @click="isOpen = !isOpen">
          <span class="burger"></span>
        </div>

        <Button/>

      </div>

      <div id="burger" class="open-main-nav mobile" :class="{'is-open': isOpen}" @click="isOpen = !isOpen">
        <span class="burger"></span>
      </div>

      <Button class="mobile"/>


    </div>
  </header>
</template>