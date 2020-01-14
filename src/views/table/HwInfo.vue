<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="危废类型" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Htype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="危废代码" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.Hcode }}
        </template>
      </el-table-column>
      <el-table-column label="危废内容" min-width="500" align="left">
        <template slot-scope="scope">
          {{ scope.row.Hdesc }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHwList } from '@/api/HwInfo'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getHwList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
