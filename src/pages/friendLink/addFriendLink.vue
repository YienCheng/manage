<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>导航设置</BreadcrumbItem>
      <BreadcrumbItem>新增友情链接</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="addFriendLink">
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem label="名称" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input type="text" v-model="form.description" placeholder="请输入描述"></Input>
          </FormItem>
          <FormItem label="链接" prop="link">
            <Input type="text" v-model="form.link" placeholder="请输入链接"></Input>
          </FormItem>
          <FormItem label="级别" prop="level">
            <Input type="text" v-model="form.level" placeholder="用来排序，例如数字 0 代表 第一位"></Input>
          </FormItem>
          <FormItem label="是否显示" prop="status">
            <RadioGroup v-model="form.status">
              <Radio label="1">
                <span>显示</span>
              </Radio>
              <Radio label="0">
                <span>隐藏</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit('form')" type="primary" :loading="submitLoding">提交</Button>
            <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service/index'
export default {
  name: 'addFriendLink',
  data () {
    return {
      form: {
        name: '',
        description: '',
        link: '',
        status: '1',
        level: null
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入链接', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入级别', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      submitLoding: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitLoding = true
          service.addFriendLink(this.form)
            .then(res => {
              if (res.code === 0) {
                this.$refs[name].resetFields()
                this.$Message.success('新增友情链接成功成功')
              }
              this.submitLoding = false
            })
            .catch(() => {
              this.submitLoding = false
            })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less">
  .addFriendLink {
    width: 400px;
    margin: 30px auto;
  }
</style>
