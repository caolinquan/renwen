<template>
	<div id="Result">
		<el-row :gutter="20">
			<el-col :span="6" class="box-card" v-for="item in items" :key="item.id" >
				<el-card shadow="hover" :body-style="{padding:'10px'}">
					<div class="line-1">
						<span class="line-left">申请人: {{item.personName}}</span>
					</div>
					<div class="line-1">
						<span class="line-left">手机号: {{item.phone}}</span>
					</div>
					<div class="line-2">
						<span class="line-left">申请课室: {{item.classroom}}</span>
					</div>
					<div class="line-3">
						<span class="">申请单位: {{item.org}}</span>
					</div>
					<div class="line-4">
						<span class="line-left">开始时间: {{item.year+"-"+item.month+"-"+item.date+" "+item.start_hour+":"+item.start_minute}}</span>
					</div>
					<div class="line-5">
						<span class="line-left">结束时间: {{item.year+"-"+item.month+"-"+item.date+" "+item.end_hour+":"+item.end_minute}}</span>
					</div>
					<div class="line-6">
						<span style="display:block;width:100px;">活动内容:</span>
						<div class="content">
							{{item.reason}}
						</div>
						<div class="sign sign-checking" v-if="item.pass==0">审核中</div>
						<div class="sign sign-passed" v-else-if="item.pass==1">通过</div>
						<div class="sign sign-rejected" v-else="item.pass">不通过</div>
					</div>
					<el-row v-if="item.pass==1" style="margin-top:10px">
						<el-col :span="8" :offset="8">
							<el-button style="width:100px" type="primary" size="small" @click="print(item.id)">打印凭证</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<p v-if="items.length==0">无结果</p>
		</el-row>
	</div>
</template>
<script>
	export default{
		name:"Result",
		data(){
			return {
				tmp:[],
				items:[]
			}
		},
		created(){
			this.$ajax.get("http://139.199.79.172/renwen/public/lend/check",{
				params:{
					personId:localStorage.getItem('userid')
				}
			})
			.then((res)=>{
				this.tmp = res.data;
				this.showData();
			})
			.catch((err)=>{
				alert("err");
			})
		},
		methods:{
			showData(){
				this.items = [];
				var select = this.$route.params.select;
				var flag;
				switch(select){
					case "all": flag = 2;break;
					case "passed": flag = 1;break;
					case "checking": flag = 0;break;
					case "rejected": flag = -1;break;
				}
				var tmpItem;
				for(var i=0;i<this.tmp.length;i++){
					tmpItem = this.tmp[i];
					if(flag==2){
						this.items=this.tmp;
					}
					else if(tmpItem.pass==0 && flag==0){
						this.items.push(tmpItem);
					}
					else if(tmpItem.pass==1 && flag==1){
						this.items.push(tmpItem);
					}
					else if(tmpItem.pass==-1 && flag==-1){
						this.items.push(tmpItem);
					}
				}
			},
			print(id){
				var url = "http://139.199.79.172/renwen/public/lend/pdf?id="+id;
				window.location.href = url;
				}
		},
		watch:{
			$route:function(to,from){
				this.showData();
			}
		}
	}
</script>
<style scoped>
	.box-card{
		margin-top: 10px;
	}
	.line-left{
		float:left;
	}
	.line-right{
		float: right;
	}
	.line-1,.line-2,.line-3,.line-4,.line-5{
		width:100%;
		height:22px;
		border-bottom: 1px solid #f2f4f8;
	}
	.line-6{
		width:100%;
		position: relative;
	}
	.content{
		clear: left;
		width:100%;
		height:120px;
		border: 1px solid #f2f4f8;
	}
	.sign{
		width:95px;
		height:95px;
		/*float:right;*/
		position: absolute;
		right:-15px;
		bottom: -20px;
		padding-top: 8%;
		box-sizing: border-box;
		border-radius: 90px;
		text-align:center;
		font-size: 25px;
		opacity: 0.8;
		transform: rotate(-15deg);

	}
	.sign-checking{
		border: 3px solid #eed847;
		color: #eed847;
	}
	.sign-passed{
		border: 3px solid #8dd745;
		color: #8dd745;
	}
	.sign-rejected{
		border: 3px solid #e86161;
		color: #e86161;
	}
	.sign-finished{
		border: 3px solid #81b7db;
		color: #81b7db;
	}
	@media screen and (max-width:768px)  {
		.el-col{
			width:100%;
		}
	}
</style>