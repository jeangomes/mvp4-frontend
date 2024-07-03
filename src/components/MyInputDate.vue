<template>
  <q-input outlined stack-label :class="classes" :hint="hint" :model-value="valueFormatted" mask="##/##/####" @change="updateVM">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" @before-show="updateProxy">
          <q-date minimal v-model="proxyDate" mask="DD/MM/YYYY" :options="optionsQDate">
            <div class="row items-center justify-end">
              <q-btn v-close-popup color="primary" flat no-caps label="Cancelar"/>
              <q-btn v-close-popup color="primary" flat no-caps label="OK" @click="save"/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { computed, ref } from 'vue'
import { useDate } from 'src/components/useDate'
import { format as dateFormatFns } from 'date-fns'

export default {
  name: 'MyInputDate',
  props: {
    modelValue: {
      type: [String],
      default: null
    },
    showWarningInvalidDate: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    },
    classes: {
      type: Array
    },
    optionsQDate: {
      type: [Array, Function]
    }
  },
  setup (props, context) {
    const dates = useDate()
    const proxyDate = ref('')

    function updateVM (e) {
      const vValue = e
      if (vValue.trim() === '') {
        sendChanges(null, false)
        return
      }
      if (!dates.isValid(vValue)) {
        if (props.showWarningInvalidDate) window.alert('Data Inválida')
        sendChanges(null, false)
        proxyDate.value = null
        return
      }
      proxyDate.value = vValue
      save()
    }

    function updateProxy () {
      if (props.modelValue === null || props.modelValue.length < 10) {
        proxyDate.value = dates.formatDate(new Date(), null, 'dd/mm/yyyy').date
        return
      }

      const modelValue = formatDateIfIsInIsoFormat(props.modelValue)
      proxyDate.value = dates.formatDate(modelValue, 'yyyy-mm-dd', 'dd/mm/yyyy').date
    }

    function save () {
      const date = dates.formatDate(proxyDate.value, 'dd/mm/yyyy', 'yyyy-mm-dd')
      sendChanges(date.date, date.valid)
    }

    function sendChanges (value, valid = true) {
      if (!valid) {
        proxyDate.value = null
        context.emit('update:modelValue', null)
        return
      }
      context.emit('update:modelValue', value)
    }

    function formatDateIfIsInIsoFormat (dateValue) {
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/
      if (regex.test(dateValue)) {
        return dateFormatFns(new Date(dateValue), 'yyyy-MM-dd')
      }
      return dateValue
    }

    const valueFormatted = computed(() => {
      if (props.modelValue === null || props.modelValue.length < 10) {
        return ''
      }
      const modelValue = formatDateIfIsInIsoFormat(props.modelValue)
      const date = dates.formatDate(modelValue, 'yyyy-mm-dd', 'dd/mm/yyyy')
      if (date.valid) {
        return date.date
      }
      return ''
    })

    return {
      updateVM,
      updateProxy,
      proxyDate,
      save,
      valueFormatted
    }
  }
}
</script>

<style scoped>
</style>
