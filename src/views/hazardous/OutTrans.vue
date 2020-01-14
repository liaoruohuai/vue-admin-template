<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="出库编号" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.OutTransId }}</span>
        </template>OutTransId
      </el-table-column>
      <el-table-column label="出库危废标签" width="500" align="left">
        <template slot-scope="scope">
          {{ scope.row.TagIdSum }}
        </template>
      </el-table-column>
      <el-table-column label="出库重量" width="100" align="left">
        <template slot-scope="scope">
          {{ scope.row.TWeight }}吨
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="出库时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.CrtTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联单编号" min-width="300" align="left">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.RelateNumber" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.RelateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="200">
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
import { getOutTransList } from '@/api/OutTrans'

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
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await getOutTransList()
      this.list = data.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.orginRelateNumber = v.RelateNumber //  will be used when user click the cancel botton
        return v
      })
      console.log(this.list)
      this.listLoading = false
    },
    cancelEdit(row) {
      row.RelateNumber = row.orginRelateNumber
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.orginRelateNumber = row.RelateNumber
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>
