<template>
  <div class="Template-Basic _padding-top-3 _padding-bottom-2 _section-page ">

    <div class="_margin-bottom _section-content">

      <slot name="intro" />

      <!-- Native Contents -->
      <div v-html="$md.render(node.fields['Markdown'] || '')" />

      <slot />

      <!-- Linked Contents  -->
      <div v-for="item of contents" :key="item.id">
        <div v-html="$md.render(item.fields['Markdown'] || '')" />
      </div>

      <slot name="footer" />

    </div>

  </div>
</template>




<script>
  
import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'

export default {

  components: {
  },

  props: {
    'node': Object,
    'route': Object,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  // },

  data () {

    return {
    }
  },
  
  computed: {
    ...mapState([
      'Content'
      ]),

    contents() {
      let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
      return contents.reverse()
    },

    nodeSource() {
      if(this.node && this.node.fields['Node:Source']) {
        let source = this.$cytosis.getLinkedRecords(this.node.fields['Node:Source'], this.Content , true )
        return source.reverse()[0]
      }
    },

    source() {
      // source is either the node's source, or itself!
      return this.nodeSource || this.node
    },

    children() {
      if(this.node.fields['Node:Children']) {
        let children = this.$cytosis.getLinkedRecords(this.node.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
    },

    sourceChildren() {
      if(this.source) {
        let children = this.$cytosis.getLinkedRecords(this.source.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
    },

    sidebar() {
      // check linked content if sidebar is warranted
      if(this.source)
        return true
    }
  },

  beforeCreate () {
  },
  mounted () {
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true
    },
  },


}
</script>

<style>
</style>

