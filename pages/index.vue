<template>
  <div class="Home">

    <div class="_section-page">
      
      <div class="_padding-top-3 _padding-bottom-2">
        <div class=" _padding-bottom">
          <img width="40" class="logo _v-middle" src="~/static/icon.png" >
          <h2 class="title _inline _v-middle _color-brand">Super simple daily workouts </h2>
        </div>
        <h4 class="_layout-header-narrow _font-normal">
          Stop thinking so hard <br> about your workout every day
        </h4>
      </div>
     
      <div class="_section _grid-3-2 _grid-gap-large">

        <div class="">
          <div class="_padding-bottom-2" v-html="$md.render( content || '')" />

          <h6>Workout Series</h6>
          <router-link to="/project-design" class="Home-button-tall _button --widest">
            <div class="_font-bold">Introductory Workout</div>
            Classic introductory workout series
          </router-link>
          <!-- <router-link to="/style" class="Home-button-tall _button --widest">
            <div class="_font-bold">Style System</div>
            Style guide, design tokens, and screen components 
          </router-link> -->
          
          <div class="_padding-top-2 _padding-bottom-2">
            <h6>Generators</h6>
            <router-link to="#" class="Home-button _button --disabled --outline --widest _margin-bottom-none-xs">General Workout Generator [work in progress]</router-link>
            <!-- <router-link to="/resources" class="Home-button _button --outline --widest _margin-bottom-none-xs">Design Resources</router-link> -->
          </div>
        </div>

        <div class="Feed">
          <div v-for="item of Recently" :key="item.id" class="Feed-item _padding-bottom">
            <h6> {{ item.fields['Date'] }}</h6>
            <h5> {{ item.fields['Name'] }}</h5>
            <p> {{ item.fields['Message'] }}</p>
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
    // tableQuery: "_content"
    tableQueries: ['_content', '_recently', ]
  },

  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  data () {
    return {
      content: this.$cytosis.findOne('home-intro', this.$store.state['Content'] ).fields['Markdown'],
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'Recently',
      ]),

  },

  methods: {
  },


}
</script>

<style>
</style>

