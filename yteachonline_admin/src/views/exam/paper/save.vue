<template>
  <div class="app-container">
      <el-form :model="examPaper" :rules="formRules" ref="examPaper" label-width="100px" class="demo-examPaper">
            <el-form-item label="试卷名称" prop="name">
                <el-input v-model="examPaper.name"></el-input>
            </el-form-item>
              <div>
                <el-form-item label="选择题目" prop="question">

                      <el-form-item label="">
                          <el-input v-model="examQuestionVo.name" placeholder="题目名称" style="width:200px"></el-input>
                          <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
                          <el-button type="default" @click="resetData()">清空</el-button>
                          <el-button type="success" @click="showQuestion()">已选题目</el-button>
                      </el-form-item>

                  <el-dialog title="已选择的题目" :visible.sync="dialogFormVisible" width="60%" :close-on-click-modal="false">   
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
                            prop="questionName"
                            label="题目名称"
                            width="200"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="type"
                            label="题目类型"
                            width="150">
                            <template slot-scope="scope">
                              {{ scope.row.type===1?'选择题':scope.row.type === 2 ? '判断题' : '问答题' }}
                            </template>
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
                        <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="getPaperQuestionPage"
                                :current-page.sync="page1"
                                :page-sizes="[5, 10, 15, 20]"
                                :page-size.sync="limit1"
                                style="padding: 30px 50px; text-align: center;"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total1">
                        </el-pagination>
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
                    label="题目名称"
                    width="150"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="type"
                    label="题目类型"
                    width="80">
                    <template slot-scope="scope">
                      {{ scope.row.type===1?'选择题':scope.row.type === 2 ? '判断题' : '问答题' }}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="score"
                    label="分数"
                    width="50"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="answer"
                    label="答案"
                    width="100"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" icon="el-icon-edit" @click="savePaperQuestion(scope.row.id,scope.row.name,scope.row.score)">添加</el-button>
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
              
            </div>

            <el-form-item label="试卷时长" prop="duration">
                <el-input v-model="examPaper.duration"></el-input>
            </el-form-item>

        <el-form-item>
                <el-button type="primary" @click="updatePaper()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import paper from '@/api/exam/paper'
import question from '@/api/exam/question'

  export default {
    data() {
      return {
        saveBtnDisabled: false,
        examPaper: {
            name: null,
            duration:'',
        },
        PaperQuestion: {
            paperId: null,
            questionId: null,
            questionName: '',
            questionScore:null
        },
        examQuestionVo:{
            name:''
        },
        dialogFormVisible:false,
        list:null,
        list1:null,
        page:1,
        limit:5,
        total:0,
        page1:1,
        limit1:5,
        total1:0,
        
        formRules: {
          name: [
            { required: true, message: '请输入试卷名称', trigger: 'blur' },
          ],
          duration: [
            { required: true, message: '请选择时间时长', trigger: 'blur' }
          ]
         
        }
      };
    },
    created() {
      this.init()
      this.getList()
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
            this.getPaper(id)
          }else{
            this.examPaper = {
                name: null,
                duration:'',
            }
          }
      },
      showQuestion(){
        this.dialogFormVisible = true
        this.getPaperQuestionPage()
      },
       getList(page = 1){
            this.page = page
            this.listLoading = false
            question.getQuestionListPage(this.page,this.limit,this.examQuestionVo)
                .then(response =>{
                    this.list = response.data.rows
                    this.total = response.data.total
                })
                .catch(error =>{
                    console.log(error)
                })
        },
        getPaperQuestionPage(page1 = 1){
            this.page1 = page1
            this.listLoading = false
            paper.getPaperQuestionPage(this.page1,this.limit1,this.PaperQuestion)
                .then(response =>{
                    this.list1 = response.data.rows
                    this.total1 = response.data.total1
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
          handleSizeChange1(val) {
              this.limit1 = val;
        //默认跳转到第一页,必须设置
        //否则会当切换每页显示数量时,handleSizeChange和handleCurrentChange都会被调用
              this.page1 = 1;
              this.getPaperQuestionPage();
          },    

      resetData(){
        this.examQuestionVo = {}
      },
      updatePaper(){
        paper.updatePaper(this.examPaper)
          .then(response =>{
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.$router.push({ path: '/exam/paper/list' })
          })
        },
      getPaper(id){
      paper.getPaper(id)
        .then(response =>{
          this.examPaper = response.data.examPaper
          this.PaperQuestion.paperId = id
        })
        .catch(error =>{

        })
       },
      savePaperQuestion(questionId,questionName,questionScore) {
        this.PaperQuestion.paperId = this.examPaper.id
        this.PaperQuestion.questionId = questionId
        this.PaperQuestion.questionName = questionName
        this.PaperQuestion.questionScore = questionScore
        paper.addPaperAndQuestion(this.PaperQuestion)
          .then(response => {
            return this.$message({
            type: 'success',
              message: '添加成功!'
            })
            
      }).then(resposne => {
        this.$router.push({ path: '/exam/paper/save/'+this.examPaper.id })
      })
    },
    deleteById(id){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return paper.deleteById(id)
          }).then(() => {
            this.getPaperQuestionPage()// 刷新列表
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
    
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>