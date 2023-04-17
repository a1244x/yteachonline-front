<template>
  <div class="app-container">

      <el-form :model="examQuestion" :rules="formRules" ref="examQuestion" label-width="100px" class="demo-examQuestion">

        <el-radio-group v-model="examQuestion.type" class="app-container">
          <el-radio v-for="item in isTypeList" :label="item.value" :key="item.value">
            {{item.label}}
          </el-radio>
        </el-radio-group>

        <div v-if="examQuestion.type === 1">
            <el-form-item label="题目名称" prop="name">
                <el-input v-model="examQuestion.name"></el-input>
            </el-form-item>

            <el-form-item label="选项A" prop="optionA">
                <el-input v-model="examQuestion.optionA"></el-input>
            </el-form-item>

            <el-form-item label="选项B" prop="optionB">
                <el-input v-model="examQuestion.optionB"></el-input>
            </el-form-item>

            <el-form-item label="选项C" prop="optionC">
                <el-input v-model="examQuestion.optionC"></el-input>
            </el-form-item>

            <el-form-item label="选项D" prop="optionD">
                <el-input v-model="examQuestion.optionD"></el-input>
            </el-form-item>

            <el-form-item label="分数" prop="score">
                <el-input v-model="examQuestion.score"></el-input>
            </el-form-item>

            <el-form-item label="答案" prop="answer">
              <el-radio-group v-model="examQuestion.answer" class="app-container">
                <el-radio v-for="itemA in isAnswerABCDList" :label="itemA.label" :key="itemA.label">
                  {{itemA.label}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="解析" prop="detail">
                <el-input v-model="examQuestion.detail"></el-input>
            </el-form-item>
            
        </div>

        <div v-if="examQuestion.type === 2">
            <el-form-item label="题目名称" prop="name">
                <el-input v-model="examQuestion.name"></el-input>
            </el-form-item>

            <el-form-item label="答案" prop="answer">
              <el-radio-group v-model="examQuestion.answer" class="app-container">
                <el-radio v-for="itemB in isAnswerTFList" :label="itemB.label" :key="itemB.label">
                  {{itemB.label}}
                </el-radio>
              </el-radio-group>
            </el-form-item> 

            <el-form-item label="分数" prop="score">
                <el-input v-model="examQuestion.score"></el-input>
            </el-form-item>

            <el-form-item label="解析" prop="detail">
                <el-input v-model="examQuestion.detail"></el-input>
            </el-form-item>
            
            
        </div>

        <div v-if="examQuestion.type === 3">
            <el-form-item label="题目名称" prop="name">
                <el-input v-model="examQuestion.name"></el-input>
            </el-form-item>

            <el-form-item label="答案" prop="answers">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入答案"
                v-model="examQuestion.answer">
              </el-input>
            </el-form-item> 

            <el-form-item label="分数" prop="score">
                <el-input v-model="examQuestion.score"></el-input>
            </el-form-item>

            <el-form-item label="解析" prop="detail">
                <el-input v-model="examQuestion.detail"></el-input>
            </el-form-item>
            
        </div>

        <el-form-item>
                <el-button type="primary" @click="addOrUpdateQuestion()">提交</el-button>
                <el-button @click="resetForm('examQuestion')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import question from '@/api/exam/question'

  export default {
    data() {
      return {
        isTypeList:[
          {'label':'选择题','value':1},
          {'label':'判断题','value':2},
          {'label':'问答题','value':3}
        ],
        isAnswerABCDList:[
          {'label':'A','value':'1'},
          {'label':'B','value':'2'},
          {'label':'C','value':'3'},
          {'label':'D','value':'3'}
        ],
        isAnswerTFList:[
          {'label':'正确','value':'正确'},
          {'label':'错误','value':'错误'}
        ],
        radio: 1,
        answer: '',
        saveBtnDisabled: false,
        examQuestion: {
          name: null,
          type: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          score: '',
          answer:'',
          detail: ''
        },
        
        formRules: {
          name: [
            { required: true, message: '请输入题目名称', trigger: 'blur' },
          ],
          optionA: [
            { required: true, message: '请输入选项A内容', trigger: 'blur' }
          ],
          optionB: [
            { required: true, message: '请输入选项B内容', trigger: 'blur' }
          ],
          optionC: [
            { required: true, message: '请输入选项C内容', trigger: 'blur' }
          ],
          optionD: [
            { required: true, message: '请输入选项D内容', trigger: 'blur' }
          ],
          score: [
            { required: true, message: '请填写分数', trigger: 'blur' },
            { type: 'number', message: '必须是数字',  trigger: 'blur' }

          ],
          answers: [
            { required: true, message: '请填写内容', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.init()
      this.examQuestion.type = 1
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
            this.getQuestion(id)
          }else{
            this.examQuestion = {
              name: null,
              type: '',
              optionA: '',
              optionB: '',
              optionC: '',
              optionD: '',
              score: '',
              answer:'A',
              detail: ''
            }
          }
      },
      getRadioVal() { 
          
          this.examQuestion.type = this.radio
          if(this.radio === 2){
            this.answer = '正确'
            this.examQuestion.answer = this.answer
          }
          else{
            this.answer = 'A'
            this.examQuestion.answer = this.answer
          }
      },
      getAnswer(){
          this.examQuestion.answer = this.answer
      },
      resetData(){
        this.examQuestion = {}
      },
      getQuestion(id){
      question.getQuestion(id)
        .then(response =>{
          this.examQuestion = response.data.examQuestion
          
        })
        .catch(error =>{

        })
       },
      addOrUpdateQuestion(){
        this.saveBtnDisabled = true
        if(!this.examQuestion.id){
          this.saveQuestion()
        }else{
          this.updateQuestion()
        }
      },
      updateQuestion(){
      question.updateQuestion(this.examQuestion)
        .then(response =>{
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$router.push({ path: '/exam/question/list' })
        })
      },
      saveQuestion() {
      question.addQuestion(this.examQuestion)
        .then(response => {
          return this.$message({
           type: 'success',
            message: '添加成功!'
          })
      }).then(resposne => {
        this.$router.push({ path: '/exam/question/list' })
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      })
    },
    
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>