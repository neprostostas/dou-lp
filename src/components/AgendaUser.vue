<script setup>
import {defineProps, ref} from 'vue';

const props = defineProps({
  speakerName: String,
  showSpeaker: Function
});

function stageClass(speakerName, stage) {
  // Перевіряємо наявність спікера в основному списку
  const hasSpeakerInMain = stage.main.list.some(item => item.name === speakerName);
  // Перевіряємо наявність спікера в додатковому списку, якщо він існує
  const hasSpeakerInSub = stage.sub && stage.sub.list.some(item => item.name === speakerName);

  // Повертаємо клас, якщо спікер відсутній у обох списках
  return {
    'stage-hidden': !(hasSpeakerInMain || hasSpeakerInSub)
  };
}

// Метод для визначення, чи має спікер порожній опис
function shouldUnhover(speakerName) {
  return (item) => {
    return item.name === speakerName && item.description === '';
  };
}

// Метод для визначення, чи слід застосувати клас 'stage-hidden' до картки
function shouldApplyStageHiddenClass(speakerName, item, stage) {
  // Перевіряємо, чи є спікер в основному списку
  const isSpeakerInMain = stage.main.list.some(speaker => speaker.name === speakerName);
  // Перевіряємо, чи є спікер в додатковому списку
  const isSpeakerInSub = stage.sub && stage.sub.list.some(speaker => speaker.name === speakerName);

  // Застосовуємо клас 'stage-hidden', якщо спікер присутній в будь-якому списку, але поточний елемент не є цим спікером
  return (isSpeakerInMain || isSpeakerInSub) && item.name !== speakerName;
}


</script>

<template>

  <div v-for="stage in content['speakers']['stages']" :class="stageClass(speakerName, stage)" class="stage">

    <div v-for="item in stage['main']['list']"
         :class="{
           'unhover': shouldUnhover(speakerName)(item),
           'stage-hidden': shouldApplyStageHiddenClass(speakerName, item, stage)
         }"
         class="card" @click="showSpeaker(item, stage)">
      <template v-if="item['name'] === speakerName">
        <img class="ava" :src="imagePath + item['image']" :alt="item['name']">
        <div class="right-part">
          <h3 class="name">{{ speakerName }}</h3>
          <h4 class="position" v-if="speakerName === 'Секретний спікер'" v-html="'***'"></h4>
          <h4 class="position" v-else v-html="item['position']"></h4>
        </div>
      </template>
    </div>

    <div v-for="item in stage['sub']['list']"
         :class="{
           'stage-hidden': shouldApplyStageHiddenClass(speakerName, item, stage)
         }"
         class="card unhover" @click="showSpeaker(item, stage)">
      <template v-if="item['name'] === speakerName">
        <img class="ava" :src="imagePath + item['image']" :alt="item['name']">
        <div class="right-part">
          <h3 class="name">{{ speakerName }}</h3>
          <h4 class="position" v-html="item['position']"></h4>
        </div>
      </template>
    </div>

  </div>
</template>

<style scoped>

.stage-hidden {
  display: none!important;
}

.ava {
  width: 78px;
  height: 78px;
  border-radius: 150px;
  border: 2px var(--white) solid;
  outline: var(--azure) solid 1px;
}

.name {
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0;
  text-transform: none;
  padding-bottom: 8px;
}

.position {
  color: #333;
  font-size: 13px;
  font-style: italic;
  margin-top: 0;
  text-align: left;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
  max-width: 180px;
  width: 100%;
}

.card {
  border: 1px transparent solid;
  width: 100%;
  max-width: 295px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.card:not(.unhover):hover {
  cursor: pointer;
  //border: 1px var(--azure) solid;
}

.unhover {
  border: 1px transparent solid;
  cursor: auto;
}

</style>