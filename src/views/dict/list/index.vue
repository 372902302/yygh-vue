<template>
  <div class="app-container">
    <el-button type="primary" round @click="exportData">导出</el-button>
    <el-button type="primary" round @click="importData">导入</el-button>

    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:10010/admin/cmn/dict/importData'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传xls文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>

    <el-table
      :data="dictList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildrens"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template slot-scope="{ row }">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dictApi from "@/api/dictApi";
export default {
  data() {
    return {
      dictList: [],
      dialogImportVisible: false,
    };
  },
  methods: {
    getChildData(id) {
      dictApi.getChildData(id).then((response) => {
        this.dictList = response.data;
      });
    },
    getChildrens(tree, treeNode, resolve) {
      dictApi.getChildData(tree.id).then((resp) => {
        resolve(resp.data);
      });
    },
    exportData() {
      this.$message.success(`${dictApi.base_api}`);
      window.location.href = `${process.env.VUE_APP_BASE_API}${dictApi.base_api}/exportData`;
    },
    importData() {
      this.dialogImportVisible = true;
    },
    onUploadSuccess(response, file) {
      this.$message.info("上传成功");
      this.dialogImportVisible = false;
      this.getChildData(1)
    },
  },
  created() {
    this.getChildData(1);
  },
};
</script>

<style>
</style>