<template>
  <tr>
    <td>{{ _getNo() }}</td>
    <td class="text-left">
      <a :href="_getHref()">{{ info.name }}</a>
    </td>
    <td class="text-center" style="width: 7%">
      <img :src="$helper.fn_img_base_url(info.image)" class="img-thumbnail" />
    </td>
    <td class="text-center">{{ $helper.fn_format_dd_mm_yyyy(info.created_at) }}</td>
  </tr>
</template>

<script>
import { mapState, } from 'vuex'

export default {
  name: 'InfoItem',
  props: {
    info: {
      type: Object,
      validator: function(value) {
        var id = value.information_id && Number.isInteger(value.information_id)
        var name = value.name && value.name.length
        
        return id && name
      },
    },
    no: {
      default: 1,
    },
  },
  computed: {
    ...mapState({
      meta: (state) => state.cfApp.collectionData,
    }),
  },
  methods: {
    _getHref() {
      return `/${this.$cmsCfg.adminPrefix}/informations/edit/${this.info.information_id}`
    },
    _getNo() {
      return parseInt(this.no) + parseInt(this.meta.from)
    },
  },
}
</script>
