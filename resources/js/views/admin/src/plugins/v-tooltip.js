import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip, {
  defaultBoundariesElement: 'body',
  popover: {
    defaultTrigger: 'hover',
    defaultBoundariesElement: 'body',
  },
})
