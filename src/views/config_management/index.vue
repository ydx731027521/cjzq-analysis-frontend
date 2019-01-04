<template>
    <div class="essantial">
      <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view> -->
          <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name:'essantialManagement'
  }
</script>

