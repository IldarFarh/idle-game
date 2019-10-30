export const state = () => ({
  resources: {
    study: {
      name: 'Research',
      unlocked: 1,
      busy_time: 15,
      amount: 0
    },
    food: {
      name: 'Food',
      unlocked: 1,
      busy_time: 3,
      amount: 5
    },
    wood: {
      name: 'Raw wood',
      text: 'Base material',
      unlocked: 0,
      busy_time: 5,
      amount: 0,
      research: 3
    },
    stone: {
      name: 'Stone',
      unlocked: 0,
      busy_time: 15,
      amount: 0,
      research: 15
    },
    ore: {
      name: 'Ore',
      unlocked: 0,
      busy_time: 25,
      amount: 0,
      research: 30
    }
  },
  items: {
    stick: {
      name: 'Stick',
      unlocked: 0,
      amount: 0,
      busy_time: 3,
      craft: {
        wood: 1
      },
      gathering: 0.1,
      research: 5
    },
    stoneaxe: {
      name: 'Stone axe',
      unlocked: 0,
      amount: 0,
      busy_time: 5,
      craft: {
        wood: 5,
        stone: 2
      },
      gathering: 0.5,
      research: 15
    }
  }
})

export const getters = {
  unlocked_resources(state) {
    const result = {}
    Object.keys(state.resources).forEach((el) => {
      if (state.resources[el].unlocked) {
        result[el] = state.resources[el]
      }
    })
    return result
  },
  unlocked_items(state) {
    const result = {}
    Object.keys(state.items).forEach((el) => {
      if (state.items[el].unlocked) {
        result[el] = state.items[el]
      }
    })
    return result
  },
  next_to_unlock(state) {
    const result = {}
    Object.keys(state.resources).forEach((el) => {
      if (!state.resources[el].unlocked) {
        result[el] = state.resources[el]
      }
    })
    Object.keys(state.items).forEach((el) => {
      if (!state.items[el].unlocked) {
        result[el] = state.items[el]
      }
    })
    return result
  }
}

export const mutations = {
  gather(state, payload) {
    let booster = 0
    Object.keys(state.items).forEach((el) => {
      booster += state.items[el].amount * state.items[el].gathering
    })
    state.resources[payload.id].amount += 1 + booster
  },
  craft(state, payload) {
    Object.keys(state.items[payload.id].craft).forEach((el) => {
      state.resources[el].amount -= state.items[payload.id].craft[el]
    })
    state.items[payload.id].amount++
  },
  unlock(state, payload) {
    if (state.resources.hasOwnProperty(payload.id)) {
      state.resources[payload.id].unlocked = 1
      state.resources.study.amount -= state.resources[payload.id].research
    } else {
      state.items[payload.id].unlocked = 1
      state.resources.study.amount -= state.items[payload.id].research
    }
  },
  consume(state, payload) {
    state[payload.type][payload.id].amount -= payload.amount
  }
}
