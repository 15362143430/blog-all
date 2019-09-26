<template>
  <div>
    <el-form :rules="rules" ref="ruleForm" :model="article" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="article.type" placeholder="请选择文章类型">
          <el-option label="HTML" value="HTML"></el-option>
          <el-option label="CSS" value="CSS"></el-option>
          <el-option label="JavaScript" value="JavaScript"></el-option>
          <el-option label="Vue" value="Vue"></el-option>
          <el-option label="Nodejs" value="Nodejs"></el-option>
          <el-option label="生活趣事" value="生活趣事"></el-option>
          <el-option label="书籍推荐" value="书籍推荐"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="body">
        <el-input type="textarea" v-model="article.body" placeholder="请输入文章内容"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="author">
        <el-input v-model="article.author" placeholder="请输入作者名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">确认修改</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
      <el-dialog
        class="tishi"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>确定要修改信息吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveArticle('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      dialogVisible: false,
      id:this.$route.params.id,
      rules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择文章类型",
            trigger: "blur"
          }
        ],
        body: [
          {
            required: true,
            message: "请输入文章内容",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "请输入作者名字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created () {
     this.axios.get('http://47.100.137.31:3003/article/watch/'+this.id).then(res=>{
         this.article = res.data[0];
        // console.log(res.data[0])
     })
  },
  methods: {
      handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    goback(){

    },
    saveArticle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .put("http://47.100.137.31:3003/article/update/"+this.id, this.article)
            .then(res => {
              this.$message({
                message: "修改成功了!!!",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.$router.push("/index/all");
            });
        } else {
          this.$message.error("请正确填写各项信息！！！！");
          this.dialogVisible = false;
          return false;
        }
      });
    },
  }
};
</script>