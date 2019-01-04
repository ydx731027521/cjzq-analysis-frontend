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
                  <input v-model="username" placeholder="用户名" @keyup.enter="handleLogin">
                </div>
            </div>
            <div class="pwd">
                <div class="icon">
                    <i class="iconfont icon-mima"></i>
                </div>
                <div class="input-box">
                  <input v-model="password" placeholder="密码" type="password" @keyup.enter="handleLogin">
                </div>
            </div>
             <div class="code" v-if="isCodeShow">
               <div class="code-box">
                  <div class="icon">
                      <i class="iconfont icon-yanzhengma"></i>
                  </div>
                  <div class="input-box">
                    <input v-model="code" placeholder="验证码" type="texgt" @keyup.enter="handleLogin">
                  </div>
               </div>
               <p class="img-box" @click="handleRefreshCode">
                  <img :src="imgSrc" alt="">
                </p>
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
  let {REFRESH_TOKEN,LOGIN,LOGIN_CODE} = URL
  import {constantRouterMap} from 'router/router'
  import {Decrypt,Encrypt} from 'tools/secret'
  import MD5 from 'js-md5'
  export default {
    name:'login',
    data(){
      return {
        username:'',
        password:'',
        code:'',
        isCodeShow:false,
        imgSrc:''
      }
    },
    methods:{
      _login(){
        let username = this.username.trim()
        let password = MD5(this.password.trim())
        let code = this.code.trim()

        let params = null
        if(this.isCodeShow){
          params = {username,password,validateCode:code}
        }else{
          params = {username,password}
        }

        this.$http.post(LOGIN,params).then(res=>{
          let {data} = res
          if(res.status === 200){
            if(data.status === 0){
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
              this.isCodeShow = false
              this.$router.push('/essantial/config')
            }else if(data.status === -3){
              this.$message.error(res.data.message);
              this.isCodeShow = true
              this._getLoignCode()
            }else{
              this.$message.error(res.data.message);
              this.isCodeShow = false
              this._getLoignCode()
            }
          }
        }).catch(err => {
          util.err()
          console.log(err);
        });
      },
      _getLoignCode(){
        this.code = ''
        this.$http.get(LOGIN_CODE,{
          responseType: 'arraybuffer'
        }).then(response => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      }).then(data => {
        this.imgSrc = data
      })
      },
      handleRefreshCode(){
      this._getLoignCode()
    },
      handleLogin(){
        if(this.username&&this.password){
          if(this.isCodeShow){
            if(this.code){
              this._login()
              // this._getLoignCode()
            }else{
              util.error("请输入验证码")
            }
          }else{
            this._login()
          }
        }else{
          this.$message.error("请输入用用户名和密码");
        }
      }
    },
  }
</script>

<style lang="less" scoped>
    .login{
        width:100%;
        height:100%;
        background-image: url(../../assets/bg.jpg);
        background-size: 100% 100%;

        .login-box{
            width: 360px;
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
                margin-left: -25px;
                margin-right: 10px;
                vertical-align: middle;
              }
            }

            .input-box{
              border-radius: 8px;
              padding: 10px 0 20px;
              text-align: left;
  
              .name,.pwd,.code{
                  width: 100%;
                  margin: auto;
                  margin-bottom: 25px;
                  line-height: 40px;
                  background: rgba(45,45,35,.35);
                  border-radius: 5px;
                  display: flex;
  
                  .icon{
                      width: 30px;
                      text-align: center;
  
                      .iconfont{
                          color: #fff;
                          font-size: 16px;
                      }
                  }
  
                  .input-box{
                      flex:1;
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
                        outline: none;
                        background: transparent;
                        color: #fff;
                        border-radius: 0 5px 5px 0;
                        padding: 0;
                        margin-top: -1px;
                      }
                  }
  

                  input::-webkit-input-placeholder {
                    color: #fff;
                  }
              }

              .code{
                width:100%;
                text-align: left;
                overflow: hidden;
                background: transparent;
                .img-box{
                  float: left;
                  background: #fff;
                  width: 40%;
                  height: 40px;
                  margin-left: 10%;
                  border-radius: 5px 0 0 5px;
                  cursor: pointer;

                  img{
                    width:100%;
                    height:100%;
                  }
                }
                .code-box{
                  width: 50%;
                  float: left;
                  display: flex;
                  background: rgba(45,45,35,.35);
                  border-radius: 0 5px 5px 0;

                  .icon{
                      width: 30px;
                      text-align: center;
  
                      .iconfont{
                          color: #fff;
                          font-size: 16px;
                      }
                  }
  
                  .input-box{
                      flex:1;
                      outline: none;
                      padding: 0;
                      height: 40px;
                      background: rgba(45,45,45,.15);
                      
                      input{
                        width:100%;
                        border: 0;
                        padding: 0;
                        text-indent: 5px;
                        line-height: 40px;
                        height: 40px;
                        outline: none;
                        background: transparent;
                        color: #fff;
                      }
                  }
                }

              }
              
              .btn{
                  display: block;
                  width: 100%;
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
