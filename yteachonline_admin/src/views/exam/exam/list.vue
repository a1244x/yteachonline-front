<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
        <el-button type="success" @click="createExamClick()">创建考试</el-button>

        <el-form-item label="">
            <el-input v-model="examExamVo.name" placeholder="考试名称"></el-input>
        </el-form-item>
        
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

        <el-dialog title="创建/修改考试" :visible.sync="dialogFormVisible1" width="30%" :close-on-click-modal="false">   
          <el-form label-width="100px" size="small" style="width:90%">
              <el-form-item label="考试名称" prop="name">
                <el-input v-model="examExam.name"></el-input>
              </el-form-item>

              <el-form-item label="考试位置" prop="room">
                  <el-input v-model="examExam.room"></el-input>
              </el-form-item>
              
              <el-form-item label="考试时间" prop="time">
                <div class="block">
                    <span class="demonstration">默认</span>
                    <el-date-picker
                    v-model="examExam.startTime"
                    type="datetime"
                    placeholder="选择考试开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>

                <div class="block">
                    <span class="demonstration">默认</span>
                    <el-date-picker
                    v-model="examExam.endTime"
                    type="datetime"
                    placeholder="选择考试结束时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-form-item label="考试状态" prop="state">
                <el-select v-model="examExam.state" placeholder="请选择考试状态">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
              
          </el-form>
          <el-button type="primary" @click="saveOrUpdateExam()">确认创建/修改试卷</el-button>
          <el-button type="primary" @click="cancel()">取消</el-button>        
        </el-dialog>

    <el-table
        v-loading="listLoading"
        element-loading-text="数据加载中"
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%">

        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
        </el-table-column>

        <el-table-column
        prop="name"
        label="考试名称"
        width="150"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column
        prop="room"
        label="考试位置"
        width="80">
        </el-table-column>

        <el-table-column
        prop="startTime"
        label="考试开始时间"
        width="170"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column
        prop="endTime"
        label="考试结束时间"
        width="170"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column
        prop="state"
        label="考试状态"
        width="80"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column
        prop="gmtCreate"
        label="考试创建时间"
        width="180"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="280">
            <template slot-scope="scope">
                <router-link :to="'/exam/exam/save/'+scope.row.id">       
                   <el-button type="success" size="mini">添加试卷 <i class="el-icon-document"></i></el-button>
                </router-link>  
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateExamClick(scope.row.id)">修改</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeExam(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getList"
      :current-page.sync="page"
      :page-sizes="[10, 15, 20, 25]"
      :page-size.sync="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    
  </div>
</template>

<script>
import exam from '@/api/exam/exam'

  export default {
    data() {
      return {
        list:null,
        listLoading: true,
        page:1,
        limit:10,
        total:0,
        dialogFormVisible1:false,
        examExamVo:{
            name:''
        },
        examExam: {
            name: null,
            room:'',
            startTime:'',
            endTime: '',
            state:'未开始',
        },
        multipleSelection: [],

        
        options: [{
          value: '未开始',
          label: '未开始'
        }, {
          value: '已开始',
          label: '已开始'
        }, {
          value: '已结束',
          label: '已结束'
        },],
        
      }
    },
    created() {
        this.getList()
    },
    methods: {
      cancel(){
        this.dialogFormVisible1 = false,
        this.examExam = {
            name: null,
            room:'',
            startTime:'',
            endTime: '',
            state:'未开始',
        }
      },
      createExamClick(){
        this.dialogFormVisible1 = true
      },
      updateExamClick(id){
        this.dialogFormVisible1 = true
        this.getExam(id)
      },
      saveOrUpdateExam(){
        if(this.examExam.id != null)
        {
          this.updateExam()
        }else{
          this.saveExam()
        }
      },
      getExam(id){
      exam.getExam(id)
        .then(response =>{
          this.examExam = response.data.examExam
        })
        .catch(error =>{
          return this.$message({
              type: 'error',
                message: '查询失败!'
              })
        })
       },
      updateExam(){
        exam.updateExam(this.examExam)
          .then(response =>{
            this.dialogFormVisible1 = false
            this.getList()
            this.cancel()
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          })
        },
        getList(page = 1){
            this.page = page
            this.listLoading = false
            exam.getExamListPage(this.page,this.limit,this.examExamVo)
                .then(response =>{
                    this.list = response.data.rows
                    this.total = response.data.total
                })
                .catch(error =>{
                    console.log(error)
                })
        },
        handleSizeChange(val) {
            this.limit = val;
      //默认跳转到第一页,必须设置
      //否则会当切换每页显示数量时,handleSizeChange和handleCurrentChange都会被调用
            this.page = 1;
            this.getList();
        },
        saveExam() {
          exam.addExam(this.examExam)
            .then(response => {
              this.dialogFormVisible1 = false
              this.getList()
              this.cancel()
              return this.$message({
              type: 'success',
                message: '添加成功!'
              })
              
          }).catch((response) => {
            // console.log(response)
            this.$message({
              type: 'error',
              message: '添加失败，有内容尚未填写'
            })
          })
    },
        removeExam(examId) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return exam.removeById(examId)
          }).then(() => {
            this.getList()// 刷新列表
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch((response) => { // 失败
            if (response === 'cancel') {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            }
          })
        },
      
    }
  }
</script>

