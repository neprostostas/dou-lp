<script setup>
const {href: propHref, self: propSelf} = defineProps({
  href: String,
  self: Boolean,
})

// Встановлення значень за замовчуванням
const href = propHref || 'https://concert.ua/uk/event/dou-day';
const self = propSelf !== undefined ? propSelf : true;
</script>

<template>
  <a :href="href" :target="self ? '_self' : '_blank'" class="btn btn-primary">{{ content['common']['button'] }}</a>
</template>
