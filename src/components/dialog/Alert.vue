<template>
  <Dialog class="dialog" v-model:visible="visible" modal :header="title" :style="{ width: '50vw' }" 
  :closable="false" :breakpoints="{ '1199px': '60vw', '575px': '90vw' }">
      <div ref="label" class="mb-3">
      </div>
      <div class="actionButton mt-5">
          <Button label="Ok" id="yes" @click="handleYes"/>
          <Button v-if="sendWA" :label="sendWALabel" id="sendWA" @click="handleSendWA"/>
      </div>
  </Dialog>
</template>
<script>
import Dialog from 'primevue/dialog';
export default{
components: {
  Dialog
},
data () {
  return {
      visible: false,
      title: null,
      resolve: null,
      sendWA: false,
      sendWALabel: "",
      numberWA: "",
      messageWA: ""
  }
},
methods: {
  confirm(data){
    return new Promise((resolve) => {
        this.visible = true;
        this.title = data.title;
        this.resolve = resolve; // Store the resolve function
        setTimeout(() => {
          this.$refs.label.innerHTML += data.message;
        }, 100);
      });
  },
  confirmSendWA(data){
    return new Promise((resolve) => {
        this.visible = true;
        this.title = data.title;
        this.sendWA = true;
        this.sendWALabel = data.buttonLabel;
        this.numberWA = data.number;
        this.messageWA = data.messageWA;
        this.resolve = resolve; // Store the resolve function
        setTimeout(() => {
          this.$refs.label.innerHTML += data.message;
        }, 100);
      });
  },
  handleNo() {
    this.visible = false;
    if (this.resolve) this.resolve(false); // Resolve with false for "Tidak"
  },
  handleYes() {
    this.visible = false;
    if (this.resolve) this.resolve(true); // Resolve with true for "Ya"
  },
  handleSendWA() {
    this.visible = false;
    this.sendWA = false;

    const message = encodeURIComponent(this.messageWA);
    const url = `https://wa.me/${this.numberWA}?text=${message}`;
    window.open(url, "_blank");

    this.sendWALabel = "";
    this.numberWA = "";
    this.messageWA = "";

    if (this.resolve) this.resolve(true);
  }
},
props: {
},
}
</script >
<style lang="scss" scoped>
.p-dialog-header-actions{
  display: none !important;
}
.dialog .actionButton{
  display: flex;
  justify-content: end;
}
.dialog .actionButton .mij-button{
  width: 150px !important;
  margin-left: 20px;
}
</style>
