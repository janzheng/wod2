<template>
  <div class="Template-Documentation _padding-top-3 _padding-bottom-2 ">
    <!-- 
      <div class="_section-page">
        <h6>[ t-documentation ] </h6>
        <div class="_card _padding">Node: {{ node }}</div>
        <div class="_card _padding">Source: {{ source }}</div>
      </div>
     -->

    <div 
      :class="sidebar ? '_grid-auto-1 _grid-gap-large': '' "
      class="_center-margin _container _padding" >

      <!-- Side bar / Side menu -->
      <div>
        <nav v-if="sidebar" class="SideNav _sidebar " >
          <div class="_sidebar-content --top-0 --max-height-90 
            _padding-bottom _padding-top">
            <!-- <a href="#top"> -->
            <!-- <h6 v-if="source">{{ source.fields['Node:Name'] }}</h6> -->
            <!-- </a> -->

            <div :class="pathMatch(source.fields['Node:AbsolutePath']) ? '--active' : ''" 
                 class="_sidebar-content-group"
            >
              <router-link :to="`${source.fields['Node:AbsolutePath']}`" class="_sidebar-item" >{{ source.fields['Node:Name'] }}</router-link>
              <div v-if="pathMatch(source.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                <div v-for="(item, index) of source.fields['Node:Nav']" 
                     :key="item" >
                  <router-link :to="`${source.fields['Node:AbsolutePath'] + source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" >{{ item }}</router-link>
                </div>
              </div>

            </div>

            <!-- if node has a source, use the source for nav -->
            <div 
              v-for="(item) of sourceChildren" 
              :class="pathMatch(item.fields['Node:AbsolutePath']) ? '--active' : ''" 
              :key="item.id"
              class="_sidebar-content-group"  
            >
              <!-- label -->
              <div 
                v-if="item.fields['Type'] == 'Node:Label'"
                class="_sidebar-item _sidebar-label"
              >
                <div class="_md-pfix" v-html="$md.render(item.fields['Markdown'] || '')" />
              </div>

              <!-- link -->
              <router-link 
                v-if="item.fields['Type'] == 'Node'"
                :to="`${item.fields['Node:AbsolutePath']}`"
                class="_sidebar-item"
              >
                {{ item.fields['Node:Name'] }}
              </router-link>

              <div v-if="pathMatch(item.fields['Node:AbsolutePath'])">
                <div v-if="pathMatch(item.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                  <div 
                    v-for="(item2, index) of item.fields['Node:Nav']" 
                    :key="item2" 
                  >
                    <router-link 
                      :to="`${item.fields['Node:AbsolutePath'] + item.fields['Node:Nav-Links'][index]}`"
                      class="_sidebar-item _sidebar-subitem"
                    >
                      {{ item2 }}
                    </router-link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>


      <div class="_margin-bottom">

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

