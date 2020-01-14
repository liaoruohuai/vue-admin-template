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
      <el-table-column label="所属单位" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.UserName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="120" align="left">
        <template slot-scope="scope">
          {{ scope.row.UserPhone }}
        </template>
      </el-table-column>
      <el-table-column label="微信关联ID" min-width="500" align="left">
        <template slot-scope="scope">
          {{ scope.row.UserOpenId }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOperatorList } from '@/api/Operator'

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
      getOperatorList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
