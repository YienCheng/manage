<template>
<div class="wikiTree">
   <ul>
     <item
        v-for="(wikiItem, index) in wikiData"
        :key="index"
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
      // wikiData: {
      //   title: '一级菜单',
      //   children: [
      //     {
      //       title: '一级菜单',
      //       children: [
      //         {
      //           title: '二级菜单',
      //           children: [
      //             {
      //               title: '三级菜单'
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // },
      wikiData: [
        {
          title: '一级菜单',
          children: [
            {
              title: '二级菜单',
              children: [
                {
                  title: '三级菜单'
                }
              ]
            }
          ]
        }
      ]
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
