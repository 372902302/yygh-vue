<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospApi from '@/api/hospApi'

export default {
  name: 'FormHospitalSet',
  data() {
    return {
      hospitalSet: {}
    }
  },
  methods: {
    saveOrUpdate() {
      hospApi.saveOrUpdate(this.hospitalSet).then(resp => {
        if (resp.code == 200) {
          this.$message.success('添加成功')
          this.$router.push('/hosp/list')
        }
      })
    },
    getHostSet(id) {
      hospApi.getHospSet(id).then(response => {
        this.hospitalSet = response.data
      })
    },
    update() {
      hospApi.updateHospSet(this.hospitalSet)
        .then(response => {
          //提示
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({path:'/hosp/list'})
        })
    },


  },
  created() {//页面渲染之前执行
    //获取路由id值 调用接口得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHostSet(id)
    }else {
      this.hospitalSet = {}
    }
  }

}
</script>

<style scoped>

</style>
