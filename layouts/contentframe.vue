<template>
  <div id="top" class="ContentFrame Layout" >
    <Header :scrollY="scrollY" />
    
    <div class="" >
      <nuxt />
    </div>

    <Footer/>
  </div>
</template>


<script>

import _ from 'lodash'

import { mapState } from 'vuex'
import VueScrollTo from 'vue-scrollto'

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
// import PolicyBanner from '~/components/PolicyBanner.vue'
// import Directory from '~/components/Directory.vue'

// import SignupAlert from '~/components/SignupAlert.vue'
// import SignupRequest from '~/components/SignupRequest.vue'
// import SignupCapsid from '~/components/SignupCapsid.vue'


export default {

  components: {
    Header,
    Footer,
    // PolicyBanner,
    // SignupAlert,
    // SignupRequest,
    // SignupCapsid,
    // Directory,
  },

  head () {
    return {
      title: this.$store.state.pageName || 'Coeur MVP starter kit',
    }
  },

  async asyncdata () {
  },

  data () {
    return {
      scrollY: 0,
      route: '',
      // searchString: 'testStr'
      // children: route ? route.children : undefined,
    }
  },


  computed: {
    ...mapState([
      'searchString'
      ]),
  },

  watch: {
    // '$route' (to, from) {
    // '$route' (to) {
    '$route' () {
      // react to route changes...
      // console.log('ROUTE OBJECT', to, from)
      const _this = this
      let scrolled = false
      this.$nextTick(function () {
        if(_this.$route.hash && !scrolled) {
          // console.log('-- hash scroll')
        } 
        if(_this.$route.hash) {
          const scroll = _.throttle(function () {
            VueScrollTo.scrollTo(_this.$route.hash, 900, {
             offset: -20
           })
          }, 600)
          // scrolls too fast / before stuff's loaded, add a small buffer
          setTimeout(scroll, 200)
          // scroll()
        }
        scrolled = true
      })
    }
  },

  beforeUpdate () {
    const route = this.$router.options.routes.find((route) => {
      return route.path === this.$route.path
    })

    // console.log('new route', route)
    this.route = route
  },

  mounted () {
    // handle anchor links
    const _this = this
    let scrolled = false
    this.$nextTick(function () { // this waits to all the children are mounted, too
      if(_this.$route.hash && !scrolled) {
        // console.log('-- hash scroll')
      } 
      if(_this.$route.hash) {
        const scroll = _.throttle(function () {
          VueScrollTo.scrollTo(_this.$route.hash, 900, {
           offset: -50
         })
        }, 600)

        // scrolls too fast / before stuff's loaded, add a small buffer
        setTimeout(scroll, 300)
        // scroll()
      }
      scrolled = true
    })
  
  },

  // link intercept idea from: https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
  
  created () {
    if(process.browser)
      window.addEventListener('scroll', this.handleScroll)
  },

  destroyed () {
    if(process.browser)
      window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    // handleScroll: _.throttle(function (e) {
    //   // console.log(e)
    //   this.scrollY = window.scrollY
    // }, 200),
    handleScroll() {
      if(process.browser) {
        const _this = this
        _.throttle(function () {
          _this.scrollY = window.scrollY
        }, 200)()
      }
    }
  },
}

</script>


<style lang="scss" scoped>
</style>
