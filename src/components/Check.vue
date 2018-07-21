<template>
	<div id="Check">
		<el-row :gutter="20">
			<el-col :span="6" class="box-card" v-for="(item,index) in items" :key="index" >
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
						<div class="sign sign-passed" v-if="item.pass==1">通过</div>
						<div class="sign sign-rejected" v-else-if="item.pass==-1">不通过</div>
					</div>
					<el-row :gutter="20" class="card-bottom">
						<el-col :span="12" v-if="item.pass==0">
							<el-button type="success" style="width:100%" @click="pass(index,item.id)">通过</el-button>
						</el-col>
						<el-col :span="12" v-if="item.pass==0">
							<el-button type="danger" style="width:100%" @click="rejected(index,item.id)">不通过</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import qs from 'qs'
	export default{
		name:"Check",
		data(){
			return {
				items:[]
			}
		},
		created(){
			this.$ajax.get("http://yiban.scau.edu.cn/renwen/public/lend/show")
			.then((res)=>{
				this.items = res.data
			})
			.catch((err)=>{
				alert("get data error");
			})
		},
		methods:{
			pass(index,id){
				this.$ajax.post("http://yiban.scau.edu.cn/renwen/public/admin/judge",
					qs.stringify({
						id:id,
						pass:1
					}))
				.then((res)=>{
					this.items[index].pass = 1;
				})
				.catch((err)=>{
					alert("pass err");
				})
			},
			rejected(index,id){
				this.$ajax.post("http://yiban.scau.edu.cn/renwen/public/admin/judge",
					qs.stringify({
						id:id,
						pass:-1
					}))
				.then((res)=>{
					this.items[index].pass = -1;
				})
				.catch((err)=>{
					alert("rejected err");
				})
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
	.card-bottom{
		height:42px;
	}
	@media screen and (max-width:768px)  {
		.box-card{
			width:100%;
		}
		.card-bottom{
			height:auto;
		}
	}
</style>