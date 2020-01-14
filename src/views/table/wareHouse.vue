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
      <el-table-column label="所属单位" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column label="网关Id" width="500" align="left">
        <template slot-scope="scope">
          {{ scope.row.ApId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" min-width="200">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWareHouseList } from '@/api/WareHouse'

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
    async fetchData() {
      this.listLoading = true
      const { data } = await getWareHouseList()
      this.list = data.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

        return v
      })
      this.listLoading = false
    },
    confirmEdit(row) {
      row.edit = false

      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>
