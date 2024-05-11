<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';

const props = defineProps({
  speakerName: String,
  subtitle: String,
  showSpeaker: Function,
  mobile: Boolean // передаємо цей аргумент тільки для розділів з title.line 'Architecture Software Product', щоб увімкнути фільтрацію при натисканні на розділи
});

const screenWidth = ref(window.innerWidth);
const agendaClass = ref('');

// Функція слухача для події classChange
function onClassChange(e) {
  agendaClass.value = e.detail.className;
}

// Оновлюємо ширину екрану та клас agenda при зміні розміру вікна
function updateScreenWidth() {
  screenWidth.value = window.innerWidth;
  agendaClass.value = document.getElementById('agenda')?.className || '';
}

// Встановлюємо і видаляємо слухачів зміни розміру вікна
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
  updateScreenWidth(); // Початкове оновлення
  const agendaElement = document.getElementById('agenda');
  agendaElement.addEventListener('classChange', onClassChange);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
  const agendaElement = document.getElementById('agenda');
  agendaElement.removeEventListener('classChange', onClassChange);
});

// Обчислюємо потрібний заголовок на основі класу agenda
const stageTitle = computed(() => {
  if (!props.mobile) { // Перевірка стану пропсу mobile
    return null; // Якщо mobile не true, повертаємо null, щоб уникнути застосування логіки фільтрації
  }
  return screenWidth.value <= 825 ? {
    'architecture': 'Architecture Stage',
    'software': 'Software Development Stage',
    'product': 'Product Stage',
  }[agendaClass.value] : '';
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

    <!-- for mobile -->
    <template v-if="!mobile || stage['main']['title'] === stageTitle">
      <a v-for="item in stage['main']['list']"
           :class="{
           'stage-hidden': shouldApplyStageHiddenClass(speakerName, item, stage),
           'gold': stage['main']['title'] === 'Main Stage'
         }"
           :href="stage['main']['title'] !== 'Main Stage' ? 'javascript:void(0);' : (item['link'] === '' ? 'javascript:void(0);' : item['link'])"
         :target="item['link'] === '' || stage['main']['title'] !== 'Main Stage' ? '_self' : '_blank'"
           class="card" @click="showSpeaker(item, stage)">
        <template v-if="item['name'] === speakerName">
          <template v-if="subtitle">
            <h3 class="subtitle">{{subtitle}}</h3>
          </template>
          <div class="card-inner">
            <img class="ava" :src="imagePath + item['image']" :alt="item['name']">
            <div class="right-part">
              <h3 class="name">{{ speakerName }}</h3>
              <h4 class="position" v-if="speakerName === 'Секретний спікер'" v-html="'***'"></h4>
              <h4 class="position" v-else v-html="item['position']"></h4>
            </div>
          </div>
        </template>
      </a>
    </template>

    <!-- for desktops -->
    <template v-else-if="screenWidth > 825">
      <a v-for="item in stage['main']['list']"
           :class="{
           'stage-hidden': shouldApplyStageHiddenClass(speakerName, item, stage),
           'gold': stage['main']['title'] === 'Main Stage'
         }"
           :href="stage['main']['title'] !== 'Main Stage' ? 'javascript:void(0);' : (item['link'] === '' ? 'javascript:void(0);' : item['link'])"
         :target="item['link'] === '' || stage['main']['title'] !== 'Main Stage' ? '_self' : '_blank'"
           class="card" @click="showSpeaker(item, stage)">
        <template v-if="item['name'] === speakerName">
          <template v-if="subtitle">
            <h3 class="subtitle">{{subtitle}}</h3>
          </template>
          <div class="card-inner">
            <img class="ava" :src="imagePath + item['image']" :alt="item['name']">
            <div class="right-part">
              <h3 class="name">{{ speakerName }}</h3>
              <h4 class="position" v-if="speakerName === 'Секретний спікер'" v-html="'***'"></h4>
              <h4 class="position" v-else v-html="item['position']"></h4>
            </div>
          </div>
        </template>
      </a>
    </template>

    <a v-for="item in stage['sub']['list']"
         :class="{
           'stage-hidden': shouldApplyStageHiddenClass(speakerName, item, stage)
         }"
         :href="stage['main']['title'] !== 'Main Stage' ? 'javascript:void(0);' : (item['link'] === '' ? 'javascript:void(0);' : item['link'])"
         :target="item['link'] === '' || stage['main']['title'] !== 'Main Stage' ? '_self' : '_blank'"
         class="card-sub" @click="showSpeaker(item, stage)">
      <template v-if="item['name'] === speakerName">
        <img class="ava gold" :src="imagePath + item['image']" :alt="item['name']">
        <div class="right-part">
          <h3 class="name">{{ speakerName }}</h3>
          <h4 class="position" v-html="item['position']"></h4>
        </div>
      </template>
    </a>

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

.ava.gold {
  outline: #FFE03A solid 1px!important;
}

.gold.card .ava {
  outline: #FFE03A solid 1px!important;
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

.card:not(.gold) .card-inner .position {
  color: #333;
  font-size: 16px;
  font-style: italic;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0;
  text-transform: none;
}

.subtitle {
  max-width: 280px;
  width: 100%;
  padding-bottom: 10px;
  color: #333;
  font-size: 20px;
  font-style: normal;
  margin-top: 0;
  text-align: left;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
}

.card {
  display: grid;
  justify-content: start;
  width: 100%;
  padding: 10px;
}

.card-inner {
  border: 1px transparent solid;
  width: 100%;
  max-width: 295px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.card-sub {
  cursor: pointer;
  border: 1px transparent solid;
  width: 100%;
  max-width: 295px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 10px;
}

.card:not(.unhover):hover {
  cursor: pointer;
}

.card {
  border: 1px transparent solid;
  height: fit-content;
}

.card:hover {
  border: 1px var(--azure) solid;
}

.card-sub:hover, .card.gold:hover {
  border: 1px #FFE03A solid;
}

@media (max-width: 825px) {

  .card:hover {
    border: 1px transparent solid;
  }

  .card-sub:hover, .card.gold:hover {
    border: 1px transparent solid;
  }

  .card {
    padding: 0;
  }

  .ava {
    width: 64px;
    height: 64px;
  }

  .card-line .card {
    margin-bottom: 20px;
  }

  .position, .subtitle {
    max-width: unset;
  }

  .card-sub {
    padding: 0;
  }

}

</style>