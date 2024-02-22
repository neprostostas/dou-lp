<script setup>
import Button from "@/components/Button.vue";
import BugHunt from "@/components/icons/BugHunt.vue";
</script>

<template>
  <section id="info">
    <div class="container">
      <div class="members">
        <div v-for="member in content['info']['members']">
          <span class="number">{{ member['number'] }}</span>
          <span class="title">{{ member['title'] }}</span>
        </div>
      </div>

      
      <div class="activities">
        <BugHunt/>
        <div class="list">
          <div>
            <span v-for="activity in content['info']['activities1']" class="btn btn-info" v-html="activity" />
          </div>
          <div>
            <span v-for="activity in content['info']['activities2']" class="btn btn-info" v-html="activity" />
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="81" viewBox="0 0 8 81" fill="none" class="arrow">
          <path d="M3.64645 80.3536C3.84171 80.5488 4.15829 80.5488 4.35355 80.3536L7.53553 77.1716C7.7308 76.9763 7.7308 76.6597 7.53553 76.4645C7.34027 76.2692 7.02369 76.2692 6.82843 76.4645L4 79.2929L1.17157 76.4645C0.976311 76.2692 0.659728 76.2692 0.464466 76.4645C0.269204 76.6597 0.269204 76.9763 0.464466 77.1716L3.64645 80.3536ZM3.5 0L3.5 80H4.5L4.5 0L3.5 0Z" fill="#47AEB0"/>
        </svg>
      </div>

      <div class="btn-row">
        <Button/>
        <span>{{ content['info']['button_info'] }}</span>
      </div>
    </div>
  </section>

</template>