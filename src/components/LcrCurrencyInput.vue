<template>
  <q-input ref="inputRef" outlined stack-label :model-value="formattedValue" />
</template>

<script>
import { watch } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'LcrCurrencyInput',
  props: {
    modelValue: Number,
    options: {
      type: Object,
      default () {
        return {
          locale: 'pt-BR',
          currency: 'BRL',
          currencyDisplay: 'symbol',
          hideCurrencySymbolOnFocus: true,
          hideGroupingSeparatorOnFocus: true,
          hideNegligibleDecimalDigitsOnFocus: false,
          autoDecimalDigits: true,
          autoSign: true,
          useGrouping: true,
          accountingSign: false
        }
      }
    }
  },
  setup (props) {
    const { inputRef, formattedValue, setOptions, setValue } = useCurrencyInput(props.options)

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value)
      }
    )

    watch(
      () => props.options,
      (options) => {
        setOptions(options)
      }
    )

    return { inputRef, formattedValue }
  }
}
</script>
