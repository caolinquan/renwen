<template>
  <el-table
    :data="tableDatas"
    stripe
    style="width: 100%">
    <el-table-column
      prop="start_date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="start_time"
      label="开始时间"
      width="">
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间"
      width="">
    </el-table-column>
    <el-table-column
      prop="personName"
      label="姓名"
      width="">
    </el-table-column>
    <el-table-column
      prop="org"
      label="申请单位"
      width="">
    </el-table-column>
    <el-table-column
      prop="classroom"
      label="课室"
      width="135">
    </el-table-column>

  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableDatas:[]
      }
    },
    created(){
      this.$ajax.get("http://yiban.scau.edu.cn/renwen/public/lend/show")
      .then((res)=>{
        this.tableDatas = res.data;
        for(var i=0;i<this.tableDatas.length;i++){
          var tmp = this.tableDatas[i];
          this.tableDatas[i].start_date = tmp.year+"-"+tmp.month+"-"+tmp.date;
          this.tableDatas[i].start_time = tmp.start_hour+":"+tmp.start_minute;
          this.tableDatas[i].end_time = tmp.end_hour+":"+tmp.end_minute;
        }
      })
      .catch((err)=>{
      })
    }
  }
</script>