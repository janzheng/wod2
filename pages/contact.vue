<template>
  <div class="Contact _section-page _section-page--min _margin-center">

    <div class="_section-content">
      <div class="_section-article" v-html="$md.render(content || '')" />
      <!-- <div class="_section-article">
        <FormContact :src="form"/>
      </div> -->
    </div>

  </div>
</template>




<script>

import FormContact from '~/forms/FormContact.vue'

export default {

  components: {
    FormContact,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      content: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      form: this.$cytosis.find('Content.form-contact', {'Content': this.$store.state['Content']} )[0],
      // images: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Attachments'],
    }
  },
  
  computed: {

  },

  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

