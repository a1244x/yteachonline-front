<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" :rules="formRules">
      <el-button type="success" @click="createPaperClick()">创建试卷</el-button>
        <el-form-item label="">
            <el-input v-model="examPaperVo.name" placeholder="试卷名称"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>

        
    </el-form>

    <el-tag type="success" style="height:40px;padding:-10px 20px;font-size:16px;text-align:center;" effect="dark">先创建试卷再添加试题</el-tag>

    <el-dialog title="创建试卷" :visible.sync="dialogFormVisible1" width="30%" :close-on-click-modal="false">   
          <el-form label-width="100px" size="small" style="width:90%">
              <el-form-item label="试卷名称" prop="name">
                  <el-input v-model="examPaper.name">试卷名称</el-input>
              </el-form-item> 
          </el-form>
          <el-button type="primary" @click="generatePaper()">确认创建试卷</el-button>
          <el-button type="primary" @click="dialogFormVisible1 = false">取消</el-button>        
    </el-dialog>

    <el-dialog title="修改试卷名称" :visible.sync="dialogFormVisible2" width="30%" :close-on-click-modal="false">   
          <el-form label-width="100px" size="small" style="width:90%">
              <el-form-item label="试卷名称" prop="name">
                  <el-input v-model="examPaper.name">试卷名称</el-input>
              </el-form-item> 
          </el-form>
          <el-button type="primary" @click="updatePaperName()">确认修改名称</el-button>
          <el-button type="primary" @click="dialogFormVisible2 = false">取消</el-button>        
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
        width="120">
        </el-table-column>

        <el-table-column
        prop="duration"
        label="试卷时长(分)"
        width="170"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column
        prop="gmtCreate"
        label="试卷创建时间"
        width="180"
        show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="300">
            
            <template slot-scope="scope">
              <router-link :to="'/exam/paper/save/'+scope.row.id">       
                <el-button type="success" @click="takePaper(scope.row.id)" size="mini">添加试题 <i class="el-icon-document"></i></el-button>
              </router-link>

                <el-button type="primary" size="mini" icon="el-icon-edit"  @click="updatePaper(scope.row.id,scope.row.name)">修改</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removePaper(scope.row.id)">删除</el-button>
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
import paper from '@/api/exam/paper'

  export default {
    data() {
      return {
        list:null,
        listLoading: true,
        page:1,
        limit:10,
        total:0,
        examPaper:{
          name: null,
        },
        examPaperVo:{
            name:''
        },
        form1:{},
        dialogFormVisible:false,
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        multipleSelection: [],
        formRules: {
          name: [
            { required: true, message: '请输入试卷名称', trigger: 'blur' },
          ]
        }
        
      }
    },
    created() {
        this.getList()
    },
    methods: {
        takePaper(PaperId){
          this.dialogFormVisible = true

        },
        createPaperClick(){
          this.dialogFormVisible1 = true
        },
        updatePaper(id,name){
          this.dialogFormVisible2 = true
          this.examPaper.id = id
          this.examPaper.name = name
        },
        updatePaperName(){
          paper.updatePaper(this.examPaper)
            .then(response =>{
              this.dialogFormVisible2 = false
              this.getList()
              this.examPaper.name = null
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.$router.push({ path: '/exam/paper/list' })
            })
          },
        generatePaper(){
          paper.addPaper(this.examPaper)
            .then(response => {
              this.dialogFormVisible1= false
              this.getList()
              return this.$message({
              type: 'success',
                message: '添加成功!'
              })
              
          }).then(resposne => {
            this.$router.push({ path: '/exam/paper/list' })
          }).catch((response) => {
            // console.log(response)
            this.$message({
              type: 'error',
              message: '添加失败,'
            })
          })
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
        handleSizeChange(val) {
            this.limit = val;
      //默认跳转到第一页,必须设置
      //否则会当切换每页显示数量时,handleSizeChange和handleCurrentChange都会被调用
            this.page = 1;
            this.getList();
        },
        removePaper(paperId) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return paper.removeById(paperId)
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

