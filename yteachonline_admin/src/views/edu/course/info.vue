<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">
        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <el-form-item label="课程类别">
            <el-select
                @change="subjectLevelOneChanged"
                v-model="courseInfo.subjectParentId"
                placeholder="请选择">
                <el-option
                v-for="subject in subjectOneList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
            <el-select v-model="courseInfo.subjectId" placeholder="请选择">
                <el-option
                    v-for="subject in subjectTwoList"
                    :key="subject.value"
                    :label="subject.title"
                    :value="subject.id"/>
            </el-select>
        </el-form-item>
        <!-- 课程讲师 TODO -->
        <el-form-item label="课程讲师">
            <el-select
                v-model="courseInfo.teacherId"
                placeholder="请选择">
                <el-option
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id"/>
            </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>

        <!-- 课程封面 TODO -->
        <el-form-item label="课程封面">
            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/eduoss/fileoss/upload'"
                class="avatar-uploader">
                <img :src="courseInfo.cover" style="max-width: 400px; max-height: 400px">
            </el-upload>
            点击图片可更换封面

        </el-form-item>


        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'

const defaultForm = {
  title: '',
  subjectId: '',
  subjectParentId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: '',
  price: 0,
  cover: process.env.OSS_PATH + '/cover/default.jpeg'
}

export default {
  components: { Tinymce },
  data() {
    return {
        BASE_API: process.env.BASE_API,
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseInfo: defaultForm,
        teacherList: [],
        subjectOneList: [],//一级分类列表
        subjectTwoList: [],//二级分类列表
        courseId:''
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.getinfo()
      } else {
        this.courseInfo = { ...defaultForm }
        this.initSubjectList(),
        this.getListTeacher()
      }
      
    },
    getinfo(){
      course.getCourseInfoById(this.courseId)
        .then(response=>{
          this.courseInfo = response.data.courseInfo
          //查询所有的分类
          subject.getSubjectList()
            .then(response=>{
                //获取一级分类
                this.subjectOneList = response.data.list
                //遍历一级分类
                for(var i = 0;i<this.subjectOneList.length;i++){
                  //获取每个一级分类
                  var oneSubject = this.subjectOneList[i]
                  //比较当前courseInfo里面de一级分类id和所有的一级分类id
                  if(this.courseInfo.subjectParentId == oneSubject.id){
                    //获取一级分类所有的二级分类
                    this.subjectTwoList = oneSubject.children
                  }
                }
            })
            this.getListTeacher()
        })
    },
    initSubjectList() {
        subject.getSubjectList().then(response => {
            this.subjectOneList = response.data.list
        })
    },
    subjectLevelOneChanged(value) {
        for (let i = 0; i < this.subjectOneList.length; i++) {
            if (this.subjectOneList[i].id === value) {
                this.subjectTwoList = this.subjectOneList[i].children
                this.courseInfo.subjectId = ''
            }
        }
    },
    getListTeacher(){
        course.getListTeacher()
            .then(response =>{
                this.teacherList = response.data.teachers
            })
    },
    addCourse(){
      course.addCourseInfo(this.courseInfo)
        .then(response =>{
            this.$message({
                type: 'success',
                message: '添加课程信息成功'
            });
            this.$router.push({ path: '/edu/course/chapter/'+(response.data.courseId) })
        })      
    },
    updateCourse(){
      course.updateCourseInfo(this.courseInfo)
        .then(response =>{
            this.$message({
                type: 'success',
                message: '修改课程信息成功'
            });
            this.$router.push({ path: '/edu/course/chapter/'+this.courseId})
        })        
    },
    saveOrUpdate() {
      if(!this.courseInfo.id){
        this.addCourse()
      }else{
        this.updateCourse()
      }
    },
    handleAvatarSuccess(res, file) {
        console.log(res)// 上传响应
        console.log(URL.createObjectURL(file.raw))// base64编码
        this.courseInfo.cover = res.data.url
    },

    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
        }   
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>