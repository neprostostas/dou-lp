<script setup>

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

</script>

<template>
  <div v-if="props.show" class="lightbox" @click="emit('close', false)">
    <div class="lightbox-body" @click.stop="">
      <div class="lightbox-content">
        <slot></slot>
        <div class="close" @click="emit('close', false)">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M29.5633 28.1989L17.4535 16.0889L29.5633 3.97914M31 26.7622L20.3267 16.0889L31 5.41563M3.80109 2.43671L15.9111 14.5465L28.0209 2.43671M5.2378 1L15.9111 11.6733L26.5844 1M2.43671 3.80109L14.5465 15.9111L2.43671 28.0209M1 5.2378L11.6733 15.9111L1 26.5844M28.1989 29.5633L16.0889 17.4535L3.97914 29.5633M26.7622 31L16.0889 20.3267L5.41563 31" stroke="#EE2F29" stroke-miterlimit="10"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>