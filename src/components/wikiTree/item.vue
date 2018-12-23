<template>
  <li class="wikiTree-item">
    <div class="wikiTree-title">
      <span>
        <Icon type="ios-arrow-down" />
        <span>{{ model.title }}111</span>
      </span>
      <span>
        <span>
          <span>
            <Button size="small" type="info">
              <Icon type="ios-create-outline" />
            </Button>
          </span>
          <span>
            <Button size="small" type="primary">
              <Icon type="ios-add" />
            </Button>
          </span>
          <span>
            <Button size="small" type="error">
              <Icon type="ios-remove" />
            </Button>
          </span>
        </span>
      </span>
    </div>
    <!--<ul v-show="open" v-if="isFoler">-->
      <!--<item-->
        <!--:model="model"-->
        <!--v-for="(model, index) in model.children"-->
        <!--:key="index"-->
      <!--&gt;</item>-->
      <!--<li class="wikiTree-add" @click="addChild">新增</li>-->
    <!--</ul>-->
  </li>
</template>

<script>
export default {
  name: 'item',
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    isFoler: function () {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    addChild () {
      this.model.children.push({
        title: '新增标题'
      })
    }
  },
  created () {
    console.log(this.model)
  }
}
</script>

<style lang="less">
  .wikiTree-item {
    .wikiTree-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
</style>
