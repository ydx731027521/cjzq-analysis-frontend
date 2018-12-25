<template>
    <div class="login">
      <div class="login-box">
        <div class="title">
          <img src="../../assets/logo.png" alt="">
          <span>经纪业务合规质检系统</span>
        </div>
        <div class="input-box">
            <div class="name">
                <div class="icon">
                    <i class="iconfont icon-yonghu-tianchong"></i>
                </div>
                <div class="input-box">
                  <input v-model="username" placeholder="用户名">
                </div>
            </div>
            <div class="pwd">
                <div class="icon">
                    <i class="iconfont icon-mima"></i>
                </div>
                <div class="input-box">
                  <input v-model="password" placeholder="密码" type="password" @keyup.enter="handleEnter">
                </div>
            </div>
            <div class="btn" @click="handleLogin">
                <span class="text">登录</span>
                <div class="go-box">
                    <i class="arrow iconfont icon-jiantou"></i>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import util from 'tools/util'
  import URL from 'api/url'
  import {filterRouter,setTopNav,setLeftNav} from 'tools/setRoutes'
  let {REFRESH_TOKEN,LOGIN} = URL
  import {constantRouterMap} from '../../router/router'
  export default {
    name:'login',
    data(){
      return {
        username:'',
        password:''
      }
    },
    methods:{
      _login(){
        let username = this.username.trim()
        let password = this.password.trim()
        this.$http.post(LOGIN,{username,password}).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {userName,token,erpxerTime,authorityList} = res.data.data
            this.$store.commit('user/setUserName',userName)
            this.$store.commit('user/setToken',token)
            this.$store.commit('user/setErpxerTime',erpxerTime)
            this.$store.commit('user/setAuthorityList',authorityList)
            // 深拷贝
            let _routerMap = JSON.stringify(constantRouterMap)
            let routerMap = JSON.parse(_routerMap)
            let routes = filterRouter(routerMap, authorityList)
            this.$router.addRoutes(constantRouterMap)
            sessionStorage.setItem('routes',JSON.stringify(routes))
            let headerNavList = setTopNav(routes)
            let leftNavList = setLeftNav(routes)
            this.$store.commit('topNav/setTopNav', headerNavList)
            this.$store.commit('leftNav/setLeftNavList', leftNavList)
            this.$store.commit('leftNav/setLeftActiveList', leftNavList[0])

            util.setSession(userName,token,erpxerTime,authorityList)

            this.$router.push('/essantial/config')
          }else{
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      handleEnter(e){
        if(this.username&&this.password){
          this._login()
        }else{
          this.$message.error("请输入用用户名和密码");
        }
      },
      handleLogin(){
        if(this.username&&this.password){
          this._login()
        }else{
          this.$message.error("请输入用用户名和密码");
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .login{
        width:100%;
        height:100%;
        // background:  #409EFF;
        background-image: url(../../assets/bg.jpg);
        background-size: 100% 100%;

        .login-box{
            width: 400px;
            height: 300px;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;

            .title{
              font-size: 20px;
              color: #fff;
              margin-bottom: 10px;
              height: 50px;

              span{
                line-height: 50px;
              }

              img{
                width: 150px;
                height: 50px;
                margin-right: 10px;
                vertical-align: middle;
              }
            }

            .input-box{
              border-radius: 8px;
              // background: rgba(255,255,255,.9);
              padding: 10px 0 20px;
  
              .name,.pwd{
                  width: 80%;
                  margin: auto;
                  margin-bottom: 20px;
                  line-height: 40px;
                  background: rgba(45,45,35,.35);
                  border-radius: 5px;
                  overflow: hidden;
  
                  .icon{
                      width: 10%;
                      float: left;
  
                      .iconfont{
                          color: #fff;
                          font-size: 16px;
                      }
                  }
  
                  .input-box{
                      float: right;
                      width: 90%;
                      outline: none;
                      padding: 0;
                      height: 40px;
                      background: rgba(45,45,45,.15);
                      
                      
                      input{
                        width:100%;
                        border: 0;
                        text-indent: 5px;
                        line-height: 40px;
                        height: 40px;
                        background: transparent;
                        color: #fff;
                        border-radius: 0 5px 5px 0;
                      }
                  }
  
                  input::-webkit-input-placeholder {
                      color: #fff;
                  }
              }
  
              .btn{
                  display: block;
                  width: 80%;
                  margin: auto;
                  line-height: 40px;
                  font-size: 18px;
                  text-align: center;
                  color: #fff;
                  height: 40px;
                  background: #ED7146;
                  border-radius: 5px;
                  cursor: pointer;
                  position: relative;
                  overflow: hidden;
                  margin-bottom: 20px;
  
                  .text{
                      display: block;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      margin: auto;
                      position: absolute;
                  }
  
                  .go-box{
                      width: 60px;
                      float: right;
                      overflow: hidden;
  
                      .arrow{
                          display: none;
                      }
                  }
              }
  
              .btn:hover{
                  background: #F04A0A;
  
                  .arrow{
                      display: block;
                  }
              }
            }
        }
    }
</style>
