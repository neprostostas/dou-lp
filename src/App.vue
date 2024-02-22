<script setup>
import Header from "@/components/Header.vue";
import Cover from "@/components/Cover.vue";
import Info from "@/components/Info.vue";
import Speakers from "@/components/Speakers.vue";
import Tickets from "@/components/Tickets.vue";
import {ref} from "vue";
import Partners from "@/components/Partners.vue";
import Faq from "@/components/Faq.vue";
import Footer from "@/components/Footer.vue";
import Address from "@/components/Address.vue";
import GoBlock from "@/components/GoBlock.vue";

const showLightbox = ref(false)
function handleLightbox(show) {
  showLightbox.value = show

  if (show) {
    document.querySelector('body').classList.add('lightbox-open')
  } else {
    document.querySelector('body').classList.remove('lightbox-open')
  }
}

</script>

<template>
<div class="page">
  <Header/>
  <Cover/>
  <Info/>
  <GoBlock />
  <Speakers @handleLightbox="handleLightbox" :show-lightbox="showLightbox"/>
  <Tickets/>
  <Partners/>
  <Faq/>
<!-- <Address/>-->
  <Footer/>
</div>
</template>

