<template>
<div class="wikiTree">
   <ul>
     <item
        top
        :model="wikiData"
        :children="wikiData.children"
        :index="0"
        @changeSelected="changeSelected"
     ></item>
   </ul>
</div>
</template>

<script>
import item from './item'
export default {
  name: 'wikiTree',
  components: {
    item
  },
  data () {
    return {
      wikiData: {
        title: '一级菜单',
        selected: true,
        children: [
          {
            title: '二级菜单',
            selected: false
          },
          {
            title: '二级菜单',
            selected: false
          }
        ]
      }
    }
  },
  methods: {
    changeSelected (obj) {
      console.log(obj)
    }
  }
}
</script>

<style lang="less">
.wikiTree {
  cursor: default;
  ul {
    li {
      list-style: none;
    }
  }
}
</style>
