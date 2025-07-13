<template>
   <button
      :class="buttonType"
      :disabled="disabled"
      class="mij-button w-100 d-flex"
      :style="disabled ? 'cursor: default': ''"
   >
      <i class="iconButton" ref="iconFa" :class="iconFa" v-if="iconFa" 
      :style="label ? 'margin-right: 7px;' : ''"/>
      <img class="iconButton" v-else-if="iconImg" :src="iconImg" />
      <div
         class="font-button"
         :style="fontSize ? `font-size: ${fontSize}px !important` : ''"
         style="display: flex; align-items: center;"
      >
         {{ label }}
         <b-spinner style="width: 20px; height: 20px; margin-left: 10px;" v-if="isLoading"/>
      </div>
   </button>
</template>
<script>
export default {
   props: {
      isLoading: {type: Boolean, default: false},
      buttonType: {
         type: String,
         default: "primary",
      },
      fontSize: {
         default: null,
      },
      iconImg: {
         default: null,
      },
      iconFa: {
         default: null,
      },
      label: {
         type: String,
         default: "",
      },
      disabled: {
         type: Boolean,
         default: false,
      },
   },
   data() {
      return {};
   },
   setup() {},
};
</script>
<style scoped>
.mij-button {
   justify-content: center;
   border-radius: 8px;
   align-items: center;
   padding: 12px;
   cursor: pointer;
   font-weight: 600;
}
/* .mij-button:hover{
  transform: scale(1.05);
} */

.mij-button.primary {
   background: var(--gold);
   color: black;
   border: 0;
}
.mij-button.primary:hover {
   background: var(--yellow-400);
}
.mij-button.secondary {
   background: var(--grey-50);
   color: black;
   border: 2px solid var(--gold);
}
.mij-button.secondary:hover {
   background: var(--yellow-400);
   color: black;
   border: 2px solid var(--yellow-400);
}
.mij-button.danger {
   background: var(--grey-50);
   color: var(--red-500);
   border: 2px solid var(--red-500);
}
.mij-button.danger:hover {
   background: var(--red-600);
   color: black;
   border: 2px solid var(--red-600);
}
.mij-button.text {
   background-color: transparent;
   color: var(--blue-500);
   border: 2px solid transparent;
   padding: 0;
}
.mij-button.text:hover {
   background-color: transparent;
   color: var(--blue-600);
   border: 1px solid transparent;
}
/* .mij-button i,
.mij-button img {
   margin-right: 7px;
} */

.mij-button:disabled {
   background: var(--grey-700) !important;
   color: var(--grey-50) !important ;
   border: 1px solid var(--grey-700) !important;
}

@media screen and (max-width: 800px) {
   .mij-button {
      padding: 14px;
   }
}
@media screen and (max-width: 600px) {
   .mij-button {
      padding: 10px;
   }
}
</style>
