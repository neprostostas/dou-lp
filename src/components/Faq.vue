<script setup>
import AccordionItem from "@/components/AccordionItem.vue";
</script>

<template>
  <section id="faq">
    <div class="container">
      <h2 v-html="content['faq']['title']"></h2>
      <div>
        <AccordionItem v-for="(item, key) in content['faq']['list']" :key="key" :header="item['q']">
          <div v-html="item['a']"></div>
        </AccordionItem>
      </div>
    </div>
  </section>

</template>