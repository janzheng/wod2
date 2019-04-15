<template>
  <div class="Styles Cards">

    <!-- template selection -->
    <TemplateDocs :node="node" :route="route" >
      <!-- 
      <template v-slot:intro>
        <div>
          This goes in the intro
        </div>
      </template>
      -->
      <div class="_margin-bottom-2">
        <code>_body-card.scss</code>
      </div>

      <Example title="Card Component">
        <div class="_card _padding">
          <h5>Card Topic</h5>
          <p>Here is some cool card text</p>
          <button class="_button --outline --short _margin-none">Submit the Form</button>
        </div>
      </Example>

      <Example title="Flex Cards">
        <p>Flex is great for placing elastic items in a row. Keep in mind flex doesn't have the idea of gutter/gap size, so you have to apply margins, use "space-around", or use the <code>_flex-list</code> helper.</p>
        <div class="_flex _flex-list">
          <div class="_card --inline _padding _flex-1">
            Flex 1
          </div>
          <div class="_card --inline _padding _flex-3">
            Flex 3
          </div>
          <div class="_card --inline _padding _flex-1">
            Flex 1
          </div>
        </div>
      </Example>

      <Example title="Card Grids">
        <p>Card grids combine CSS grids and flexbox to display a grid of card components in an orderly fashion. Every item on a row has the same size. Very useful for lists of links, organizations, photo galleries.</p>
        <div class="_grid-3">
          <div class="Ex3a _card _vh-40">
            <div class="txt _padding">One-section card</div>
          </div>

          <div class="Ex3a2 _card _vh-40 img _bg-center _align-bottom _color-bg">
            <div class="txt _padding">One-section card, img bg w/ bottom text</div>
          </div>

          <div class="Ex3b _card _vh-40 _flex-col">
            <div class="txt _flex-1 _padding">Large top</div>
            <div class="bottom _padding _font-small">Tiny bottom info</div>
          </div>

          <div class="Ex3c _card _vh-40 _flex-col">
            <div class="txt _flex-3 _padding">Large top</div>
            <div class="txt _flex-1 _padding">Small-ish bottom</div>
          </div>

          <div class="Ex3d _card _vh-40 _flex-col">
            <div class="img _bg-center _padding _flex-basis-100 _color-bg">100px fixed img</div>
            <div class="txt _padding _flex-1">Three-section card w/ fixed-height bg img and bottom info</div>
            <div class="bottom _padding _font-small">Tiny bottom info</div>
          </div>

          <div class="_card _vh-40 _flex-col">
            <div class="img _bg-center  _padding _flex-basis-50pc _color-bg">50% img</div>
            <div class="txt _padding">Mid Info really long stuff here woo this one is even longer so that it wraps!!</div>
            <div class="bottom _padding">Bottom Info</div>
          </div>

          <div class="Ex3a _card _vh-40 --transparent">
            <div class="txt _padding">One-section card, Transparent</div>
          </div>

          <div class="Ex3a _card _vh-40 --flat _color-bg-green">
            <div class="txt _padding">One-section card, Flat (and green!)</div>
          </div>

          <div class="Ex3a _card _vh-40 --light">
            <div class="txt _padding">One-section card, Light</div>
          </div>
        </div>
      </Example>

      <Example title="Offset Links">
        <p>Here's an example showing what linked offset cards may look like.</p>
        <div class="_grid-2 _margin-top">
          <a href="#" class="_card _bg-center --clickable img _vh-40 _flex _flex-col _flex-inline _flex-bottom _relative">
            <span class="_margin-left-half _padding-quart _color-bg-white _font-larger">Puppy</span>
            <div class="_margin-left-half _padding-quart _color-bg-white _font-small _margin-bottom"><span>woof!</span></div>
          </a>
          
          <a href="#" class="_card _bg-center --clickable img _vh-40 _flex _flex-col _flex-inline _flex-bottom _relative _top">
            <span class="_margin-left-half _padding-quart _color-bg-white _font-larger">Puppy</span>
            <div class="_margin-left-half _padding-quart _color-bg-white _font-small _margin-bottom"><span>woof!</span></div>
          </a>
          
          <a href="#" class="_card _bg-center --clickable img _vh-40 _flex _flex-col _flex-inline _flex-bottom _relative">
            <span class="_margin-left-half _padding-quart _color-bg-white _font-larger">Puppy</span>
            <div class="_margin-left-half _padding-quart _color-bg-white _font-small _margin-bottom"><span>woof!</span></div>
          </a>
          
          <a href="#" class="_card _bg-center --clickable img _vh-40 _flex _flex-col _flex-inline _flex-bottom _relative _top">
            <span class="_margin-left-half _padding-quart _color-bg-white _font-larger">Puppy</span>
            <div class="_margin-left-half _padding-quart _color-bg-white _font-small _margin-bottom"><span>woof!</span></div>
          </a>
          
        </div>
      </Example>


    </TemplateDocs>

  </div>
</template>




<script>

// import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import TemplateDocs from '~/templates/t-documentation'

import Example from '~/components/coeur/Example'

export default {

  components: {
    TemplateDocs,
    Example
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const node = await loadQuery(env, store, 'template:documentation', 'Node-AbsolutePath', route.path)
    console.log('matched node: ', node, 'route: ', route, ' @ ', route.path)

    return {
      route,
      node: node.tables['Content'][0],
    }
  },

  data () {
    return {
      content: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // form: this.$cytosis.find('Content.form-contact', {'Content': this.$store.state['Content']} )[0],
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
.img {
  /*background-image: url('https://i.imgur.com/A7GCASZ.jpg');*/
  background-image: url('http://www.placepuppy.net/4p/600/400');
  /*background-image: url('~/assets/images/puppy.jpg');*/
  /*// height: 150px;*/
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
a._card {
  text-decoration: none;
}

</style>

