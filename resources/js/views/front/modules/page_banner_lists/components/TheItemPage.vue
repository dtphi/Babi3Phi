<template>
  <figure class="figure" @click="_redirectPage()">
    <img :src="_getImgUrl()" class="rounded img" alt="Giáo Phận Phú Cường" />
    <figcaption class="figure-caption" @click="_redirectPage()">
      {{ pageItem.title }}
    </figcaption>
  </figure>
</template>

<script>
import { mapGetters, } from 'vuex'

export default {
  name: 'TheItemPage',
  props: {
    pageItem: {},
    captionTitle: {
      default: '>>>>> Xem tin tức',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['bannerUrl']),
  },
  methods: {
    _redirectPage() {
      window.location.href = this.pageItem.url
    },
    _getImgUrl() {
      if (this.pageItem.imgThumbUrl) {
        return this.pageItem.imgThumbUrl
      }
      
      return this.$cmsCfg.baseUrl + this.pageItem.img
    },
  },
}
</script>
