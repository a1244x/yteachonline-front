<template>
  <div class="app-container">

      <el-form :model="examExam" :rules="formRules" ref="examExam" label-width="100px" class="demo-examExam">

        
            <el-form-item label="考试名称" prop="name">
                <el-input v-model="examExam.name"></el-input>
            </el-form-item>

            <el-form-item label="考试位置" prop="room">
                <el-input v-model="examExam.room"></el-input>
            </el-form-item>

          <el-form-item label="选择试卷" prop="question">

                      <el-form-item label="">
                          <el-input v-model="examPaperVo.name" placeholder="试卷名称" style="width:200px"></el-input>
                          <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
                          <el-button type="default" @click="resetPaperData()">清空</el-button>
                          <el-button type="success" @click="showPaper()">已选试卷</el-button>
                      </el-form-item>

                        <el-dialog title="已选择的试卷" :visible.sync="dialogFormVisible" width="60%" :close-on-click-modal="false">   
                          <el-table
                            v-loading="listLoading"
                            element-loading-text="数据加载中"
                            ref="multipleTable"
                            :data="list1"
                            tooltip-effect="dark"
                            style="width: 100%;text-align: center;">

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
                            prop="paperName"
                            label="试卷名称"
                            width="200"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="paperDuration"
                            label="试卷时长"
                            width="150"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="gmtCreate"
                            label="添加时间"
                            width="170"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="mini" icon="el-icon-edit" @click="deleteById(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>

                            
                            </el-table>
                            
                                <el-button type="primary" @click="dialogFormVisible = false" style='position: absolute;bottom:15px;right:30px;'>返 回</el-button>        
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
                      label="试卷名称"
                      width="150"
                      show-overflow-tooltip>
                      </el-table-column>

                      <el-table-column
                      prop="score"
                      label="试卷总分"
                      width="100"
                      show-overflow-tooltip>
                      </el-table-column>

                      <el-table-column
                      prop="duration"
                      label="试卷时长"
                      width="100"
                      show-overflow-tooltip>
                      </el-table-column>

                      

                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" icon="el-icon-edit" @click="saveExamPaper(scope.row.id,scope.row.name,scope.row.duration)">添加</el-button>
                        </template>
                    </el-table-column>

                    
                </el-table>
              </el-form-item>
              <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="getList"
                      :current-page.sync="page"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size.sync="limit"
                      style="padding: 30px 140px; text-align: left;"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
              </el-pagination>


            <el-form-item label="考试时间" prop="time">
                <div class="block">
                    <span class="demonstration">默认</span>
                    <el-date-picker
                    v-model="examExam.startTime"
                    type="datetime"
                    placeholder="选择考试开始时间"
                    value-format="yyyy-MM-dd HH-mm-ss">
                    </el-date-picker>
                </div>

                <div class="block">
                    <span class="demonstration">默认</span>
                    <el-date-picker
                    v-model="examExam.endTime"
                    type="datetime"
                    placeholder="选择考试结束时间"
                    value-format="yyyy-MM-dd HH-mm-ss">
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-form-item label="考试状态" prop="state">
                <el-input v-model="examExam.state"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addOrUpdateExam()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import exam from '@/api/exam/exam'
import paper from '@/api/exam/paper'

  export default {
    data() {
      return {
        saveBtnDisabled: false,
        dialogFormVisible:false,
        examExam: {
            name: null,
            room:'',
            startTime:'',
            endTime: '',
            state:'未开始',
        },
        list:null,
        list1:[],
        page:1,
        limit:5,
        total:0,
        page1:1,
        limit1:5,
        total1:0,
        listLoading:true,
          examPaper :[{
            name: '',
            socre: '',
            duration: ''
          }],
          examPaperVo:{
              name:''
          },
          examExamPaper:{
            examId:'',
            paperId:'',
            paperName:''
          },
          examExam:{
            id:'',
          },
        formRules: {
          name: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
          ],
          room: [
            { required: true, message: '请输入考试位置', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请选择考试时间', trigger: 'blur' }
          ]
         
        }
      };
    },
    created() {
      this.init()
      this.getList()
      this.examExam.state = '未开始'
    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    methods: {
        init(){
          if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getExam(id)
            this.examExamPaper.examId = id
          }else{
            this.examExam = {
              name: null,
              room:'',
              time:'',
              state:'',
            }
          }
      },
        getList(page = 1){
            this.page = page
            this.listLoading = false
            paper.getPaperListPage(this.page,this.limit,this.examPaperVo)
                .then(response =>{
                    this.list = response.data.rows
                    this.total = response.data.total
                })
                .catch(error =>{
                    console.log(error)
                })
        },
        getExamPaperPage(page1 = 1){
          this.page1 = page1
            this.listLoading = false
            exam.getExamPaperPage(this.page1,this.limit1,this.examExamPaper)
                .then(response =>{
                    this.list1 = response.data.rows
                    this.total1 = response.data.total
                })
                .catch(error =>{
                    console.log(error)
                })
        },
        handleSizeChange1(val) {
              this.limit1 = val;
        //默认跳转到第一页,必须设置
        //否则会当切换每页显示数量时,handleSizeChange和handleCurrentChange都会被调用
              this.page1 = 1;
              this.getPaperQuestionPage();
          },    
        handleSizeChange(val) {
            this.limit = val;
      //默认跳转到第一页,必须设置
      //否则会当切换每页显示数量时,handleSizeChange和handleCurrentChange都会被调用
            this.page = 1;
            this.getList();
        },
        showPaper(){
        this.dialogFormVisible = true

        this.getExamPaperPage()
      },
      saveExamPaper(paperId,paperName,paperDuration) {
        this.examExamPaper.examId = this.examExam.id
        this.examExamPaper.paperId = paperId
        this.examExamPaper.paperName = paperName
        this.examExamPaper.paperDuration = paperDuration
        exam.addExamAndPaper(this.examExamPaper)
          .then(response => {
            return this.$message({
            type: 'success',
              message: '添加成功!'
            })
            
      })
    },

      resetData(){
        this.examExam = {}
      },
      getExam(id){
      exam.getExam(id)
        .then(response =>{
          this.examExam = response.data.examExam
          
        })
        .catch(error =>{

        })
       },
      addOrUpdateExam(){
        this.saveBtnDisabled = true
        if(!this.examExam.id){
          this.saveExam()
        }else{
          this.updateExam()
        }
      },
      updateExam(){
      exam.updateExam(this.examExam)
        .then(response =>{
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$router.push({ path: '/exam/exam/list' })
        })
      },
      saveExam() {
      exam.addExam(this.examExam)
        .then(response => {
          return this.$message({
           type: 'success',
            message: '添加成功!'
          })
      }).then(resposne => {
        this.$router.push({ path: '/exam/exam/list' })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '添加失败，有内容尚未填写'
        })
      })
    },
    
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      deleteById(id){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return exam.deleteById(id)
          }).then(() => {
            this.getExamPaperPage()// 刷新列表
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