<template>
  <div id="init">
    <el-card class="box-card">
      <div id="header">OpenNAS 설치</div>
      <div id="contents">
        <el-main>
          <el-form
            ref="form"
            :model="form"
            status-icon
            :rules="form"
            label-width="140px"
          >
            <el-form-item label="DB 서버 주소" prop="host">
              <el-input v-model="form.host"></el-input>
            </el-form-item>

            <el-form-item label="DB 서버 포트" prop="port">
              <el-input v-model="form.port"></el-input>
            </el-form-item>

            <el-form-item label="DB 종류" prop="db">
              <el-select v-model="form.db" placeholder="DB를 선택해주세요">
                <el-option
                  v-for="item in dbEngine"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="DB 관리자 계정" prop="db_root_user">
              <el-input v-model="form.db_root_user"></el-input>
            </el-form-item>

            <el-form-item label="DB 관리자 비밀번호" prop="db_root_password">
              <el-input
                v-model="form.db_root_password"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item label="DB 사용자 계정" prop="db_onas_user">
              <el-input v-model="form.db_onas_user" disabled></el-input>
            </el-form-item>

            <el-form-item label="DB 사용자 비밀번호" prop="db_onas_password">
              <el-input
                v-model="form.db_onas_password"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">저장</el-button>
              <el-button @click="onAbort">취소</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Init",
  props: ["data"],
  data() {
    return {
      valid: null,
      form: {
        host: "",
        port: "",
        db: "",
        db_root_user: "",
        db_root_password: "",
        db_onas_user: "open_nas",
        db_onas_password: "",
      },
      dbEngine: [
        {
          label: "MySQL(MariaDB)",
          value: "mysql",
          key: "mysql",
        },
      ],
      loadingText: "",
    };
  },
  async created() {},
  methods: {
    async onSubmit() {
      console.log(this.form);
      this.loadingText =
        "기본설정 파일 생성까지 성능에 따라 약 1~5분정도 소요됩니다.";
      const loading = this.$loading({
        lock: true,
        text: this.loadingText,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      await axios
        .post("/api/init/install", {
          form: this.form,
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
        })
        .catch((err) => {
          console.error(err);
        });

      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    onAbort() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#init {
  display: flex;
  justify-content: center;
}

#header {
  text-align: center;
}

.box-card {
  width: 500px;
}
</style>
