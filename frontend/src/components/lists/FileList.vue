<template>
  <div>
    <div class="header">
      <label>OpenNAS</label>
    </div>
    <div id="content">
      <el-button type="primary" @click="drawer = true">파일 업로드</el-button>
      <el-drawer
        title="파일 업로드"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="20%"
      >
        <div class="uploadField">
          <el-upload
            class="upload-demo"
            drag
            :action="api"
            :on-remove="handleRemove"
            :file-list="uploadList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </el-upload>
        </div>
      </el-drawer>

      <el-main>
        <el-table :data="fileList">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="FILE_ORI_NM" label="파일명"> </el-table-column>
          <el-table-column prop="EXT" label="확장자"></el-table-column>
          <el-table-column prop="SIZE" label="Size"></el-table-column>
          <el-table-column prop="UPLOAD_DATE" label="업로드 일자">
          </el-table-column>
          <el-table-column label="기능" width="160">
            <template slot="header">
              <div class="header">기능</div>
            </template>
            <template slot-scope="scope">
              <el-button type="primary" @click="download(scope)"><i class="el-icon-download" /></el-button>
              <el-button type="warning"><i class="el-icon-delete" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const { DateTime } = require("luxon");

export default {
  name: "FileList",
  components: {},
  data() {
    return {
      drawer: false,
      direction: "rtl",
      fileList: [],
      uploadList: [],
      api: "/api/files/upload",
    };
  },
  async created() {
    var valid = await this.validSession();
    if (!valid) {
      this.$router.push({
        name: "Main",
      });
      return;
    }
    await this.getFileList();

    // api 정보 수정
    this.api += `?USER_NUM=${this.$session.get("auth").ACCOUNT.USER_NUM}`;
  },
  methods: {
    validSession() {
      var session = this.$session.get("auth");

      if (session == null) {
        return false;
      } else {
        return true;
      }
    },
    getFileList() {
      axios
        .get("/api/files/getList")
        .then((response) => {
          console.log("getFileList = ", response);

          for (var i = 0; i < response.data.length; i++) {
            response.data[i].UPLOAD_DATE = DateTime.fromISO(
              response.data[i].UPLOAD_DATE
            ).toFormat("yyyy-LL-dd HH:mm:ss");
          }

          this.fileList = response.data;
        })
        .catch((err) => {
          console.log("err = ", err);
        });
    },
    download(scope) {
      console.log(scope.row);
    },
    handleClose(done) {
      this.$confirm("파일 업로드를 종료하시겠습니까?", {
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      })
        .then((_) => {
          this.uploadList = [];
          done();
        })
        .catch((_) => {});
    },
    handleRemove(file, fileList) {
      // 업로드 현황 삭제
      console.log(file, fileList);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

.uploadField {
  display: flex;
  justify-content: center;
}

._link {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
