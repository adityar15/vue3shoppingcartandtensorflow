import {describe, it, expect} from 'vitest'
import Counter from  '../Counter.vue'
import {mount} from '@vue/test-utils'

describe('Counter', () => {
    const wrapper = mount(Counter)
    it('should render correctly', () => {
        expect(wrapper.html()).toContain("Current count: 0")
    })

    it('should increment correctly', async () => {
        await wrapper.find('[data-type="increment"]').trigger('click')
        expect(wrapper.html()).toContain("Current count: 1")
    })

    it('should decrement correctly', async () => {
        await wrapper.find('[data-type="decrement"]').trigger('click')
        expect(wrapper.html()).toContain("Current count: 0")
    })
})