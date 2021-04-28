<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/role/add')">添加</el-button>
    <el-table :data="arr" border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column
        label="角色名称"
        prop="rolename"
      ></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push('/role/' + scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
    };
  },
  mounted() {
    axios.get("/api/rolelist").then((res) => {
      this.arr = res.data.list;
    });
  },
  methods: {
    //删除角色方法
    del(obj) {
      //使用element-ui中的$confirm方法给出弹窗提示
      //.then 是点击确定按钮触发的代码
      //.catch 是点击取消按钮触发的代码
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // post提交的数据一般是对象类型或者表单类型，{键名:键值}
          axios.post("/api/roledelete", { id: obj.row.id }).then((res) => {
            if (res.data.code === 200) {
              //删除成功后，接口会返回最新的数据，直接把最新数据赋值给表格使用的数据就可以实现页面的变化
              this.arr = res.data.list;
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "info",
                message: res.data.msg,
              });
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>