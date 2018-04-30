<template>
  <div class="main-footer">
      <span>Written by {{author}}</span>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                author: "Daniel Ng"
            };
        }
    };
</script>

<style lang="stylus" scoped>
    .main-footer {
        margin-top: 40px;
        text-align: center;
        color: #bfbfbf;
        font-size: 10px;
    }
</style>
