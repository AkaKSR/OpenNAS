<template>
  <div class="content">
    <el-card>
      <label>OpenNAS Login</label>
      <el-form ref="form" label-width="90px">
        <el-form-item label="ID:">
          <el-input size="mini" style="width: 150px" v-model="id"></el-input>
        </el-form-item>

        <el-form-item label="Password:">
          <el-input type="password" size="mini" style="width: 150px" v-model="pass"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="onLogin">Login</el-button>
        <el-button type="warning">Register</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      id: null,
      pass: null,
    };
  },
  async created() {
    var session = this.$session.get("auth");
    if (session != null) {
      if (session.result) {
        this.$router.push({
          name: "FileList",
        });
      }
    }
  },
  methods: {
    async onLogin() {
      var api = `/api/auth/login?USER_ID=${this.id}&PASSWORD=${this.pass}`;
      var login = await axios.get(api);

      console.log(login);
      if (login.data.result) {
        this.$session.set("auth", login.data);
        this.$router.push({
          name: "FileList",
        });
      } else {
        this.$message.warning("계정이 일치하지 않습니다.");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.button {
  display: flex;
  justify-content: center;
}
</style>
