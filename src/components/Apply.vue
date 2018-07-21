<template>
	<div id="Apply">
		<el-form ref="form" v-model="form" label-width="80px" label-position="left">
			<el-form-item label="申请人">
				<el-input v-model="form.personName"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item label="申请课室">
				<el-select v-model="form.classroom" placeholder="请选择课室" size="medium">
			      <el-option label="德馨堂" value="德馨堂"></el-option>
			      <el-option label="人文学院社区党建办公室" value="人文学院社区党建办公室"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="申请单位">
				<el-input v-model="form.org"></el-input>
			</el-form-item>
			<el-form-item label="开始时间">
				<el-col :span="11" class="timePicker">
					<el-date-picker 
						type="date" 
						placeholder="选择日期" 
						v-model="form.year_date" 
						format="yyyy年 MM月 dd日"
						value-format="yyyy-MM-dd"
						style="width:100%">
					</el-date-picker>
				</el-col>
				<el-col :span="11" :offset="2" class="timePicker">
					<el-time-select 
					placeholder="选择时间" 
					v-model="form.start_time" 
					:picker-options="{
						start:'08:00',
						step:'00:15',
						end:'22:30'
						}"
					style="width:100%">
					</el-time-select>
				</el-col>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-col :span="11" class="timePicker">
					<el-date-picker 
					type="date" 
					placeholder="选择日期" 
					v-model="form.year_date"
					format="yyyy年 MM月 dd日"
					value-format="yyyy-MM-dd"
					disabled
					style="width:100%">
					</el-date-picker>
				</el-col>
				<el-col :span="11" :offset="2" class="timePicker"> 
					<el-time-select 
						placeholder="选择时间" 
						v-model="form.end_time" 
						:picker-options="{
						start:'08:00',
						step:'00:15',
						end:'22:30',
						minTime:form.start_time
						}"
						style="width:100%">
					</el-time-select>
				</el-col>
			</el-form-item>
			<el-form-item label="活动内容">
				<el-input type="textarea" v-model="form.reason" rows="5"></el-input>
			</el-form-item>
			<el-form-item>
				<el-col :span="8" :offset="8">
					<el-button id="btn-submit" type="primary" @click="dialogVisible =true">提交</el-button>
				</el-col>
			</el-form-item>
		</el-form>
		<el-dialog
		  title="提示"
		  width="90%"
		  :visible.sync="dialogVisible">
		  <div class="attention">
		  	<h3>人文学院社区场地借用管理条例</h3>
			<p>1.	请在申请“用途”一栏详细说明活动的具体组织者、主题、方式、人数及主持嘉宾，以方便审核。如果由于用途含糊不清，造成审批不通过或延误的，后果自负。</p>
			<p>2.	涉及意识形态方面的活动或有境外嘉宾参加，请按学校规定报党办、党委宣传部等相关部门审批，经学院党委批准后方可批准，并在“用途”一栏作详细说明。</p>
			<p>3.	使用场地前需院楼111办公室签到和领取房间钥匙，使用后也到院楼111办公室签到和归还钥匙。</p>
			<p>4.	禁止在场地内禁止在室内食用零食、外卖食品等气味过浓的食物；禁止吸烟、喝酒、乱扔杂物垃圾；场地使用完后，自觉做好场地的清洁、整理工作，使场地恢复原样。</p>
			<p>5.	使用过程中损坏物资设备，需按价赔偿或购买相同的物资归还。损坏物资不主动上报者，按三倍价格赔偿，该组织两个月内不得借用该场地。</p>
			<p>6.	不得私拉电线，使用违规电器或物品。</p>
			<p>7.	办公室为重点防火区域，严禁在办公室内使用明火或违禁电器。</p>
			<p>8.	个人代表着学校形象，须严格遵守学校行为规范，依法使用，确保良好的政治氛围。</p>
			<p>9.	结束离开办公室间前需确认所有电源都已切断。</p>
			<p>10.	最后离开的人员须负责关好窗、锁好门，做好防盗工作。</p>
			<p><b>11.	违反以上规定的组织或个人两个月内均不得再次借用。</b></p>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submit()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import qs from 'qs'
	export default{
		name:"Apply",
		data(){
			return {
				form:{
					personId:localStorage.getItem('userid'),
					personName:"",
					phone:"",
					classroom:"",
					org:"",
					reason:"",
					year_date:"",
					start_time:"",
					end_time:"",
					vcode:"",
					codeImg:"",
				},
				dialogVisible:false
			}
		},
		methods:{
			submit(){
				this.dialogVisible = false;
				this.$ajax.post("http://yiban.scau.edu.cn/renwen/public/lend/create",qs.stringify({
					personId:this.form.personId,
					personName:this.form.personName,
					phone:this.form.phone,
					classroom:this.form.classroom,
					org:this.form.org,
					reason:this.form.reason,
					year_date:this.form.year_date,
					start_time:this.form.start_time,
					end_time:this.form.end_time,
				}))
				.then((res)=>{
					if(res.data==1){
						alert("申请成功");
						this.$router.push("/Result/checking");
					}
					else if(res.data==-1){
						alert("时间冲突");
					}else{
						alert("申请失败");
					}
				})
				.catch((err)=>{
					alert("err");
				})
			}
		}
	}
</script>
<style scoped>
	#btn-submit{
		width:100px;
	}
	.el-form{
		width:36%;
		margin-left: auto;
		margin-right: auto;
	}
	.el-select{
		width:100%;
	}
	.attetion{
		width:100%;
		height:auto;
	}
	.attention h3{
		text-align: center;
	}
	@media screen and (max-width:768px)  {
		.el-form{
			width:100%;
		}
		.timePicker{
			width:100%;
			margin-left: 0;
		}
	}
</style>