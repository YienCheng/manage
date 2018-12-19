<template>
    <div class="userList-expand">
      <Row class="expand-row">
        <Col span="6">
          <span class="expand-key">创建时间: </span>
          <span class="expand-value">{{ row.createTime }}</span>
        </Col>
        <Col span="6">
          <span class="expand-key">最近登入: </span>
          <span class="expand-value">{{ row.lastLoginTime }}</span>
        </Col>
        <Col span="6">
          <span class="expand-key">登入次数: </span>
          <span class="expand-value">{{ row.loginCount }}</span>
        </Col>
        <Col span="6">
          <span class="expand-key">头像: </span>
          <span class="expand-value"><Button type="info" size="small" @click="showAvatar">查看</Button></span>
        </Col>
      </Row>
      <Modal v-model="show" :draggable="true" footer-hide width="200">
        <div style="width: 100%;margin: 0 auto; text-align: center">
          <img class="user-avatar" :src="row.avatar" alt="头像加载中...">
        </div>
      </Modal>
    </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  name: 'userListExpand',
  data () {
    return {
      show: false
    }
  },
  methods: {
    showAvatar (url) {
      this.show = true
    }
  }
}
</script>

<style lang="less">
.userList-expand {
  .expand-row{
    margin-bottom: 16px;
  }
  .expand-row:last-child{
    margin-bottom: 0;
  }
  .avatar {

    text-align: center;
  }
}
  .user-avatar {
    width: 100%;
  }
</style>
