<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>标签管理</BreadcrumbItem>
      <BreadcrumbItem>新增标签</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="addTag">
        <Form ref="form" :model="form" :rules="rules">
          <FormItem label="标签名称" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入标签名称"></Input>
          </FormItem>
          <FormItem label="标签描述" prop="description">
            <Input type="text" v-model="form.description" placeholder="请输入标签名称"></Input>
          </FormItem>
          <FormItem label="是否启用" prop="enable">
            <RadioGroup v-model="form.enable">
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
  name: 'addTag',
  data () {
    return {
      form: {
        name: '',
        description: '',
        enable: '1'
      },
      rules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入标签描述', trigger: 'blur' }
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
          service.addTag(this.form)
            .then(res => {
              if (res.code === 0) {
                this.$refs[name].resetFields()
                this.$Message.success('新增标签成功')
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
  .addTag {
    width: 400px;
    margin: 30px auto;
  }
</style>
