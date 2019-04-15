<template>
  <div class="Styles Cards">

    <!-- template selection -->
    <Template :node="node" :route="route" >
      <!-- <div>
        Series: {{ series }}
        <hr> 
        Workouts: {{ workouts }}
      </div> -->
      <div v-for="item of workouts" :key="item.id" class="_card _padding">
        <h4>{{ item.fields['Name'] }}</h4>
        <!-- {{ item.fields['Atoms'] }} -->
        <div v-for="item2 of getAtomsFromAtomArray(item.fields['Atoms']) " :key="item2.id">
          <div>
            {{ item2[0].fields['Name'] }} / {{ item2[0].fields['Sets'][0] }} Sets / {{ item2[0].fields['Reps'][0] }} Reps <a :href="item2[0].fields['URL']" target="_blank">?</a>
          </div>
          <hr>
        </div>
      </div>

    </Template>

  </div>
</template>




<script>

import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import Template from '~/templates/t-basic'

export default {

  components: {
    Template,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content", "atoms"]
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

  mounted () {
  },

  computed: {
    ...mapState([
      'Atoms',
      ]),

    series() {
      return this.getAtoms(this.node.fields['Atoms'])
    },

    workouts() {
      return this.getAtomsFromAtom(this.series[0])
    },

  },

  methods: {
    getAtoms(atomArray) {
      let atoms = this.$cytosis.getLinkedRecords(atomArray, this.Atoms , true )
      return atoms.reverse()
    },

    getAtomsFromAtom(singleAtom) {
      console.log('getAtomsFromAtom', singleAtom.fields['Atoms'])
      // for now only gets the atoms from the first linked thing
      let atoms = this.$cytosis.getLinkedRecords(singleAtom.fields['Atoms'], this.Atoms , true )
      return atoms.reverse()
    },

    getAtomsFromAtomArray(atomArray) {
      // console.log('getAtomsFromAtomArray', atomArray)
      let arr = []
      // for now only gets the atoms from the first linked thing
      atomArray.map(item => {
        // console.log('getAtomsFromAtomArray:item', item)
        let atoms = this.$cytosis.getLinkedRecords([item], this.Atoms , true )
        atoms = atoms
        arr.push(atoms)
      })
      // console.log('getAtomsFromAtomArray output', arr)
      return arr.reverse()
    }

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

