<template>
  <footer class="Footer ">
    <div class="_padding-left-2 _padding-right-2">
      <div class="_padding-top _padding-bottom">
        <div class="_padding-bottom-2" v-html="$md.render( content || '')" />
      </div>
    </div>
  </footer>
</template>


<script>


export default {

  components: {
  },

  data () {
    return {
      content: this.$cytosis.findOne('footer', this.$store.state['Content'] ).fields['Markdown']
    }
  },

  computed: {
    thisYear() {
      let date = new Date
      return date.getFullYear()
    }
  },


}
</script>

<style lang="scss" scoped>
</style>
