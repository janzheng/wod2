<template>
  <div class="CoeurExample" >

    <div class="CoeurExample-nav _flex-row _flex-vertically">
      <div class="_flex-1">
        <h3>{{ title }}</h3>
      </div>
      <div class="_buttonGroup --outline _right">
        <button 
          :class="showCode ? '' : '--active'" 
          class="_button --outline --short" 
          @click="showCode = false"
        >
          Example
        </button>
        <button 
          :class="showCode ? '--active' : ''"
          class="_button --outline --short"
          @click="showCode = true"
        >
          Code
        </button>
      </div>
    </div>

    <div v-if="!showCode" :id="title" class="CoeurExample-slot" >
      <slot />
    </div>

    <!-- code highlight from the slot -->
    <pre v-highlightjs="code" v-if="showCode" class="_grid" ><code class="html" /></pre>

  </div>
</template>


<script>

// import { mapState } from 'vuex'
import pretty from 'pretty'

export default {

  components: {
  },

  props: {
    'title': String,
  },

  data: function () {
    return {
      showCode: false,
      code: ''
    }
  },

  computed: {
  },
  
  watch: {

  },

  beforeUpdate () {

  },

  mounted: function () {
    this.code = pretty(document.getElementById(this.title).innerHTML)
  },

  beforeDestroy: function() {
  },

  // link intercept idea from: https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
  
  methods: {
  },


}




</script>


<style lang="scss" scoped>
  .CoeurExample {
    margin-top: 32px * 2;
  }
</style>
