<template>
    <div class="menu">
        <div class="log">
            <img :src="img" alt="">
        </div>
        <div class="menu-list">
            <el-menu
                :default-active="currentPath"
                :router="true"
                class="menu-list-el"
                text-color="#fff"
                :unique-opened="true"
            >
                <el-submenu
                    class="sub"
                    v-for="menu in list"
                    :key="menu.id"
                    :index="menu.path"
                    v-if="menu.children.length > 0"
                >
                    <template slot="title">
                        <i :class="'el-icon ' + menu.icon"/>
                        <span>{{menu.name}}</span>
                    </template>
                    
                    <el-menu-item
                        v-for="submenu in menu.children"
                        :key="submenu.id"
                        :index="submenu.path"
                    >
                        <i :class="'el-icon ' + submenu.icon"/>
                        <span>{{submenu.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="menu.path">
                    <i :class="'el-icon ' + menu.icon"/>
                    <span>{{menu.name}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
    import list from './list';
    import img from './images/houtai_logo.png'
    export default {
        data() {
            return {
                list: list,
                img:img,
                currentPath: 'index'
            }
        },
        created() {
            this.currentPath = this.$route.path;
            this.getList();
        },
        methods: {
            // 获取导航列表
            getList() {
                // this.$api('get_menu');
            }
        }
    }
</script>
<style lang="less" scoped>
    .log {
        width: 100%;
        height: 50px;
        color: white;
        text-align:center;
        font-size: 26px;
        line-height: 50px;
        display: flex;
        flex-direction:column;
        justify-content: space-around;
        align-items: center;
    }
    .log>img{
        width:80%;
        height: auto;
        max-width:100%;
        // padding: 5px 0;
    }
    .menu{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        background: #494f60;
        &-list{
            width: 100%;
            height: calc(100% - 62px);
            background-color: #494f60;
            position: relative;
            overflow: hidden;
            text-align: left;
            .menu-list-el{
                background-color: #494f60;
                border-right: none;
            }
            .el-submen:hover,
            .el-menu-item:hover{
                background: #67a4a5;
            }
        }
    }
    .home {
        background-image: url("~/static/images/home.png");
    }
</style>
<style lang="less">
    .el-submenu .el-menu,{
        background-color: #494f60;
    }
    .el-submenu__title:hover{
        background: #67a4a5;
    }
    .menu {
        .el-menu-item,
        .el-submenu__title {
            font-size: 12px;
            height: 40px;
            line-height: 40px;
        }
        .el-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
        }
        .el-menu-item.is-active{
            background: #409eff;
            color: #fff;
        }
    }
    .el-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-size: cover;
        margin: 0 auto;
        &.home {
            background-image: url("./images/home.png");
        }
        &.resource {
            background-image: url("./images/resource.png");
        }
    }
    
</style>

