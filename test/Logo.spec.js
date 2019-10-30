import { mount } from '@vue/test-utils'
import Resource from '@/components/Resource.vue'

describe('Resource', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Resource)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
