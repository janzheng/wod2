<template>
  <div class="Resources _padding-top-3">

    <div class="Resources-main _section-page _margin-center _margin-bottom-2">
      <div class="_padding-bottom" v-html="$md.render(content || '')" />

      <div class="_grid-3 _grid-gap-small">
        <div v-for="item of Atoms" :key="item.id" class="">
          <div class="_card --transparent _padding _margin-none _align-vertically">
            <div class=" _md-p_fix">
              <div class="_padding-top-half _padding-bottom-half">{{ item.fields['Name'] }}</div>
              <!-- <div class="" v-html="$md.render( item.fields['Markdown'] || '')" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>




<script>
  
import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content","resources"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      // cover: this.$cytosis.findOne('roasters-page', this.$store.state['Content'] ).fields['Cover'][0],
      content: this.$cytosis.findOne('resources-page', this.$store.state['Content'] ).fields['Markdown'],
      // images: this.$cytosis.findOne('roasters-page', this.$store.state['Content'] ).fields['Attachments'],
    }
  },
  
  computed: {
    ...mapState([
      'Atoms',
      ]),
  },

  methods: {
  },


}
</script>

<style>
</style>

