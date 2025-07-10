<script setup lang="ts">
import TextBox from '../components/input/TextBox.vue';

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <TextBox :required="false" class="mb-2" label="Nama Lengkap" v-model="customerInfo.name" />
      </div>
    </div>
  </div>
</template>