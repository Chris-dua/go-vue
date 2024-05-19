<script setup lang="ts">

</script>

<template>
  <div class="gvb_logo">
    <img src="/image/logo.png" alt="">
    <div class="logo_head">
      <div>Arven</div>
      <div>博客管理</div>
    </div>
  </div>
</template>

<style lang="scss">
.gvb_logo{
  height: 120px;
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom:1px solid var(--bg);
  transition: all .3s;
  img{
    width: 100px;
    height: 100px;
    transition: all .3s;
  }
  .logo_head{
    margin-left: 20px;
    transition: all .3s;
    transform: scale(1);
    transform-origin: left;
    >div:nth-child(1){
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    >div:nth-child(2){
      font-size: 12px;
    }
  }
}

.collapsed{
  .gvb_logo{
    padding: 2px;
    img{
      width: 42px;
      height: 42px;
    }
    .logo_head {
      display: none;
      transform: scale(0);
    }
  }
}
</style>