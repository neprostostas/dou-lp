<script setup>
import { ref, onMounted } from 'vue';

// Створюємо реактивну змінну для контролю відображення банера
const isBannerVisible = ref(false);

// Функція для перевірки, чи поточна дата входить у заданий діапазон
function checkDateInRange(startDateText, endDateText) {
  const today = new Date();
  const year = today.getFullYear();

  // Перетворюємо вхідні рядки у дати
  const [startDay, startMonthText] = startDateText.split(' ');
  const [endDay, endMonthText] = endDateText.split(' ');

  const months = {
    'січня': 0, 'лютого': 1, 'березня': 2, 'квітня': 3, 'травня': 4, 'червня': 5, 'липня': 6, 'серпня': 7, 'вересня': 8, 'жовтня': 9, 'листопада': 10, 'грудня': 11
  }

  const start = new Date(year, months[startMonthText], parseInt(startDay));
  const end = new Date(year, months[endMonthText], parseInt(endDay));

  // Встановлюємо час кінця дня для кінцевої дати
  end.setHours(23, 59, 59, 999);

  // Перевіряємо, чи поточна дата підпадає під діапазон
  return today >= start && today <= end;
}

onMounted(() => {
  // Перевіряємо, чи поточна дата підпадає під діапазон з "22 березня" по "25 березня"
  isBannerVisible.value = checkDateInRange("22 березня", "25 березня"); // дата завершення ВКЛЮЧНО
});
</script>

<template>
  <section id="top-banner" v-show="isBannerVisible">
    <div class="container pad-0">
      <div class="announcement">
        <p class="text" v-html="content['topbanner']['announcement']"></p>
      </div>
    </div>
  </section>
</template>
