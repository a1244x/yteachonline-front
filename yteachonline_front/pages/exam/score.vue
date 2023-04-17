<template>
    <client-only>   
        <div class="body">
            <div class="main-title">
                <span style="user-select:none;">考试得分</span>
                <div class="bottom-span clearfix"></div>
                <span style="color:orange;user-select:none;">_____</span>
            </div>

            <div class="main">
                <span class="kstm-span">{{this.examName}}</span>
                <div class="bottom-span clearfix"></div>
                <ul class="span-ul">            
                    <li>
                        <span>姓名：{{this.userName}}</span>
                    </li>
                    <li>
                        <span>试卷分数：{{this.paperScore}}</span>
                    </li>
                    <li>
                        <span>题数：{{this.qsTotal}}</span>
                    </li>
                </ul>
                <div class="xhx-div"></div>
                <el-image :src="src" style="margin-top:20px"></el-image>
                <span class="score-span">{{this.score}}</span>
                <div class="bottom-span clearfix"></div>
                <span style="font-size:18px;font-family:'黑体'">本次考试得分{{this.score}},已经打败了全国{{this.percentage}}%的人</span>
                <div class="bottom-span clearfix"></div>
                <router-link :to="'/exam'">
                    <el-button type="primary" style="margin-top:20px">返回考试列表页面</el-button>
                </router-link>
            </div>
        </div>
    </client-only>
</template>

<script>
import scorePng from "@/assets/img/score.png";
import exam from '@/api/exam'

export default {
    data() {
      return {
        src: scorePng,
        examName:this.$route.query.examName,
        userName:this.$route.query.userName,
        examId:this.$route.query.examId,
        userId:this.$route.query.userId,
        paperScore:this.$route.query.paperScore,
        qsTotal:this.$route.query.qsTotal,
        percentage:null,
        score:null,
      }
    },
    created(){
        this.getFinalScore()
    },
    methods:{
        getFinalScore(){
            exam.getFinalScore(this.examId,this.userId)
                .then(response =>{
                    this.score = response.data.score
                    this.percentage = (this.score/this.paperScore)*100
                })

        }
    }
}
</script>



<style>
    .body{
        background-color: rgb(250, 250, 250);
        width: 100%;
        height: 800px;
        text-align: center;
    }
    .main-title{
        text-align: center;
        font-size: 48px;
        color: rgb(51, 62, 74);
        padding-top: 70px;
        font-family: '楷体';
    }
    .main{
        width: 60%;
        height: 420px;
        margin: auto;
        margin-top: 80px;
        padding: 60px 0px;
        background-color: white;
        border: 1px solid rgb(228, 228, 228);
        border-radius: 10px;
        color:transparent;
        text-shadow: 0 0 0 #000;
    }

    .kstm-span{
        font-size: 32px;
        font-family: '华文楷体';
    }

    .span-ul li{
        display: inline-block;
        padding: 0px 10px;
        font-size: 16px;
        font-family: '黑体';
    }

    .span-ul li:not(:last-child){
        border-right: 1px solid rgb(211, 211, 211);
    }

    .xhx-div{
        margin: auto;
        width: 80%;
        height: 25px;
        border-bottom: 1px solid rgb(230, 230, 230);
    }
    .score-span{
        position: absolute;
        color: rgb(235, 25, 25);
        font-size: 48px;
        font-family: '宋体';
        left: 49%;
        top: 65%;
    }

    .bottom {
        margin-top: 8px;
        line-height: 6px;
    }
    .bottom-span {
        margin-top: 13px;
        line-height: 12px;
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