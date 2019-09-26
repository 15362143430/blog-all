<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
      <el-form-item label="投标日期筛选">
        <el-col :span="4">
          <el-date-picker type="date" placeholder="开始日期" v-model="sizeForm.start" style="width: 80"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">---</el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="结束日期" v-model="sizeForm.end" style="width: 80"></el-date-picker>
        </el-col>
        <el-button size="mini" type="primary" @click="screen">筛选</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
      :data="allData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    >
      <el-table-column prop="addtime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="type" label="文章类型" width="100"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="200"></el-table-column>
      <el-table-column class="body" prop="body" label="文章内容" width="200"></el-table-column>
      <el-table-column prop="author" label="文章作者" width="90"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allData.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
      screenDate: [],
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      sizeForm: {}
    };
  },
  created() {
    this.axios.get("http://47.100.137.31:3003/article/vue").then(res => {
      this.allData = res.data;
      for (var i = 0; i < this.allData.length; i++) {
        var reg1 = new RegExp("T", "g");
        var reg2 = new RegExp(".000Z", "g");
        this.allData[i].addtime = res.data[i].addtime
          .replace(reg1, " ")
          .replace(reg2, "");
        this.allData[i].body = res.data[i].body.slice(0, 30) + "......";
      }
    });
  },
  methods: {
    edit(id) {
        if(this.$store.state.User.indentity !== "manager"){
        this.$message.error("您没有权限进行此操作！！！")
      }else{
        this.$router.push({ path: "/index/edit/" + id, params: { id: id } });
      }
    },
    del(id) {
      if(this.$store.state.User.indentity !== "manager"){
        this.$message.error("您没有权限进行此操作！！！")
      }else{
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete("http://47.100.137.31:3003/article/delete/" + id)
            .then(res => {
              this.axios.get("http://47.100.137.31:3003/article/vue").then(res => {
                this.allData = res.data;
                for (var i = 0; i < this.allData.length; i++) {
                  var reg1 = new RegExp("T", "g");
                  var reg2 = new RegExp(".000Z", "g");
                  this.allData[i].addtime = res.data[i].addtime
                    .replace(reg1, " ")
                    .replace(reg2, "");
                  this.allData[i].body =
                    res.data[i].body.slice(0, 30) + "......";
                }
              });
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }
    },
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    },
    screen() {
      if (!this.sizeForm.start || !this.sizeForm.end) {
        this.$message.error("请输入对应的时间");
      } else {
        var starttime = this.sizeForm.start.getTime();
        var endtime = this.sizeForm.end.getTime();
        console.log(starttime, endtime);
        var screenData = [];
        var reg1 = new RegExp("T", "g");
        var reg2 = new RegExp(".000Z", "g");
        this.axios.get("http://47.100.137.31:3003/article/vue").then(res => {
          for (var i = 0; i < res.data.length; i++) {
            var a = res.data[i].addtime;
            var b = new Date(a).getTime();
            if (b >= starttime && b <= endtime) {
              screenData.push(res.data[i]);
            }
          }
          console.log(screenData)
          for (var j = 0; j < screenData.length; j++) {
            screenData[j].addtime = screenData[j].addtime
              .replace(reg1, " ")
              .replace(reg2, "");
            screenData[j].body = screenData[j].body.slice(0, 30) + "......";
          }
          this.allData = screenData;
        });
      }
    }
  }
};
</script>

<style scoped>
.el-date-editor.el-input {
  width: 125px;
}
</style>