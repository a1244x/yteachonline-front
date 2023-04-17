<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="输入需要搜索的课程名称" style="margin-bottom:30px;" />

    <el-tree
      ref="eduSubjectList"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {

  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created(){
      this.getAllSubjectList()
  },
  watch: {
    filterText(val) {
      this.$refs.eduSubjectList.filter(val)
    }
  },

  methods: {
    getAllSubjectList(){
        subject.getSubjectList()
            .then(response =>{
                this.data = response.data.list
            }) 
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>

