<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObject.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObject.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>

    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id, 0)"
            >锁定</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id, 1)"
            >取消锁定</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="toEditPage(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="mpage"
      background
      style="padding: 30px 0; text-align: center"
      layout="prev, pager, next"
      :current-page="current"
      :page-size="pageSize"
      :total="total"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>

<script>
import hospApi from "@/api/hospApi";
export default {
  name: "ListHospitalSet",
  data() {
    return {
      list: [],
      current: 1,
      pageSize: 3,
      total: 0,
      searchObject: {},
      multiSelection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1) {
      this.current = page;
      hospApi
        .getPageList(this.current, this.pageSize, this.searchObject)
        .then((resp) => {
          console.log(resp);
          this.list = resp.data.records;
          this.total = resp.data.total;
        });
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        hospApi.removeById(id).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList();
        });
      });
    },
    removeRows() {
      var ids = [];
      this.multiSelection.forEach(function (value, index, array) {
        ids[index] = value.id;
      });
      console.log(ids);
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        hospApi.removeBatch(ids).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList();
        });
      });
    },
    handleSelectionChange(selection) {
      this.multiSelection = selection;
    },
    lockHostSet(id, status) {
      hospApi.localHospSet(id, status).then((resp) => {
        if (resp.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getList();
        }
      });
    },
    toEditPage(id) {
      this.$router.push("/hosp/edit/" + id);
    },
  },
};
</script>

<style scoped>

</style>
