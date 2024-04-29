<script setup>
import Lightbox from "@/components/Lightbox.vue";
import {ref, computed, onMounted, onUnmounted} from "vue";
import AgendaUser from "@/components/AgendaUser.vue";

const agenda = ref(null);

const currentClass = ref('architecture'); // Зберігає поточний клас

// Метод для зміни класу елемента #agenda
function changeAgendaClass(className) {
  // Спочатку видаляємо всі можливі класи
  agenda.value.classList.remove('architecture', 'software', 'product');
  // Додаємо потрібний клас
  agenda.value.classList.add(className);
  currentClass.value = className; // Оновлюємо поточний клас

  agenda.value.dispatchEvent(new CustomEvent('classChange', { detail: { className } }));
}

// Використовуємо onMounted для ініціалізації посилання на елемент #agenda
onMounted(() => {
  agenda.value = document.getElementById('agenda');
});

const props = defineProps({
  showLightbox: Boolean,
})
const emit = defineEmits(['handleLightbox'])

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    emit('handleLightbox', false)
  }
}

onMounted(() => {
  window.addEventListener('keydown', onEscKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onEscKeyPress);
});

// const showLightbox = ref(false)
const lightboxData = ref({})

function showSpeaker({title, description, about_title, about_text, image, socials, speech, double, about_title2, description2, image2, socials2}, stage) {
  lightboxData.value = {
    title,
    description,
    about_title,
    about_text,
    image,
    socials,
    speech,
    double,

    about_title2,
    description2,
    image2,
    socials2
  }

  const isSecretGuest = about_title === 'Секретний спікер' ? true : false

  // don't open modal for "Main Stage" and "SecretGuest"
  stage['main']['title'] === "Main Stage" || isSecretGuest ? null : emit('handleLightbox', true)

}

function handleClick(link) {
  if (!link) {
    event.preventDefault();
  }
}

const processedDescription = computed(() => {
  if (!lightboxData.value.description) return [];
  return lightboxData.value.description.split('\n').filter(line => line.trim() !== '');
});

const processedDescription2 = computed(() => {
  if (!lightboxData.value.description2) return [];
  return lightboxData.value.description2.split('\n').filter(line => line.trim() !== '');
});

const processedSpeech = computed(() => {
  if (!lightboxData.value.speech) return [];
  return lightboxData.value.speech.split('\n').filter(line => line.trim() !== '').map(line => {
    // Якщо рядок починається з символу •, обгортаємо його у вказану структуру
    if (line.trim().startsWith('•')) {
      // Видаляємо символ • з початку рядка
      const textWithoutBullet = line.trim().substring(1).trim();
      return `<div class="wrap-point"><span class="bullet">•</span><p>${textWithoutBullet}</p></div>`;
    }
    // Якщо рядок не починається з •, просто повертаємо його як є
    return line;
  });
});

</script>

<template>
  <section id="agenda" class="architecture">
    <div class="container">
      <h2 class="main-title">{{ content['agenda']['title'] }}</h2>

      <div class="stage one">
        <div class="info-container">
          <div class="time">
            <div class="start-time">8:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">10:00</div>
          </div>
          <h3 class="subtitle">Реєстрація, велкам-кава</h3>
        </div>
      </div>
      <hr class="grey-line">

      <div class="stage two">
        <div class="stage-title sticky">Main Stage</div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">9:45</div>
            <div class="divider-time">...</div>
            <div class="end-time">10:45</div>
          </div>
          <h3 class="subtitle">Вітальне слово DOU та панельна дискусія про AI</h3>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <AgendaUser :speaker-name="'Олесь Петрів'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Олексій Молчановський'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Микола Максименко'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Андрій Бродецький'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage three">
        <div class="stage-title mini-stage sticky">
          <h3>Mini Stage</h3>
          <p>до 100 місць</p>
        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">11:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">12:00</div>
          </div>
          <h3 class="subtitle">AI Brunch</h3>

          <div class="cards-block">
            <div class="card-line grid-one">
              <div class="mini-stage-content">
                <p class="p-mini-stage">Невимушена зустріч з однодумцями, де будуть обговорювати останні новини у сфері ШІ та обмінюватися досвідом. Бранч проводить AI HOUSE, найбільше ШІ-ком’юніті в Україні, і Roosh Investment Group.</p>
                <p class="p-mini-stage-cursive">Участь за попередньою реєстрацією</p>
                <a class="green-button" href="https://2uwtsfg7pi6.typeform.com/to/ABVvGD70" target="_blank">Зареєструватись</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage four">
        <div class="title line sticky">
          <p :class="{active: currentClass === 'architecture'}" @click="changeAgendaClass('architecture')">Architecture</p>
          <p :class="{active: currentClass === 'software'}" @click="changeAgendaClass('software')">Software</p>
          <p :class="{active: currentClass === 'product'}" @click="changeAgendaClass('product')">Product</p>
        </div>
        <div class="info-container">
          <div class="time pt-12">
            <div class="start-time">11:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">11:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Віктор Турський'" :subtitle="'Підходи до розробки архітектури, які зменшують ризики провалу проєкту'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Володимир Агафонкін'" :subtitle="'Вирішуємо життєві негаразди за допомогою JavaScript, або Візуалізація даних для особистого розвитку'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Михайло Горобцов'" :subtitle="'Як знайти і допомогти заморозити активи Кадирова, зробити MVP за $1M і дійти до 3K іноземних B2B-клієнтів'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>
        <div class="info-container">
          <div class="time pt-12">
            <div class="start-time">12:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">12:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Дмитро Овчаренко'" :subtitle="'Як за допомогою GenAI сформувати архітектурну візію за кілька годин'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Тетяна Мельник'" :subtitle="'Як мігрувати продукт з 200К користувачів з восьмирічного PHP-моноліта на новий стек. Успіхи і фейли'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Андрій Мандрика'" :subtitle="'Допомога ЗСУ as a Service, або Як побудувати підписку на донати у B2B'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>


        </div>

      </div>
      <hr class="grey-line mb-5">

      <div class="stage five">

        <div class="pro-line">
          <div class="stage-title pro sticky">Pro Stage</div>
          <div class="box-ticket">
            Pro Tickets
          </div>
        </div>

        <div class="info-container">
          <div class="time">
            <div class="start-time">12:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">12:45</div>
          </div>
          <h3 class="subtitle">Про освіту, розвиток і утримання талантів в Україні</h3>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <AgendaUser :speaker-name="'Денис Гриньов'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Єгор Стадний'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Роман Апостол'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модераторка</h4>
              <AgendaUser :speaker-name="'Галина Титиш'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage six">
        <div class="info-container">
          <div class="time">
            <div class="start-time">13:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">14:00</div>
          </div>
          <h3 class="subtitle">Обід і нетворкінг, час на локації</h3>
        </div>
      </div>
      <hr class="grey-line">

      <div class="stage seven">
        <div class="stage-title sticky">Main Stage</div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">14:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">14:45</div>
          </div>
          <h3 class="subtitle">Панельна дискусія про ринок праці</h3>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <AgendaUser :speaker-name="'Макс Іщенко'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Роман Прокоф’єв'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Тарас Кицмей'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Влада Зацаринна'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage eight">
        <div class="stage-title mini-stage sticky">
          <h3>Mini Stage</h3>
          <p>до 100 місць</p>
        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">15:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">16:00</div>
          </div>
          <h3 class="subtitle">Панельна дискусія про ІТ на війні</h3>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <AgendaUser :speaker-name="'Катерина Черногоренко'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Олег Берестовий'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Іван Гоменюк'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Євген Ковалевський'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage nine">
        <div class="title line sticky">
          <p :class="{active: currentClass === 'architecture'}" @click="changeAgendaClass('architecture')">Architecture</p>
          <p :class="{active: currentClass === 'software'}" @click="changeAgendaClass('software')">Software</p>
          <p :class="{active: currentClass === 'product'}" @click="changeAgendaClass('product')">Product</p>
        </div>
        <div class="info-container">
          <div class="time pt-12">
            <div class="start-time">15:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">15:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Секретний спікер'" :subtitle="'TBD'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Іван Петрушенко'" :subtitle="'Алгоритми на практиці або історії з продакшену'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Любомир Півторак'" :subtitle="'Як зменшити кількість хибних рішень і зекономити гроші під час розробки продукту. Швидка валідація гіпотез'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>
        <div class="info-container">
          <div class="time pt-12">
            <div class="start-time">16:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">16:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Анастасія Войтова'" :subtitle="'Зовсім не про пентести. Будуємо архітектуру безпеки в критично важливих системах'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Олександра Ковальова'" :subtitle="'Скільки інженерів треба, щоб дістати кота з чорного ящика'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Орест Дмитрасевич'" :subtitle="'(Не) культурні комунікації: налагоджуємо співпрацю з іноземними колегами'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>

      </div>
      <hr class="grey-line">

      <div class="stage ten">

        <div class="pro-line">
          <div class="stage-title pro sticky">Pro Stage</div>
          <div class="box-ticket">
            Pro Tickets
          </div>
        </div>

        <div class="info-container">
          <div class="time">
            <div class="start-time">16:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">16:45</div>
          </div>
          <h3 class="subtitle">Про стан, розвиток і ризики продуктових ІТ-компаній в Україні</h3>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <AgendaUser :speaker-name="'Володимир Многолєтній'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Олександр Косован'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Спікера оголосимо згодом'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Ілля Кабачинський'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage eleven">
        <div class="info-container">
          <div class="time">
            <div class="start-time">16:45</div>
            <div class="divider-time">...</div>
            <div class="end-time">17:30</div>
          </div>
          <h3 class="subtitle">Кава-брейк і час на локації</h3>
        </div>
      </div>
      <hr class="grey-line">

      <div class="stage twelve">
        <div class="stage-title sticky">Main Stage</div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">17:40</div>
            <div class="divider-time">...</div>
            <div class="end-time">18:25</div>
          </div>
          <h3 class="subtitle">Розмова про життя</h3>

          <div class="cards-block">
            <div class="card-line">
              <AgendaUser :speaker-name="'Тарас Чмут'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <AgendaUser :speaker-name="'Юра Федоренко'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage thirteen">

        <div class="pro-line">
          <div class="stage-title pro sticky">Pro Stage</div>
          <div class="box-ticket">
            Pro Tickets
          </div>
        </div>

        <div class="info-container">
          <div class="time">
            <div class="start-time">18:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">18:45</div>
          </div>
          <h3 class="subtitle">Про стан, розвиток і ризики сервісних ІТ-компаній в Україні</h3>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <AgendaUser :speaker-name="'Віталій Седлер'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Олена Самборська'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Андрій Оксенюк'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Денис Довгополий'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage fourteen">
        <div class="title line sticky">
          <p :class="{active: currentClass === 'architecture'}" @click="changeAgendaClass('architecture')">Architecture</p>
          <p :class="{active: currentClass === 'software'}" @click="changeAgendaClass('software')">Software</p>
          <p :class="{active: currentClass === 'product'}" @click="changeAgendaClass('product')">Product</p>
        </div>
        <div class="info-container">
          <div class="time pt-12">
            <div class="start-time">18:30</div>
            <div class="divider-time">...</div>
            <div class="end-time">19:15</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Олександр Савченко'" :subtitle="'Архітектурні фітнес-функції. Як переконатися, що ваша архітектура оптимальна'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Олександр Хотемський'" :subtitle="'TMS більше не потрібні? Поєднуємо Manual і Automation-тестування'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <AgendaUser mobile :speaker-name="'Наталія Ренська'" :subtitle="'Нарциси та психопати в організаціях. Як це впливає на розробку продуктів і втілення інноваційних рішень'" :showSpeaker="showSpeaker" />
                <div class="h10"></div>
                <AgendaUser mobile :speaker-name="'Роман Астаф’єв'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>

      </div>
      <hr class="grey-line mb-5">

      <div class="stage fifteen">
        <div class="info-container">
          <div class="time">
            <div class="start-time">19:15</div>
            <div class="divider-time">...</div>
            <div class="end-time">20:30</div>
          </div>
          <h3 class="subtitle">Нетворк, снеки та напої</h3>
        </div>
      </div>
      <hr class="grey-line mb-5">

      <div class="stage sixteen">
        <div class="info-container">
          <div class="time">
            <div class="start-time">20:30</div>
            <div class="divider-time">...</div>
            <div class="end-time">21:00</div>
          </div>
          <h3 class="subtitle">Закриття конференції, розіграш</h3>
        </div>
      </div>
      <hr class="grey-line mb-5">

      <div class="stage seventeen">
        <div class="info-container">
          <div class="time">
            <div class="start-time">21:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">22:00</div>
          </div>
          <h3 class="subtitle">Концерт гурту ТНМК</h3>
        </div>
      </div>
      <hr class="grey-line mb-5">

      <div class="stage eighteen">
        <div class="info-container">
          <div class="time">
            <div class="start-time">22:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">23:00</div>
          </div>
          <h3 class="subtitle">Закриття і нетворк</h3>
        </div>
      </div>

    </div>
  </section>

  <Lightbox :show="showLightbox" @close="emit('handleLightbox', false)">
    <div class="about-speaker">
      <div class="title" v-html="lightboxData.title" />
      <div class="speech" v-for="(line, index) in processedSpeech" :key="index" v-html="line"></div>
      <div class="content">
        <div class="content-box">
          <p class="content-title" v-html="lightboxData.about_title" />
          <p class="about-text" v-for="(line, index) in processedDescription" :key="index" v-html="line"></p>
        </div>
        <div class="image-box">
          <img class="avatar" :src="imagePath + lightboxData.image" :alt="lightboxData.title">
        </div>
      </div>
      <div>
        <template  v-for="social in lightboxData.socials">
          <a v-if="social['link']"
             :href="social['link']"
             @click="handleClick(social['link'])"
             class="social"
             target="_blank">
            <component v-if="social['link']" :is="social['name']"></component>
          </a>
        </template>
      </div>

      <div v-if="lightboxData.double" class="about-speaker double">
        <div class="content">
          <div class="content-box">
            <p class="content-title" v-html="lightboxData.about_title2" />
            <p class="about-text" v-for="(line, index) in processedDescription2" :key="index" v-html="line"></p>
          </div>
          <div class="image-box">
            <img class="avatar" :src="imagePath + lightboxData.image2" :alt="lightboxData.about_title2">
          </div>
        </div>
        <div>
          <template  v-for="social in lightboxData.socials2">
            <a v-if="social['link']"
               :href="social['link']"
               @click="handleClick(social['link'])"
               class="social"
               target="_blank">
              <component v-if="social['link']" :is="social['name']"></component>
            </a>
          </template>
        </div>
      </div>
    </div>

  </Lightbox>

</template>

<style scoped>

hr {
  margin-block-start: unset;
  margin-block-end: unset;
}

.main-title {
  color: #333;
  font-size: 60px;
  font-style: normal;
  margin-top: 0;
  text-align: left;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 700;
  line-height: 72px;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
  padding-bottom: 60px;
}

.info-container {
  padding: 15px 0 25px;
  display: grid;
  align-items: start;
  grid-template-columns: 113px 1fr;
  gap: 30px 20px;
}

.time {
  padding-top: 1px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 5px;
  color: #9842a4;
  font-size: 16px;
  font-style: normal;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  text-transform: none;
  margin-bottom: 0;
}

.divider-time {
  opacity: .3;
}

.grey-line {
  position: relative;
  top: -1px;
  margin-bottom: 35px;
  border: none;
  border-bottom: 1px solid #cccccc;
  width: 100%;
}

.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 85px;
  z-index: 3;
}

.stage-title {
  background: #fff;
  color: #333;
  font-size: 30px;
  font-style: normal;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0;
  text-transform: none;

  border: none;
  border-bottom: 1px solid #daefee;
  padding: 10px 0 10px 133px;
}

.title.line {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  background: #ffffff;
  padding: 10px 0 10px 133px;
  border-bottom: 1px solid #daefee;
}

.title.line p {
  margin: 0;
  color: #333;
  font-size: 30px;
  font-style: normal;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0;
  text-transform: none;
}

.pro {
  color: #cea045;
}

.card-line {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.pro-line {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid #daefee;
}

.pro-line .stage-title {
  border-bottom: none;
}

.box-ticket {
  max-width: 145px;
  width: 100%;
  text-align: center;
  color: #CFA046;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  padding: 8px 24px;
  border: 1px solid #CFA046;
}

.subtitle {
  color: #333;
  font-size: 20px;
  font-style: normal;
  margin-top: 0;
  text-align: left;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 0;
  letter-spacing: 0;
  text-transform: none;
}

.cards-block {
  grid-column-start: 2;
}

.role {
  display: grid;
  grid-column-start: 1;
  grid-column-end: 4;

  padding: 15px 0 0;
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0;
  text-transform: none;
}

.mb-5 {
  margin-bottom: 5px;
}

.pd-0 {
  padding: 0!important;
  margin-bottom: -20px;
}

.pt-12 {
  padding-top: 12px;
}

.h10 {
  height: 10px;
}

.grid-one {
  grid-template-columns: auto;
}

.p-mini-stage {
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  max-width: 650px;
  width: 100%;
  margin: 0;
}

.p-mini-stage-cursive {
  color: #333;
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
  line-height: 120%;
  margin: 0;
  padding: 10px 0;
}

.green-button {
  cursor: pointer;
  display: inline-flex;
  padding: 13px 20px 15px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background: #2DB653;
  color: #FFF;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
}

.mini-stage h3 {
  color: #2DB653;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
}

.mini-stage p {
  padding: 10px 0;
  margin: 0;
  color: #2DB653;
  font-size: 16px;
  font-style: italic;
  font-weight: 500;
  line-height: 140%;
}

.stage-title.mini-stage::after {
  border-bottom: 2px solid #2DB653;
}








@media (max-width: 825px) {

  .main-title {
    padding-bottom: 30px;
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
  }

  .time {
    justify-content: start;
  }

  .info-container {
    grid-template-columns: auto;
    gap: 20px;
  }

  .cards-block {
    grid-column-start: 1;
  }

  .card-line {
    display: block;
  }

  .pd-0 {
    margin-bottom: 10px;
  }

  .stage-title {
    padding: 10px 0;
    text-align: center;
    color: #47aeb0;
    font-size: 20px;
    font-style: normal;
    font-family: "IBM Plex Sans",sans-serif;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0;
    border-bottom: none;
  }

  .stage-title::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-bottom: 4px solid #47aeb0;
    width: 100%;
    max-width: 92px;
  }

  .title.line {
    padding: 10px 0;
    grid-template-columns: repeat(3, auto);
    justify-items: center;
    justify-content: center;
    border-bottom: none;
  }

  .title.line p {
    cursor: pointer;
    font-size: 20px;
    font-style: normal;
    font-family: "IBM Plex Sans",sans-serif;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0;
    border-bottom: none;
    position: relative;
  }

  .title.line p.active {
    color: #47aeb0;
  }

  .title.line p.active::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%,-50%);
    border-bottom: 4px solid #47aeb0;
    width: 92%;
    max-width: 92px;
  }

  .card-wrap, .card-wrap:hover {
    border: unset;
  }

  .role {
    padding: 15px 0 10px;
  }

}

</style>