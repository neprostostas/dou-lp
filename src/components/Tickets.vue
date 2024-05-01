<script setup>
import TicketIcon from "@/components/icons/TicketIcon.vue";
import Button from "@/components/Button.vue";
import Check from "@/components/icons/Check.vue";
</script>

<template>
  <section id="tickets">
    <div class="container">
      <div class="main-content">
        <div>
          <div class="content">
            <h2 v-html="content['tickets']['title']" />
            <div class="subtitle" v-html="content['tickets']['subtitle']"/>
            <div v-html="content['tickets']['email_text']"/>
            <a class="link" :href="'mailto:' + content['common']['email']" target="_blank"  >{{ content['common']['email'] }}</a>
          </div>
          <TicketIcon/>
        </div>
        <div class="plans">
          <div v-for="date in content['tickets']['dates']" class="plans-wrapper">
            <p class="title" v-html="date['title']"></p>
            <div class="plans-info">
              <div v-for="(plan, index) in date['plans']" :class="'plan'+(index-1)" class="plan-box">


                <div class="top-block">
                  <span v-if="plan['type']"  class="type" v-html="plan['type']"></span>
                  <div v-if="plan['price'] && plan['type'] !== 'Упс, усі квитки розпродано'" class="price">
                    {{ plan['price' ]}}
<!--                    <span v-if="plan['subtitle']" class="subtitle" v-html="plan['subtitle']"></span>-->
                  </div>
                  <div class="block-topic" v-if="plan['type'] === 'Упс, усі квитки розпродано'">
                    <div v-if="plan['price']" class="price">
                      {{ plan['price' ]}}
                      <!--                    <span v-if="plan['subtitle']" class="subtitle" v-html="plan['subtitle']"></span>-->
                    </div>
                    <a href="https://dou.ua/forums/topic/48547/" target="_blank" class="btn btn-primary topic">До топіку</a>
                  </div>
                </div>


<!--                <div v-if="plan['text'] && plan['type'] === 'Regular'">-->
<!--                  <a :href="content['common']['button_url']" target="_blank" class="btn">{{ content['tickets']['button_text']}}</a>-->
<!--                  <span class="text" v-html="plan['text']" />-->
<!--                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="abilities">
        <div class="header">
          <div class="title" v-html="content['tickets']['abilities_title']"></div>
          <span class="hidden" v-for="planType in content['tickets']['dates'][0]['plans']"> {{ planType['type'] }} </span>
        </div>

        <div class="abilities-items">
          <div v-for="ability in content['tickets']['abilities']" class="abilities-item">
            <span v-html="ability['label']"></span>
            <span v-for="status in ability['plans']" class="icon">
              <Check v-if="status"/>
            </span>
          </div>
        </div>

        <div class="btn-row">
          <Button/>
        </div>

        <p class="info-tip" v-html="content['tickets']['info-tip']"></p>

      </div>
    </div>
  </section>
</template>