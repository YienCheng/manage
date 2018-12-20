<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>导航设置</BreadcrumbItem>
      <BreadcrumbItem>新增导航</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="addNav">
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem label="导航名称" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入导航名称"></Input>
          </FormItem>
          <FormItem label="导航描述" prop="description">
            <Input type="text" v-model="form.description" placeholder="请输入导航描述"></Input>
          </FormItem>
          <FormItem label="导航链接" prop="link">
            <Input type="text" v-model="form.link" placeholder="请输入导航链接"></Input>
          </FormItem>
          <FormItem label="导航级别" prop="level">
            <Input type="text" v-model="form.level" placeholder="用来排序，例如数字 0 代表 第一位"></Input>
          </FormItem>
          <FormItem label="打开方式" prop="target">
            <Select v-model="form.target" size="small" style="width:100px">
              <Option v-for="item in target" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="状态" prop="status">
            <RadioGroup v-model="form.status">
              <Radio label="1">
                <span>启用</span>
              </Radio>
              <Radio label="0">
                <span>禁用</span>
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
  name: 'addNav',
  data () {
    return {
      form: {
        name: '',
        description: '',
        link: '',
        target: '_self',
        status: '1',
        level: null
      },
      target: [
        {
          label: '当前页面',
          value: '_self'
        },
        {
          label: '新页面',
          value: '_blank'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入导航名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入导航描述', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入导航链接', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入导航等级', trigger: 'blur' }
        ],
        target: [
          { required: true, message: '请选择打开方式', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择导航状态', trigger: 'blur' }
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
          service.addSiteNav(this.form)
            .then(res => {
              if (res.code === 0) {
                this.$refs[name].resetFields()
                this.$Message.success('新增导航成功')
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
  .addNav {
    width: 400px;
    margin: 30px auto;
  }
</style>
