<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <TextBox :required="false" class="mb-2" label="" v-model="searchQuery" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  
  const searchQuery = ref("")
</script>