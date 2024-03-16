<script setup>
import Lightbox from "@/components/Lightbox.vue";
import {ref, computed, onMounted, onUnmounted} from "vue";
import AgendaUser from "@/components/AgendaUser.vue";

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

function showSpeaker({title, description, about_title, about_text, image, socials, speech}, stage) {
  lightboxData.value = {
    title,
    description,
    about_title,
    about_text,
    image,
    socials,
    speech
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
  <section id="agenda">
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
        <div class="stage-title">Main Stage</div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">9:45</div>
            <div class="divider-time">...</div>
            <div class="end-time">10:45</div>
          </div>
          <h3 class="subtitle">Панельна дискусія про AI</h3>
          <div></div>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <div></div>
              <div></div>
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
        <div class="title line">
          <p>Architecture</p>
          <p>Software</p>
          <p>Product</p>
        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">11:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">11:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <h3 class="subtitle pb-15">TBD</h3>
                <AgendaUser :speaker-name="'Віктор Турський'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Вирішуємо життєві негаразди за допомогою JavaScript, або Візуалізація даних для особистого розвитку</h3>
                <AgendaUser :speaker-name="'Володимир Агафонкін'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Як знайти і допомогти заморозити активи Кадирова, зробити MVP за $1M і дійти до 3K іноземних B2B-клієнтів</h3>
                <AgendaUser :speaker-name="'Михайло Горобцов'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">12:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">12:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Як за допомогою GenAI сформувати архітектурну візію за кілька годин</h3>
                <AgendaUser :speaker-name="'Дмитро Овчаренко'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Як мігрувати продукт з 200К користувачів з восьмирічного PHP-моноліта на новий стек. Успіхи і фейли</h3>
                <AgendaUser :speaker-name="'Тетяна Мельник'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Допомога ЗСУ as a Service, або Як побудувати підписку на донати у B2B</h3>
                <AgendaUser :speaker-name="'Андрій Мандрика'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>


        </div>

      </div>
      <hr class="grey-line mb-5">

      <div class="stage four">
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

      <div class="stage five">
        <div class="stage-title">Main Stage</div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">14:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">14:45</div>
          </div>
          <h3 class="subtitle">Панельна дискусія про про ринок праці</h3>
          <div></div>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <div></div>
              <div></div>
              <AgendaUser :speaker-name="'Макс Іщенко'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Роман Прокоф’єв'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'Секретний спікер'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Влада Зацаринна'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage six">
        <div class="title line">
          <p>Architecture</p>
          <p>Software</p>
          <p>Product</p>
        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">15:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">15:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <h3 class="subtitle pb-15">TBD</h3>
                <AgendaUser :speaker-name="'Секретний спікер'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Алгоритми на практиці або історії з продакшену</h3>
                <AgendaUser :speaker-name="'Іван Петрушенко'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Як зменшити кількість хибних рішень і зекономити гроші під час розробки продукту. Швидка валідація гіпотез</h3>
                <AgendaUser :speaker-name="'Любомир Півторак'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">16:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">16:45</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Зовсім не про пентести. Будуємо архітектуру безпеки в критично важливих системах</h3>
                <AgendaUser :speaker-name="'Анастасія Войтова'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">TBD</h3>
                <AgendaUser :speaker-name="'Олександра Ковальова'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">(Не) культурні комунікації: налагоджуємо співпрацю з іноземними колегами</h3>
                <AgendaUser :speaker-name="'Орест Дмитрасевич'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>


        </div>

      </div>
      <hr class="grey-line mb-5">

      <div class="stage seven">
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

      <div class="stage eight">
        <div class="stage-title">Main Stage</div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">17:40</div>
            <div class="divider-time">...</div>
            <div class="end-time">18:25</div>
          </div>
          <h3 class="subtitle">Панельна дискусія про про хз що (треба визначити)</h3>
          <div></div>

          <div class="cards-block">
            <div class="card-line">
              <h4 class="role pd-0">Спікери</h4>
              <div></div>
              <div></div>
              <AgendaUser :speaker-name="'Тарас Чмут'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'і ще двоє будуть згодом'" :showSpeaker="showSpeaker" />
              <AgendaUser :speaker-name="'і ще двоє будуть згодом'" :showSpeaker="showSpeaker" />
            </div>
            <div class="card-alone">
              <h4 class="role">Модератор</h4>
              <AgendaUser :speaker-name="'Юра Федоренко'" :showSpeaker="showSpeaker" />
            </div>
          </div>

        </div>
      </div>
      <hr class="grey-line">

      <div class="stage nine">
        <div class="title line">
          <p>Architecture</p>
          <p>Software</p>
          <p>Product</p>
        </div>
        <div class="info-container">
          <div class="time">
            <div class="start-time">18:30</div>
            <div class="divider-time">...</div>
            <div class="end-time">19:15</div>
          </div>
          <div class="cards-block">
            <div class="card-line">
              <div class="card-wrap">
                <h3 class="subtitle pb-15">TBD</h3>
                <AgendaUser :speaker-name="'Олександр Савченко'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Алгоритми на практиці або історії з продакшену</h3>
                <AgendaUser :speaker-name="'Олександр Хотемський'" :showSpeaker="showSpeaker" />
              </div>
              <div class="card-wrap">
                <h3 class="subtitle pb-15">Як зменшити кількість хибних рішень і зекономити гроші під час розробки продукту. Швидка валідація гіпотез</h3>
                <AgendaUser :speaker-name="'Наталія Ренська'" :showSpeaker="showSpeaker" />
                <div class="h10"></div>
                <AgendaUser :speaker-name="'Роман Астаф’єв'" :showSpeaker="showSpeaker" />
              </div>
            </div>
          </div>

        </div>

      </div>
      <hr class="grey-line mb-5">

      <div class="stage ten">
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

      <div class="stage eleven">
        <div class="info-container">
          <div class="time">
            <div class="start-time">20:30</div>
            <div class="divider-time">...</div>
            <div class="end-time">21:00</div>
          </div>
          <h3 class="subtitle">Прощальне слово, розіграш</h3>
        </div>
      </div>
      <hr class="grey-line mb-5">

      <div class="stage twelve">
        <div class="info-container">
          <div class="time">
            <div class="start-time">21:00</div>
            <div class="divider-time">...</div>
            <div class="end-time">22:00</div>
          </div>
          <h3 class="subtitle">Концерт</h3>
        </div>
      </div>
      <hr class="grey-line mb-5">

      <div class="stage thirteen">
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

    </div>
  </Lightbox>

</template>

<style scoped>

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
  padding-top: 10px;
  display: grid;
  align-items: start;
  grid-template-columns: 113px 1fr;
  gap: 30px 20px;
}

.time {
  padding-top: 10px;
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

.subtitle {
  padding-top: 10px;
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

.card-wrap .subtitle {
  padding-top: 0;
}

.grey-line {
  margin: 25px 0 35px;
  border: none;
  border-bottom: 1px solid #cccccc;
  height: 2px;
  width: 100%;
}

.stage-title {
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

  padding: 10px 0 10px 133px;
  border-bottom: 1px solid #daefee;
}

.title.line p {
  margin: 0;
}

.card-line {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card-wrap {
  border: 1px transparent solid;
  padding: 10px;
  height: fit-content;
}

.card-wrap:hover {
  border: 1px var(--azure) solid;
}

.role {
  padding: 30px 0 10px;
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-family: "IBM Plex Sans",sans-serif;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0;
  text-transform: none;
}

.pb-15 {
  padding-bottom: 15px;
  width: 100%;
  max-width: 270px;
}

.mb-5 {
  margin-bottom: 5px;
}

.pd-0 {
  padding: 0!important;
}

.h10 {
  height: 10px;
}

</style>