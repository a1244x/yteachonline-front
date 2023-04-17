<template>
    <div>
        <client-only>
            <el-container>
            <el-header>考试</el-header>
                <el-container>
                    <el-aside width="260px">
                        <div>
                            <span class="examNameCss">{{examExam.name}}</span>
                            <div class="bottom clearfix"></div>
                            <div style="display: inline-block; border:solid 2px;padding:10px 5px;">
                                <el-statistic :value="deadline2" time-indices title="" format="HH:mm:ss">
                                    <template slot="prefix">考试时间：</template>
                                </el-statistic>
                            </div>
                            <div class="bottom clearfix"></div>
                            <span>用户名：{{loginInfo.nickname}}</span>
                            <div class="bottom clearfix"></div>
                            <span>题量：{{qsTotal}}</span>
                            <div class="bottom clearfix"></div>
                            <span>分数：{{examPaper.score}}</span>
                            <div class="bottom clearfix"></div>
                            <span>考试时间：{{examExam.startTime}} 至 {{examExam.endTime}}</span>
                        </div>
                    </el-aside>

                    <el-container>
                    <el-main>
                      <div v-for="(item,index) in question" :key="item.id" v-show="index==idx">
                        <div v-if="item.type === 1">
                          <el-tag type="info">单选题</el-tag>
                          <span style="font-size:18px">{{index+1}}.{{item.name}}</span>
                          <div class="bottom clearfix"></div>
                          <el-radio-group v-model="radioPick[index]">
                            <el-radio :value="index" label="A" @change="get_radio_value('A',index,true,item.id)">选项A：{{item.optionA}}</el-radio>
                            <div class="bottom clearfix"></div>
                            <el-radio :value="index" label="B" @change="get_radio_value('B',index,true,item.id)">选项B：{{item.optionB}}</el-radio>
                            <div class="bottom clearfix"></div>
                            <el-radio :value="index" label="C" @change="get_radio_value('C',index,true,item.id)">选项C：{{item.optionC}}</el-radio>
                            <div class="bottom clearfix"></div>
                            <el-radio :value="index" label="D" @change="get_radio_value('D',index,true,item.id)">选项D：{{item.optionD}}</el-radio>
                          </el-radio-group>
                          <div class="bottom clearfix"></div>
                        </div>

                        <div v-if="item.type === 2" style="height:326px;">
                          <el-tag type="info">判断题</el-tag>
                          <span style="font-size:18px">{{index+1}}.{{item.name}}</span>
                          <div class="bottom clearfix"></div>
                          <el-radio-group v-model="radioJudge[index]">
                            <el-radio v-model="radioJudge" label="对" @change="get_radio_value('对',index,true,item.id)">对</el-radio>
                            <div class="bottom clearfix"></div>
                            <el-radio v-model="radioJudge" label="错" @change="get_radio_value('错',index,true,item.id)">错</el-radio> 
                          </el-radio-group>   
                        </div>

                        <div v-if="item.type === 3"> 
                          <el-tag type="info">问答题</el-tag>
                          <span style="font-size:18px">{{index+1}}.{{item.name}}</span>
                          <div class="bottom clearfix"></div>
                          <el-form> 
                            <el-form-item label="答题">
                                <tinymce v-model="answers[index]" style="width:600px;height:180px" />
                                <el-button type="success" @click="saveAnswer(answers,index,item.id)" style="position: relative;left:70%;padding:30px 30px;">保存答案</el-button>
                            </el-form-item>
                            
                          </el-form>
                        </div>  
                        
                      
                      <div class="button-class">
                        <el-button type="primary" @click="back()" :disabled="idx == 0 ? true : false">上一题</el-button>
                        <el-button type="primary" @click="next()" :disabled="idx == question.length - 1 ? true : false">下一题</el-button>
                      </div>
                      
                      </div> 
                    </el-main>
                    </el-container>

                    <el-aside class="right-aside">
                      <h2 style="font-weight:bold;color:black;">| 答题卡</h2> 
                      <div class="bottom clearfix"></div>
                      <h3>1.单选题</h3>   
                      <div v-for="(item,index) in question" :key="index" style="display:inline-block;">
                        <div v-if="item.type === 1">
                          <el-button class="qs-btn-class" @click="jumpIndex(index)" circle>{{index+1}}</el-button>
                        </div>
                      </div>

                      <h3>2.判断题</h3>     
                      <div v-for="(item,index) in question" :key="item.id" style="display:inline-block;">
                        <div v-if="item.type === 2">
                          <el-button class="qs-btn-class" @click="jumpIndex(index)" circle>{{index+1}}</el-button>
                        </div>
                      </div>

                      <h3>3.问答题</h3> 
                      <div v-for="(item,index) in question" :key="item.name" style="display:inline-block;">
                        <div v-if="item.type === 3">
                          <el-button class="qs-btn-class" @click="jumpIndex(index)" circle>{{index+1}}</el-button>
                        </div>
                      </div>


                      <el-button class="tj-btn" type="primary" @click="addAnswer()" round>交卷</el-button>
                    </el-aside>

                </el-container>
            </el-container>
        </client-only>
    </div>
</template>

<script>

import exam from '@/api/exam'
import Tinymce from '@/components/Tinymce'
import cookie from 'js-cookie'

export default {
    components: { Tinymce },
    data() {
        return{
            paperAnswer:[],
            answers:[''],
            examPaper:{},
            examExam:{},
            question:[],
            deadline2: null,
            qsTotal:null,
            radioPick:['E'],
            radioJudge:['无'],
            idx:0,
            questionAnswer:[],
            examId:'',
            userId:null,
            loginInfo: {
              id: '',
              nickname: '',
            }
        }
    },
    created(){
        this.init()
        this.getUser()
    },
    methods:{
        init(){
          if (this.$route.params || this.$route.params.id) {
            const id = this.$route.params.vid
            this.getExamList(id)
            this.getByExamId(id)
            this.examId = id
            }else{
                console.log("错误")
            }
        },
        getUser(){
          var userStr = cookie.get("yt_ucenter");
          //alert(jsonStr)
          if (userStr) {
            this.loginInfo = JSON.parse(userStr)
            this.userId = this.loginInfo.id
          }
        },
        getExamList(id){        
          exam.getExamId(id)
            .then(response =>{
                this.examExam = response.data.examExam
            })
      },


       get_radio_value(type,index,boolean,id) {
      // 获取当前radio当前值
        this.$set(this.radioPick,index,type)
        this.paperAnswer[index,id] = this.radioPick[index]
      },

      saveAnswer(answers,index,id){
        this.paperAnswer[index,id] = this.answers[index]
      },


      getByExamId(id){
        exam.getByExamId(id)
          .then(response =>{
            this.examPaper = response.data.examPaper
            this.getPaperQuestion(this.examPaper.id)
            this.deadline2 = Date.now() + 1000 * 60 * this.examPaper.duration
          }).catch((response) => {
            this.$alert('尚未设置试卷！请通知老师设置试卷', '错误！', {
                confirmButtonText: '返回',
                callback: action => {
                  this.$router.push({ path:'/exam'})
                }
              });
          })
      },
      getPaperQuestion(id){
        exam.getPaperQuestion(id)
          .then(response =>{
            this.question = response.data.question
            this.qsTotal = response.data.total
          })
      },
      jumpIndex(index){
        this.idx = index
      },
      
      next(){
        this.idx++
      },
      back(){
        this.idx--
      },
      addAnswer(){
        for( var i in this.paperAnswer){
           this.questionAnswer.push({examId:this.examId,questionId:i,answer:this.paperAnswer[i],userId:this.userId})
        }

         exam.addAnswer(this.questionAnswer)
          .then(response =>{
            this.$confirm('是否查看分数, 是否继续?', '交卷成功！', {
              confirmButtonText: '查看考试分数',
              cancelButtonText: '返回考试列表页面',
              type: 'warning'
            }).then(() => {
              this.$router.push({path:'/exam/score',query:{examName:this.examExam.name,userName:this.loginInfo.nickname,examId:this.examId,userId:this.userId,paperScore:this.examPaper.score,qsTotal:this.qsTotal}});
              this.$message({
                type: 'success',
                message: '进入查看分数页面!'
              });
            }).catch(() => {
              this.$router.push('/exam');
              this.$message({
                type: 'info',
                message: '已返回考试列表页面'
              });          
            });
          })   
      }
    },
}
</script>




<style>
  .el-header{
    background-color: rgb(58,67,87);
    color: rgb(168,168,179);
    text-align: center;
    line-height: 60px;
    font-size:18px;
  }

  .examNameCss{
      font-size: 18px;
      color: black;
      position: relative;
  }
  
  .el-aside {
    background-color: rgb(247, 248, 250);
    color: rgb(138,139,153);
    top: 10px;
    padding: 20px 30px;
    font-size: 14px;
  }
  .right-aside{
    background-color: rgb(252, 252, 252);
  }
  
  .el-main {
    background-color: rgb(255,255,255);
    color: #333;
    text-align: left;
    height: 600px;
    line-height: 20px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .bottom {
    margin-top: 16px;
    line-height: 12px;
  }

  .right{
    margin-right: 16px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  } 
  
  .el-radio{
    font-size: 30px;
    padding: 10px 20px;
    width: 80%;
  }

  .el-radio:hover{
    background-color: rgb(245, 243, 243);
  }

  .button-class{
    width: 200px;
    position: relative;
    bottom: -150px;
    left: 70%;
  }

  .qs-btn-class{
    width:35px;
    height:35px;
    margin: 8px;
  }

  .tj-btn{
    position: relative;
    bottom:-200px;
    left:5%;
    width: 100px;
  }

</style>

