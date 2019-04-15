<template>
  <div class="Template-Documentation _padding-top-3 _padding-bottom-2 ">

    <div class="_section-page">
      <h6>[ t-documentation ] </h6>
      <!-- <div class="_card _padding">Node: {{ node }}</div> -->
      <!-- <div class="_card _padding">Source: {{ source }}</div> -->
    </div>


    <div class="_center-margin _container _padding" :class="sidebar ? '_grid-auto-1 _grid-gap-large': '' ">

      <!-- Side bar / Side menu -->
      <div>
        <nav class="SideNav _sidebar " v-if="sidebar">
          <div class="_sidebar-content --top-0 --max-height-90 _padding-bottom _padding-top-half">
            <!-- <a href="#top"> -->
              <!-- <h6 v-if="source">{{ source.fields['Node:Name'] }}</h6> -->
            <!-- </a> -->

            <div class="_sidebar-content-group" 
              :class="pathMatch(source.fields['Node:AbsolutePath']) ? '--active' : ''" 
            >
              <router-link class="_sidebar-item" :to="`${source.fields['Node:AbsolutePath']}`">{{ source.fields['Node:Name'] }}</router-link>
              <div class="_sidebar-submenu" v-if="pathMatch(source.fields['Node:AbsolutePath'])">
                <div class="" 
                  v-for="(item, index) of source.fields['Node:Nav']" 
                  :key="item" 
                  >
                  <router-link class="_sidebar-item _sidebar-subitem" :to="`${source.fields['Node:AbsolutePath'] + source.fields['Node:Nav-Links'][index]}`">{{ item }}</router-link>
                </div>
              </div>

            </div>

            <!-- if node has a source, use the source for nav -->
            <div class="_sidebar-content-group" 
              :class="pathMatch(item.fields['Node:AbsolutePath']) ? '--active' : ''" 
              v-for="(item, index) of sourceChildren" 
              :key="item.id" 
              >
              <!-- label -->
              <div class="_sidebar-item _sidebar-label"
                v-if="item.fields['Type'] == 'Node:Label'"
                >
                <div class="_md-pfix" v-html="$md.render(item.fields['Markdown'] || '')" />
              </div>

              <!-- link -->
              <router-link 
                class="_sidebar-item"
                :to="`${item.fields['Node:AbsolutePath']}`"
                v-if="item.fields['Type'] == 'Node'"
                >
                {{ item.fields['Node:Name'] }}
              </router-link>

              <div v-if="pathMatch(item.fields['Node:AbsolutePath'])">
                <div class="_sidebar-submenu" v-if="pathMatch(item.fields['Node:AbsolutePath'])">
                  <div class="" 
                    v-for="(item2, index) of item.fields['Node:Nav']" 
                    :key="item2" 
                    >
                    <router-link class="_sidebar-item _sidebar-subitem":to="`${item.fields['Node:AbsolutePath'] + item.fields['Node:Nav-Links'][index]}`">{{ item2 }}</router-link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>


      <div class="_margin-bottom">

        <!-- Native Contents -->
        <div v-html="$md.render(node.fields['Markdown'] || '')" />

        <!-- Linked Contents  -->
        <div v-for="item of contents" :key="item.id">
          <div v-html="$md.render(item.fields['Markdown'] || '')" />
        </div>

      </div>
    </div>


  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

export default {

  components: {
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = '/' + unescape(route.params.slug)
    const node = await loadQuery(env, store, 'template:documentation', 'Node-AbsolutePath', slug)
    console.log('matched node: ', node, ' @ ', slug)

    return {
      slug,
      route,
      node: node.tables['Content'][0],
    }
  },

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
        return true;
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
      console.log('pathMatch',this.route.path)
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true

      // const pathstrs = this.route.path.substring(1).split('/')
      // const secstrs = section.route.substring(1).split('/')

      // if (pathstrs.length == 1) {
      //   return this.route.path.includes(section.route) // partial matches for sub strs
      // }

      // if (pathstrs.length == 2) {
      //   return this.route.path == section.route
      // }

      // // this happens when a subsection like /code/css/variables
      // // matches /code/css — we still want this highlighted
      // if (pathstrs.length > secstrs.length && secstrs.length > 1) {
      //   return this.route.path.includes(section.route)
      // }

      // return this.route.path.includes(section.route) // partial matches for sub strs
      // return section && section.sections && this.route.path == section.route
    },
  },


}
</script>

<style>
</style>

