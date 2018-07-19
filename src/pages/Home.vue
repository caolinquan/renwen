<template>
  <div class="home">
    <el-container style="height:90%; border: 1px solid #eee">
      <el-header style="font-size: 12px">
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          background-color="#B3C0D1"
          text-color="#333"
          active-text-color="#ffd04b"
          :router="true">
          <el-menu-item index="/Occupation">占用时间</el-menu-item>
          <el-menu-item index="/Apply">申请课室</el-menu-item>
          <el-submenu index="/Result">
            <template slot="title">查看结果</template>
            <el-menu-item index="/Result/all">全部</el-menu-item>
            <el-menu-item index="/Result/checking">审核中</el-menu-item>
            <el-menu-item index="/Result/passed">通过</el-menu-item>
            <el-menu-item index="/Result/rejected">不通过</el-menu-item>
          </el-submenu>
          <el-menu-item index="/Check" v-if="userInfo.admin">等待审核</el-menu-item><!--  -->
        </el-menu>
        <div class="userInfo">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="logout()">注销登陆</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span id="username">{{ userInfo.info.yb_usernick }}</span>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      activeIndex:'/Apply',
      userInfo:{
          status:"",
          info:{
            yb_userid:"",
            yb_usernick:"",
            yb_sex: "",
            yb_money: "",
            yb_exp: "",
            yb_userhead: "",
            yb_schoolid: "",
            yb_schoolname: "",
            yb_regtime: ""
          },
          admin:true
        }
    }
  },
  created(){
    this.$ajax.get("yiban.scau.edu.cn/renwen/public/user/info")
    .then((res)=>{
      this.userInfo.status = res.data.info.status;
      this.userInfo.info = res.data.info.info;
      this.userInfo.admin = res.data.admin;
      localStorage.setItem('userid',this.userInfo.info.yb_userid);
      localStorage.setItem('username',this.userInfo.info.yb_usernick);
    })
    .catch((err)=>{
      window.location.href="yiban.scau.edu.cn/renwen/public/login";
    })
  },
  methods:{
    logout(){
      this.$ajax.get("yiban.scau.edu.cn/renwen/public/logout")
      .then((res)=>{
        localStorage.clear();
        window.location.href="yiban.scau.edu.cn/renwen/public/login";
      })
      .catch((err)=>{

      })
    },
    getCookie(name){
      var v = window.document.cookie.match('(^|;)?'+name+'=([^;]*)(;|$)');
      return v ? v[2] : null;
    },
    deleteCookie(name){
      var d = new Date;
      d.setTime(d.getTime() + 24*60*60*1000*-1);
      window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }
  },
  watch:{
    $route:function(to,from){
      var select = this.$route.params.select;
      if(select=="checking")
        this.activeIndex = "/Result/"+select;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    text-decoration: none;
  }
  .el-header,.el-footer{
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .nav-menu{
    float:left;
    padding: 0;
    border-bottom:0px;
  }
  .userInfo{
    position: absolute;
    right:18px;
  }
  @media screen and (max-width:360px)  {
    .nav-menu{
      height:90%;
      margin-left:-7% ;
    }
    .nav-menu .el-menu-item{
      margin: 0;
      width:19%;
    }
    .nav-menu .el-submenu{
      margin: 0;
      width:19%;
    }
    .userInfo{
      right:0px;
    }
    #username{
      display: none;
    }
  }
  @media screen and (max-width:767px)  {
    .nav-menu{
      height:90%;
      margin-left:-6.4% ;
    }
    .nav-menu .el-menu-item{
      margin: 0;
      padding-left: -5px;
      width:25%;
    }
    .nav-menu .el-submenu{
      margin: 0;
      width:25%;
    }
    .userInfo{
      right:0px;
    }
    #username{
      display: none;
    }
  }
  @media screen and (min-width:768px)  {
    .nav-menu{
      height:90%;
    }
  }
</style>
