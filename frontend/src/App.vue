<template>
  <div id="app">
    <router-view />
    <div id="footer">Copyrightⓒ 2021 All rights reserved by OpenNAS Dev.</div>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    if (!this.$session.has("auth")) {
      this.$session.set("auth", null);
    }
  },
};
</script>

<style>
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}
</style>
