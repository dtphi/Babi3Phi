<template>
  <div class="tab-content">
    <div class="form-group required">
      <label for="input-info-name" class="col-sm-2 control-label">{{
          $options.setting.name_txt
      }}</label>
      <div class="col-sm-10">
        <b3p-input id="input-info-name" column="info_name" rules="required|max:200" v-model="name"
          :options="{ placeholder: $options.setting.name_txt }" />
      </div>
    </div>
    <div class="form-group required">
      <label for="input-info-sort-description" class="col-sm-2 control-label">{{
          $options.setting.info_sort_description_txt
      }}</label>
      <div class="col-sm-10">
        <b3p-textarea id="input-info-sort-description" name="info_sort_description" rules="required|max:500"
          v-model="sort_description" :options="{ placeholder: $options.setting.info_sort_description_txt }" />
      </div>
    </div>
    <div class="form-group required">
      <label for="input-info-description" class="col-sm-2 control-label">{{
          $options.setting.info_description_txt
      }}</label>
      <div class="col-sm-10">
        <b3p-tinymce id="input-info-description" name="info_description" :other_options="options"
          v-model="description" />
      </div>
    </div>
    <div class="form-group required">
      <label for="input-info-meta-title" class="col-sm-2 control-label">{{
          $options.setting.info_meta_title_txt
      }}</label>
      <div class="col-sm-10">
        <b3p-input id="input-info-meta-title" v-model="meta_title"
          :options="{ placeholder: $options.setting.info_meta_title_txt }" />
      </div>
    </div>
    <div class="form-group">
      <label for="input-info-meta-description" class="col-sm-2 control-label">{{
          $options.setting.info_meta_description_txt
      }}</label>
      <div class="col-sm-10">
        <b3p-textarea id="input-info-meta-description" column="info_meta_description" rules="max:500"
          v-model="meta_description" :options="{ placeholder: $options.setting.info_meta_description_txt }" />
      </div>
    </div>
    <div class="form-group">
      <label for="input-info-meta-keyword" class="col-sm-2 control-label">{{
          $options.setting.info_key_word_txt
      }}</label>
      <div class="col-sm-10">
        <b3p-textarea id="input-info-meta-keyword" column="info_meta_keyword" rules="max:500" v-model="meta_keyword"
          :options="{ placeholder: $options.setting.info_key_word_txt }" />
      </div>
    </div>
    <div class="form-group">
      <label for="input-info-tag" class="col-sm-2 control-label">
        <span data-toggle="tooltip" :data-original-title="$options.setting.info_tag_tooltip_txt">{{
            $options.setting.info_tag_txt
        }}</span>
      </label>
      <div class="col-sm-10">
        <b3p-input id="input-info-tag" column="info_tag" v-model="tag"
          :options="{ placeholder: $options.setting.info_tag_txt }" />
      </div>
    </div>
  </div>
</template>

<script>
import B3pTinymce from 'com@admin/widgets/B3pTinymce'
import { MODULE_INFO_ADD, } from 'store@admin/types/module-types'
import { createHelpers, } from 'vuex-map-fields'
import { MAP_PC_INFORMATIONS, } from 'store@admin/types/model-map-fields'
const { mapFields, } = createHelpers({
  getterType: `${MODULE_INFO_ADD}/getInfoField`,
  mutationType: `${MODULE_INFO_ADD}/updateInfoField`,
})

export default {
  name: 'TabGeneralForm',
  props: {
    media: {
      type: Object,
      default: null,
    },
    mmSelected: {
      default() {
        return {}
      },
    },
    mmPath: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    const elFileContent = document.getElementById('media-file-manager-content')
    const options = this.$cmsCfg.tinymce.options((callback) => {
      this.fn = callback
      elFileContent.style = this.$options.setting.cssDisplay
    })

    return {
      fn: null,
      options: options,
    }
  },
  computed: {
    ...mapFields(MAP_PC_INFORMATIONS),
  },
  watch: {
    mmPath(val) {
      this._updateImageField(val)
    },
  },
  methods: {
    _updateImageField(path) {
      if (typeof this.fn === 'function') {
        this.fn(path, this.mmSelected)
      }
    },
  },
  setting: {
    cssDisplay: 'display:block',
    cssDisplayNone: 'display:none',
    name_txt: 'Tên',
    info_sort_description_txt: 'Mô tả',
    info_description_txt: 'Nội dung',
    info_key_word_txt: 'Từ khóa mô tả',
    info_meta_title_txt: 'Thẻ meta tiêu đề',
    info_meta_description_txt: 'Thẻ meta mô tả',
    info_tag_txt: 'Tags',
    info_tag_tooltip_txt: 'Ngăn cách bởi dấu phẩy',
  },
  components: { B3pTinymce, }
}
</script>
