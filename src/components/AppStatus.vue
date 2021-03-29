<template>
    <span :class="['badge', activeClass]">{{ activeStatusName }}</span>
</template>
<script>
export default {
  props: ['type'],
  computed: {
    activeClass () {
      switch (this.props.type) {
        case 'done':
          return ''
        case 'active':
        case 'finished':
          return 'primary'
        case 'canceled':
          return 'danger'
        case 'inprogress':
          return 'warning'
        default:
          return ''
      }
    },
    activeStatusName () {
      switch (this.props.type) {
        case 'done':
          return 'Выполнена'
        case 'active':
          return 'Активна'
        case 'canceled':
          return 'Отменена'
        case 'inprogress':
          return 'Выполняется'
        case 'finished':
          return 'Завершена'
        default:
          return ''
      }
    }
  }
}
</script>
