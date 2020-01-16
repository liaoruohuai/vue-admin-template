<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="所属单位" prop="company">
          <el-select v-model="temp.Company" class="filter-item" placeholder="Please select">
            <el-option v-for="item in CompanyList" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.Name" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.Phone" type="text" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getOperatorList } from '@/api/Operator'

const CompanyList = [
  { key: '01', display_name: '仪电' },
  { key: '02', display_name: '奕茂' }
]

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return CompanyList[type]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      CompanyList: [
        { key: '01', display_name: '仪电' },
        { key: '02', display_name: '奕茂' }
      ],
      temp: {
        id: undefined,
        Company: undefined,
        Name: '',
        UserBind: 'N',
        Phone: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
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
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        Company: undefined,
        Name: '',
        UserBind: 'N'
      }
    }
  }
}
</script>
