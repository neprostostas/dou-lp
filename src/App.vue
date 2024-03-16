<script setup>
import TopBanner from "@/components/TopBanner.vue";
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
import Agenda from "@/components/Agenda.vue";
import GoBlock from "@/components/GoBlock.vue";

const showLightboxSpeakers = ref(false);
const showLightboxAgenda = ref(false);

function handleLightboxSpeakers(show) {
  showLightboxSpeakers.value = show;
  toggleBodyClass(show);
}

function handleLightboxAgenda(show) {
  showLightboxAgenda.value = show;
  toggleBodyClass(show);
}

function toggleBodyClass(show) {
  if (show) {
    document.querySelector('body').classList.add('lightbox-open');
  } else {
    document.querySelector('body').classList.remove('lightbox-open');
  }
}

</script>

<template>
<div class="page">
  <TopBanner />
  <Header/>
  <Cover/>
  <Info/>
  <GoBlock />
  <Agenda @handleLightbox="handleLightboxAgenda" :show-lightbox="showLightboxAgenda"/>
  <Speakers @handleLightbox="handleLightboxSpeakers" :show-lightbox="showLightboxSpeakers"/>
  <Tickets/>
  <Partners/>
  <Faq/>
<!-- <Address/>-->
  <Footer/>
</div>
</template>