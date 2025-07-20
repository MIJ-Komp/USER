<template>
  <div class="price-range">
    <div ref="slider" class="slider"></div>
    <div class="value-inputs mt-3">
      <input
        :value="formattedMin"
        @change="onMinInput"
        @input="onMinTyping"
        type="text"
      />
      -
      <input
        :value="formattedMax"
        @change="onMaxInput"
        @input="onMaxTyping"
        type="text"
      />
    </div>
  </div>
</template>

<script>
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export default {
  name: 'PriceRange',
  props: {
    modelValue: {
      type: Array,
      default: ()=>[0, 100000000]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100000000
    },
    step: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      priceRange: [...this.modelValue],
      formattedMin: '',
      formattedMax: ''
    }
  },
  watch: {
    modelValue(newVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(this.priceRange)) {
        this.priceRange = [...newVal]
        this.formattedMin = this.formatRupiah(newVal[0])
        this.formattedMax = this.formatRupiah(newVal[1])
        this.$refs.slider.noUiSlider.set(newVal)
      }
    }
  },
  mounted() {
    noUiSlider.create(this.$refs.slider, {
      start: this.modelValue,
      connect: true,
      step: this.step,
      range: {
        min: this.min,
        max: this.max
      },
      format: {
        to: value => parseInt(value),
        from: value => Number(value)
      }
    })

    this.$refs.slider.noUiSlider.on('update', (values) => {
      const min = parseInt(values[0])
      const max = parseInt(values[1])
      this.priceRange = [min, max]
      this.formattedMin = this.formatRupiah(min)
      this.formattedMax = this.formatRupiah(max)
      this.$emit('update:modelValue', [min, max])
    })
  },
  methods: {
    formatRupiah(angka) {
      return 'Rp ' + angka.toLocaleString('id-ID')
    },
    parseRupiah(rpString) {
      return parseInt(rpString.replace(/[^\d]/g, '')) || 0
    },
    onMinTyping(e) {
      this.formattedMin = e.target.value
    },
    onMaxTyping(e) {
      this.formattedMax = e.target.value
    },
    onMinInput(val) {
      const value = this.parseRupiah(this.formattedMin)
      this.priceRange[0] = value
      this.formattedMin = this.formatRupiah(value)
      this.$refs.slider.noUiSlider.set(this.priceRange)
      this.$emit('update:modelValue', [...this.priceRange])
    },
    onMaxInput() {
      const value = this.parseRupiah(this.formattedMax)
      const validMax = Math.max(Math.min(this.max, value), this.priceRange[0])
      this.priceRange[1] = validMax
      this.formattedMax = this.formatRupiah(validMax)
      this.$refs.slider.noUiSlider.set(this.priceRange)
      this.$emit('update:modelValue', [...this.priceRange])
    }
  }
}
</script>

<style>
.noUi-connect{
  background: var(--gold) !important;
}
.price-range {
  width: 100%;
  margin: 4px auto;
}
.slider {
  width: calc(100% - 32px);
  margin: 0 16px;
}
.noUi-horizontal{
  height: 8px;
}
.noUi-handle{
  height: 18px !important;
}
.noUi-handle:before, .noUi-handle:after{
  top: 1px;
}
.value-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
.value-inputs input {
  width: 48%;
  font-size: 14px;
  border: 1px solid #dedede;
  padding: 4px;
  font-weight: 500;
  border-radius: 8px;
}
</style>
