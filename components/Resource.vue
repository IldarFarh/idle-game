<template>
  <v-card tile>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline" v-text="resource.name" />
        <v-list-item-subtitle>
          Amount: {{ resource.amount }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-progress-circular :value="gatherProc" color="primary" size="50" />
    </v-list-item>
    <v-card-text>
      <div v-if="type === 'item'">
        <p>Craft:</p>
        <span v-for="(el, id) in resource.craft" :key="id">
          {{ id }}: {{ el }}
        </span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="busy || !canCraft" text @click="doSomething">
        {{ type === 'item' ? 'Craft' : 'Gather' }} {{ resource.name }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    busy: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    resource: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      busyCounter: 0
    }
  },
  computed: {
    ...mapState(['resources']),
    gatherProc() {
      return (100 * this.busyCounter) / this.resource.busy_time
    },
    canCraft() {
      let result = true
      if (this.type === 'item') {
        Object.keys(this.resource.craft).forEach((el) => {
          if (this.resources[el].amount < this.resource.craft[el])
            result = false
        })
      }
      return result
    }
  },
  methods: {
    doSomething() {
      this.$emit('start')
      const id = setInterval(() => {
        this.busyCounter++
        if (this.busyCounter > this.resource.busy_time) {
          clearInterval(id)
          this.busyCounter = 0
          this.$emit('done')
        }
      }, 1000)
    }
  }
}
</script>
