<template>
    <div class="app-nav">
        <el-menu
            mode="vertical"
            :default-active='$route.name'
            background-color="transparent"
            text-color="#000"
            active-text-color="#0A67C6"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            v-show="!collapsed"
            router>
            <template v-for="menu in activeList">
                <el-menu-item
                    :index="menu.name"
                    :route="menu.route"
                    :key="menu.name"
                    v-if="!menu.children"
                >
                    <i :class="menu.icon"></i>
                    {{menu.name}}
                </el-menu-item>

                <el-submenu v-if="menu.children" :key="menu.route" :index="menu.name">
                     <template slot="title">
                        <i :class="menu.icon"></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="citem in menu.children" :route="citem.route" :key="citem.route" :index="menu.name+' > '+citem.name">
                            <i class="el-icon-bell"></i>
                            <span>{{citem.name}}</span>
                            </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import {} from 'element-ui'
import {mapState} from 'vuex'
export default {
    nam:'nav',
    data(){
        return {
            isCollapse:true,
            menus:[],
            openeds:["常规批次"],
            collapsed:false
        }
    },
    methods:{
        handleOpen(index){
            this.$emit('getTag',index)
            // this.$store.commit("breadCrumb/setSecondClass",index)
        },
        handleClose(){
        },
        handleSelect(){
            this.$store.commit('tree/setExpandId','')
        }
    },
    computed:{
        ...mapState({
            'activeList':(state)=>state.leftNav.activeList
        })
    }
}
</script>

<style lang="less">
a{
    text-decoration: none;
    color: #999;
}

.app-nav{
    width: 200px;
    background: #fff;

    .list{
        max-height:100%;
    }

    .iconfont{
        color: #999;
    }

    .el-menu{
        width: 200px !important;
        border: 0 !important;
        text-align: left;

        .iconfont{
            margin-right: 5px;
            margin-left: 5px;
        }

        .el-submenu{

            .el-submenu__title:hover{
                background-color: #fff !important;
            }

            .el-submenu__icon-arrow.el-icon-arrow-down{
                color: #999;
            }

            span{
                margin-left: 10px;
            }
        }

        .el-menu-item:hover{
            background-color: #FAFBFC !important;

            ul{
                margin-top:-14px;
                text-indent: 20px;
            }
        }
    }
}


</style>
