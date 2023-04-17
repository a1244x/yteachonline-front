<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="">
            <el-input v-model="examQuestionVo.name" placeholder="题目名称"></el-input>
        </el-form-item>
        
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
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
        width="300"
        show-overflow-tooltip=true>
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
        show-overflow-tooltip=true>
        </el-table-column>

        <el-table-column
        prop="answer"
        label="答案"
        width="130"
        show-overflow-tooltip=true>
        </el-table-column>

        <el-table-column
        prop="detail"
        label="解析"
        width="130"
        show-overflow-tooltip=true>
        </el-table-column>

        <el-table-column
        prop="teacherId"
        label="出题人ID"
        width="100"
        show-overflow-tooltip=true>
        </el-table-column>

        <el-table-column
        prop="gmtCreate"
        label="出题时间"
        width="180"
        show-overflow-tooltip=true>
        </el-table-column>

        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <router-link :to="'/exam/question/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeQuestion(scope.row.id)">删除</el-button>
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
import question from '@/api/exam/question'

  export default {
    data() {
      return {
        list:null,
        listLoading: true,
        page:1,
        limit:10,
        total:0,
        examQuestionVo:{
            name:''
        },
        multipleSelection: []
        
        
      }
    },
    created() {
        this.getList()
    },
    methods: {
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
        handleSizeChange(val) {
            this.limit = val;
      //默认跳转到第一页,必须设置
      //否则会当切换每页显示数量时,handleSizeChange和handleCurrentChange都会被调用
            this.page = 1;
            this.getList();
        },
        removeQuestion(questionId) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return question.removeById(questionId)
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

