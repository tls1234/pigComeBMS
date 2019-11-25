<template>
    <router-view></router-view>
</template>

<script>
export default {
    data(){
        return {
            index : "login"
        }
    },
    created(){
        this.showPage();
    },
    methods : {
        async showPage(){
            // debugger;
            const that = this;
            this.$api("typeStatus",{params:{status:"3"}}).then(res => {
                // 已登录
                const { path } = that.$route;
                if(res.data.retCode == 200) {
                    // debugger;
                    if(path === '/') {
                        that.$router.replace({ path: "/manager" });
                    }else {
                        that.$router.replace({ path });
                    }
                }else {
                    that.$router.replace({ path: "/login" });
                }
            // const { token } = res;
            // localStorage.setItem('token', token);
            }).catch(error => {
                this.$message({
                    message: '接口错误，请刷新页面',
                    center: true
                });
            });
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>