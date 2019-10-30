<template>
  <v-card tile>
    <v-card-title v-text="resource.name" />
    <v-card-text>
      <p>Unlock:</p>
      <span>Research: {{ resource.research }}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="busy || !canCraft" text @click="unlock">
        Unlock {{ resource.name }}
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
    resource: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['resources']),
    canCraft() {
      return this.resource.research <= this.resources.study.amount
    }
  },
  methods: {
    unlock() {
      this.$emit('unlock')
    }
  }
}
</script>
