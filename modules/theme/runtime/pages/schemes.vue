<script lang="ts" setup>
import SchemeForm from '~/modules/theme/runtime/components/SchemeForm.vue';
import SchemeContent from '~/modules/theme/runtime/components/SchemeContent.vue';
</script>

<template>
  <div class="max-w-4xl mx-auto p-2 grid grid-cols-2 w-full md:grid-cols-[auto,1fr] gap-4">
    <div class="flex flex-col">
      <SchemeForm />
    </div>
    <div class="flex flex-col">
      <SchemeContent />
    </div>
  </div>
</template>
