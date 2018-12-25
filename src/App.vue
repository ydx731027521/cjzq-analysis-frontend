<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  import util from './tools/util'
  export default {
    name:'app',
    beforeMount(){
      util.setUserToVuex(this)
      this.$nextTick(()=>{
        let routes = JSON.parse(sessionStorage.getItem('routes'))
        if(routes){
          this.$router.addRoutes(routes)
        }
      })
    }
  }
</script>


<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }
</style>
