<template>
  <div class="new-detail">
    <h4 class="tit-detail">{{ pageLists.name }}</h4>
    <p>
      <b-icon class="alarm" icon="alarm"></b-icon>
      <span>{{ pageLists.date_available }}</span>
    </p>

    <p v-html="pageLists.sort_description"></p>

    <hr />

    <div class="text-detail" v-html="pageLists.description"></div>

    <hr />
    <info-tag :info="pageLists"></info-tag>
    <hr />

    <h4 v-if="Object.keys(_getAlbums).length" class="tit-detail">ALBUM HÌNH</h4>
    <div class="docs-galley mb-3" style="position: relative">
      <ul class="docs-pictures clearfix" id="images">
        <li v-for="album in _getAlbums" :key="album.id">
          <img
            class="thumb"
            @click="_showSlide()"
            :data-original="album.image"
            :src="album.image_thumb"
            alt="Picture 1"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, } from 'vuex'
import ImgFooter from 'v@front/assets/img/image_footer.jpg'
import InfoTag from 'com@front/Common/InfoTag'
import { MODULE_INFO_DETAIL, } from '@app/stores/front/types/module-types'
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'

export default {
  name: 'ContentLeft',
  components: { InfoTag },
  data() {
    return {
      imgFooter: ImgFooter,
      viewer: false,
    }
  },
  computed: {
    ...mapGetters(MODULE_INFO_DETAIL, ['pageLists']),
    _getAlbums() {
      let albums = []
      if (this.pageLists.albums && this.pageLists.albums.length)
        albums = this.pageLists.albums[0].images

      return albums
    },
  },
  methods: {
    _showSlide() {
      if (this.viewer) {
        return
      }
      new Viewer(document.getElementById('images'), {
        url: 'data-original',
      })
      this.viewer = true
    },
  },
}
</script>

<style>
.docs-pictures {
  list-style: none;
  margin: 0;
  padding: 0;
}
.docs-pictures > li {
  border: 1px solid transparent;
  float: left;
  height: calc(100% / 4);
  margin: 0 -1px -1px 0;
  overflow: hidden;
  width: calc(100% / 4);
}
.docs-pictures > li > img {
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
  width: 100%;
}
.viewer-backdrop {
  background-color: rgba(0, 0, 0, 0.75) !important;
}
</style>
