<template>
  <li :class="_getActiveClass">
    <a @click="_getInfo()">{{ _getTitle() }}</a>
  </li>
</template>

<script>
import { mapActions, mapGetters, mapState, } from 'vuex'
import {
  MODULE_INFO,
  MODULE_MODULE_CATEGORY_LEFT_SIDE_BAR,
} from '@app/stores/front/types/module-types'
import { fn_get_href_base_url, } from '@app/api/utils/fn-helper'

export default {
  name: 'NavigationMainItem',
  props: {
    title: {
      type: String,
      default() {
        return ''
      },
    },
    link: {
      type: String,
      default() {
        return ''
      },
    },
    activeClass: {
      type: String,
      default() {
        return ''
      },
    },
    group: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters(['moduleNameActive', 'moduleActionListActive']),
    ...mapState(MODULE_MODULE_CATEGORY_LEFT_SIDE_BAR, ['linkSubActive']),
    _getActiveClass() {
      if (this.group.link == this.linkSubActive) {
        return 'sub-active'
      }
      
      return ''
    },
  },
  methods: {
    ...mapActions(MODULE_INFO, ['GET_INFORMATION_LIST_TO_SUB_CATEGORY']),
    ...mapActions(MODULE_MODULE_CATEGORY_LEFT_SIDE_BAR, ['setSubActiveLink']),
    _getTitle() {
      if (this.title) {
        return this.title
      }
      
      return this.group.name
    },
    _getHref() {
      if (this.link) {
        return fn_get_href_base_url(this.link)
      }
      
      return fn_get_href_base_url(`danh-muc-tin/${this.group.link}`)
    },
    _getInfo() {
      this.GET_INFORMATION_LIST_TO_SUB_CATEGORY({
        ...this.$route.params,
        slug: this.group.link,
        moduleName: 'category_sub_left_side_bar',
        renderType: 1,
      })
      this.setSubActiveLink(this.group.link)
    },
  },
}
</script>
