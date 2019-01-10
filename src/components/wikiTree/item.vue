<template>
  <li
    class="wikiTree-item"
    :class="{top: top, open: open}" >
    <div class="wikiTree-title">
      <span class="wikiTree-title-left">
        <span class="wikiTree-icon-container" @click.stop="toggle">
          <Icon v-if="isFolder" class="wikiTree-icon" :class="{open: open}" type="ios-arrow-forward" />
        </span>
        <span class="wikiTree-title-text" :class="{selected: model.selected}" @click="titleClick">{{ model.title }}</span>
      </span>
      <span>
        <span>
          <span :class="{topAdd: top}">
            <Button size="small" type="primary" @click.stop="addChild">
              <Icon type="ios-add" />
            </Button>
          </span>
          <span v-if="!top">
            <Button size="small" type="error" @click="removeChild(model)">
              <Icon type="ios-remove" />
            </Button>
          </span>
        </span>
      </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        v-for="(children, index) in model.children"
        :key="index"
        :model="children"
        :children="model.children"
        :index="index"
        @changeSelected="titleClick"
      ></item>
      <!--<li class="wikiTree-add" @click="addChild">新增</li>-->
    </ul>
  </li>
</template>

<script>
export default {
  name: 'item',
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    top: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      open: true
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    addChild () {
      if (!this.isFolder) {
        this.$set(this.model, 'children', [])
      }
      this.model.children.push({
        title: '新增标题',
        selected: false
      })
      this.open = true
    },
    removeChild (model) {
      this.children.splice(this.index, 1)
    },
    titleClick () {
      console.log(this)
      this.$emit('changeSelected', this)
    }
  }
}
</script>

<style lang="less">
  .wikiTree-item {
    user-select: none;
    margin-bottom: 10px;
    .wikiTree-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-right: 20px;
      margin-bottom: 5px;
      .wikiTree-title-left {
        display: flex;
        align-items: center;
        .wikiTree-title-text {
          padding: 0 4px;
          height: 20px;
          line-height: 20px;
          box-sizing: border-box;
          border-radius: 2px;
        }
        .wikiTree-title-text.selected {
          background-color: #d5e8fc;
        }
        .wikiTree-icon-container {
          width: 10px;
          margin-right: 5px;
        }
        .wikiTree-icon {
          transition: transform .3s;
        }
        .wikiTree-icon.open {
          transform: rotate(90deg);
        }
      }
      .topAdd {
        button {
          width: 60px;
        }
      }
    }
    .wikiTree-title .select {
      background-color: #d5e8fc;
    }
    ul {
      padding-left: 17px;
      li {
        margin-bottom: 5px;
      }
    }
  }
</style>
