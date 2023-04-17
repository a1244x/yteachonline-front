<template>
    <div>       
        <client-only>
            <el-row>
                <el-col :span="8" v-for="item in examExam" :key="item.id" :offset="total > 0 ? 1 : 1" style="width:420px;padding:20px 0px" >
                    <div > 
                      <el-card :body-style="{ padding: '0px' }" > 
                      <img src="https://www.gzdcwk.com/uploads/allimg/210701/1-210F1112543R9.jpg" class="image">
                          <div style="padding: 14px;">
                              <span>考试名称：{{item.name }}</span>
                              <span class="right">考试状态：{{item.state}}</span>
                              <div class="bottom clearfix"></div>
                              <span>考试位置：{{item.room}}</span>
                              <div class="bottom clearfix"></div>
                              <span>考试时间：{{item.startTime}} 至 {{item.endTime}}</span>
                                    
                                  <el-button type="text" class="button" v-if="item.state === '已开始'" @click="checkExamIdAndUserId(item.id)">进行考试</el-button>
                               
                          </div>        
                      </el-card>
                    </div>
                </el-col>
            </el-row>
        </client-only>
    </div>    
    
</template>


<script>
import exam from '@/api/exam'
import cookie from 'js-cookie'

export default {
  data() {
    return {
      examExam:[],
      total:null,
      userId:null,
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    };
  },
  created() {
        this.getExamList()
        this.getUser()
  },

  methods: {
      getExamList(){        
          exam.getExamList()
            .then(response =>{
                this.examExam = response.data.rows
                this.total = response.data.total
            })
      },
      getUser(){
        var userStr = cookie.get("yt_ucenter");
        //alert(jsonStr)
        if (userStr) {
          this.loginInfo = JSON.parse(userStr)
          this.userId = this.loginInfo.id
        }
      },
      checkExamIdAndUserId(examId){
          if(this.loginInfo.id != ''){
            exam.checkExamIdAndUserId(examId,this.userId)
            .then(response =>{
              this.$router.push('/exam/' + examId);
              this.$notify({
                title: '进入考试成功',
                message: '',
                type: 'success'
              });
            })
            .catch(error =>{
              this.$notify.error({
                title: '进入考试失败',
                message: '你已考过此次考试！不允许重复考试'
              });
            })
          }else{
             this.$alert('请登录后再进行考试！', '尚未登录！', {
              confirmButtonText: '跳转到登录页面',
              callback: action => {
                this.$router.push('/login');
              }
            });
          }

          
      }
  }
}
</script>



<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  .right{
      float: right;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
