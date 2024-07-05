<template>
  <q-field
    v-model="value"
    outlined
    stack-label
  >
    <template v-slot:control="{ id, floatingLabel }">
      <input :disabled="disable"
             :readonly="readonly"
             ref="inputRef"
             :id="id"
             class="q-field__input text-right"
             v-model="value"
             v-show="floatingLabel" />
    </template>
  </q-field>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'QCurrencyInput',
  props: {
    modelValue: Number,
    options: Object,
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const myOptions = {
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
    const { inputRef } = useCurrencyInput(myOptions)
    const value = 0
    return { inputRef, value }
  }
}
</script>
