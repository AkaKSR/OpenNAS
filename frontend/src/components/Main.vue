<template>
  <div>
    <div v-if="validData.valid"></div>
    <div id="install" v-else>
      <Init :data="validData.data" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Init from "./Init.vue";

export default {
  name: "Main",
  components: {
    Init
  },
  data() {
    return {
      validData: {
        data: null,
        valid: null
      },
    };
  },
  async created() {
    // await this.getFileList();
    await this.validInstall();
  },
  methods: {
    getFileList() {
      axios
        .get("/api/files/getList")
        .then((response) => {
          console.log("response = ", response);
        })
        .catch((err) => {
          console.log("err = ", err);
        });
    },
    validInstall() {
      axios
        .get("/api/init/validInstall")
        .then((response) => {
          console.log(response);

          this.validData = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
