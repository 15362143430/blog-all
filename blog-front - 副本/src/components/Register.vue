<template>
  <div class="register">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">林三心博客</span>
        <el-form
          label-position="left"
          :model="registerUser"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份" prop="identity">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="游客" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submitBtn" @click="submitForm('ruleForm')">注册</el-button>
          </el-form-item>
          <div class="login">
            <p>
              已有账号？现在去&nbsp&nbsp
              <router-link to="/">登录</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {},
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        identity: [{ required: true, message: "身份不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerUser.freeze = 1;
          this.axios
            .post("http://47.100.137.31:3003/user/register", this.registerUser)
            .then(res => {
              this.$message({
                message: "恭喜你，注册成功",
                type: "success"
              });
              this.$router.push("/");
            });
        } else {
          this.$message.error("请正确填写各项信息！！！！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg2.jpg);
  background-size: 100% 100%;
}
.form-container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
}
.form-container .manage-tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.demo-ruleForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 0px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submitBtn {
  width: 100%;
}

.login {
  text-align: right;
  font-size: 12px;
}

.login p a {
  color: blue;
}
</style>