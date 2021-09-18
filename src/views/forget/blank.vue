<template>
  <div></div>
</template>

<script>
export default {
  created() {
    window.location.href =
      this.fun.getSiteRoot() +
      // "/admin/shop?route=index.index&uniacid=" +
      "/admin/shop?route=survey.survey.index&uniacid=" +
      this.$route.query.id;
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
