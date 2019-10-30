<template>
  <v-container>
    <v-progress-linear :value="satisfactionProc" color="blue-grey" height="25">
      <strong>Satisfaction</strong>
    </v-progress-linear>
    <v-row>
      <v-col v-for="(resource, id) in unlocked_resources" :key="id">
        <resource
          :resource="resource"
          :busy="busy"
          type="resource"
          @start="busy = true"
          @done="gatherResource(id)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(resource, id) in unlocked_items" :key="id">
        <resource
          :resource="resource"
          :busy="busy"
          type="item"
          @start="busy = true"
          @done="craftItem(id)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(resource, id) in next_to_unlock" :key="id">
        <research :resource="resource" :busy="busy" @unlock="unlock(id)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Resource from '~/components/Resource.vue'
import Research from '~/components/Research.vue'

export default {
  components: {
    Resource,
    Research
  },
  data() {
    return {
      year_cycle: 0,
      satisfaction: 100,
      satisfaction_top: 100,
      busy: false
    }
  },
  computed: {
    ...mapGetters(['unlocked_resources', 'unlocked_items', 'next_to_unlock']),
    satisfactionProc() {
      return (100 * this.satisfaction) / this.satisfaction_top
    }
  },
  mounted() {
    setInterval(this.gameLoop, 1000)
  },
  methods: {
    gatherResource(id) {
      this.$store.commit('gather', { id })
      this.busy = false
    },
    craftItem(id) {
      this.$store.commit('craft', { id })
      this.busy = false
    },
    unlock(id) {
      this.$store.commit('unlock', { id })
    },
    gameLoop() {
      this.year_cycle = this.year_cycle++ > 399 ? 0 : this.year_cycle
      if (this.satisfaction > 0) this.satisfaction--
      if (
        this.satisfaction < 25 &&
        this.$store.state.resources.food.amount > 0
      ) {
        this.$store.commit('consume', {
          type: 'resources',
          id: 'food',
          amount: 1
        })
        this.satisfaction = this.satisfaction_top
      }
    }
  }
}
</script>

<style></style>
