<template>
  <main id="news" class="py-2">
    <div class="container">
      <main-menu></main-menu>
      <div
        style="background-color: #80808008"
        :style="{ backgroundColor: contentBgColor }"
      >
        <content-top v-if="_isContentTop">
          <!--<template v-if="loading">
                <loading-over-lay
                    :active.sync="loading"
                    :is-full-page="fullPage"></loading-over-lay>
            </template>-->
          <template #column_right>
            <social-network></social-network>
            <div class="box-social">
              <tab-info-viewed-and-popular></tab-info-viewed-and-popular>
            </div>
            <div class="box-care mt-3">
              <b-row class="mt-3">
                <b-col cols="12" class="m-auto">
                  <p class="mb-0 text-download" style="padding: 4px 0">
                    Tải app sách nói công giáo
                  </p>
                </b-col>
                <b-col cols="12">
                  <b-carousel
                    id="carousel-2"
                    :interval="4000"
                    style="cursor: pointer; height: 150px"
                    controls
                    indicators
                  >
                    <b-carousel-slide>
                      <template #img>
                        <img
                          class="d-block img-fluid w-100"
                          style="width: 100%; height: 150px !important"
                          :src="imgCarousel"
                        />
                      </template>
                    </b-carousel-slide>
                    <b-carousel-slide>
                      <template #img>
                        <img
                          class="d-block img-fluid w-100"
                          style="width: 100%; height: 150px !important"
                          :src="imgCarousel"
                        />
                      </template>
                    </b-carousel-slide>
                  </b-carousel>
                </b-col>
              </b-row>
            </div>
          </template>
        </content-top>
        <main-content v-if="_isContentMain"> </main-content>
        <content-bottom v-if="_isContentBottom">
          <template #before>
            <module-page-banner-list></module-page-banner-list>
          </template>
        </content-bottom>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, } from 'vuex'
import { MODULE_INFO, } from '@app/stores/front/types/module-types'
import { GET_INFORMATION_LIST_TO_CATEGORY, } from '@app/stores/front/types/action-types'
import MainMenu from 'com@front/Common/MainMenu'
import ContentTop from 'com@front/Common/ContentTop'
import ContentBottom from 'com@front/Common/ContentBottom'
import SocialNetwork from './components/TheSocialNetwork'
import TabInfoViewedAndPopular from 'com@front/Common/TabInfoViewedAndPopular'
import MainContent from 'com@front/Common/MainContent'
import ModulePageBannerList from 'v@front/modules/page_banner_lists'

export default {
  name: 'InfoPage',
  components: {
    MainMenu,
    TabInfoViewedAndPopular,
    ContentTop,
    ContentBottom,
    SocialNetwork,
    MainContent,
    ModulePageBannerList,
  },
  data() {
    return {
      isContentBottom: true,
      fullPage: false,
      isTopBottomBoth: false,
      imgCarousel: 'https://picsum.photos/1024/480/?image=58',
    }
  },
  computed: {
    ...mapState({
      contentBgColor: state => state.cfApp.setting.contentBgColor,
    }),
    ...mapState(MODULE_INFO, {
      infoList: state => state.pageLists,
      loading: state => state.loading,
    }),
    _isContentTop() {
      return this.$route.meta.layout_content.content_top
    },
    _isContentBottom() {
      return this.$route.meta.layout_content.content_bottom
    },
    _isContentMain() {
      return this.$route.meta.layout_content.content_main
    },
  },
  mounted() {
    this.getInfoListToCategory(this.$route.params)
  },
  methods: {
    ...mapActions(MODULE_INFO, {
      getInfoListToCategory: GET_INFORMATION_LIST_TO_CATEGORY,
    }),
  },
}
</script>

<style lang="scss">
@import "./news-styles.scss";
</style>
