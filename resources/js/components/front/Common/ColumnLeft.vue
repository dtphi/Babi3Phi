<template>
  <b-col class="col-mobile" :cols="_getColumnNumber()">
    <aside>
      <slot></slot>
      <keep-alive v-for="(item, idx) in _moduleList" :key="idx">
        <component v-bind:is="item.name" :class="item.cCl"></component>
      </keep-alive>
    </aside>
  </b-col>
</template>

<script>
import { mapState, mapGetters, } from 'vuex'

import SideBarInfoLeft from '../SideBar/SideBarInfoLeft'
import category_left_side_bars from 'v@front/modules/category_left_side_bars'
import NewsletterRegister from 'com@front/Common/NewsletterRegister'
import SummaryContact from 'com@front/SummaryContact'
import category_sub_left_side_bars from 'v@front/modules/category_sub_left_side_bars'
import { fnCheckProp, } from '@app/common/util'

export default {
  name: 'ColumnLeft',
  components: {
    'module-info-left-side-bar': SideBarInfoLeft,
    'module-category-left-side-bar': category_left_side_bars,
    'module-newsletter-register': NewsletterRegister,
    'module-summary-contact': SummaryContact,
    'module-category-sub-left-side-bar': category_sub_left_side_bars,
  },
  props: {
    contentType: {
      default: 'top',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      setting: (state) => state.cfApp.setting,
    }),
    ...mapGetters(['isScreen767']),
    _moduleList() {
      let list = []
      let listMobile = []

      if (Object.keys(this.setting) && fnCheckProp(this.setting, 'modules')) {
        let contentType = 'content_' + this.contentType + '_column'
        let modules = this.$route.meta.layout_content[contentType].left_modules
        if (modules && modules.length) {
          _.forEach(modules, function(item) {
            if (item.isShowMobile) {
              listMobile.push({
                name: 'module-' + item.moduleName.toLowerCase(),
                cCl: item.componentClass,
              })
            }
            list.push({
              name: 'module-' + item.moduleName.toLowerCase(),
              cCl: item.componentClass,
            })
          })
        }
      }

      if (this.isScreen767) {
        return listMobile
      }

      return list
    },
  },
  methods: {
    _getColumnNumber() {
      let contentType = 'content_' + this.contentType + '_column'

      return this.$route.meta.layout_content[contentType].left_column
    },
  },
}
</script>

<style lang="scss">
@import './left-column-styles.scss';
</style>
