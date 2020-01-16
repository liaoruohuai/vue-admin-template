<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="list.zetagid"
        placeholder="ZETagId"
        style="width: 200px;lett"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        oninput="value=value.replace(/[^0-9A-Z]/g,'');"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
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
      <el-table-column label="ZETagId" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ZetagId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="危废类型" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.HwType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="危废代码" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.HwCode }}
        </template>
      </el-table-column>
      <el-table-column label="危废名称" width="100" align="left">
        <template slot-scope="scope">
          {{ scope.row.HwName }}
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100" align="left">
        <template slot-scope="scope">
          {{ scope.row.HwWeight }}Kg
        </template>
      </el-table-column>
      <el-table-column label="存储形态" width="100" align="left">
        <template slot-scope="scope">
          {{ scope.row.HwStorage }}
        </template>
      </el-table-column>
      <el-table-column label="贮存仓库" width="100" align="left">
        <template slot-scope="scope">
          {{ scope.row.HwWareHouse }}
        </template>
      </el-table-column>
      <el-table-column label="产废单位" width="100" align="left">
        <template slot-scope="scope">
          {{ scope.row.UserCompany }}
        </template>
      </el-table-column>
      <el-table-column label="操作员" width="80" align="left">
        <template slot-scope="scope">
          {{ scope.row.UserName }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.State | statusFilter">{{ scope.row.State|statusTranslate }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="入库时间" width="170">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.CrtTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="出库时间" width="170">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.OutProduceTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="开始运输时间" width="170">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.BeginTranTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHwList } from '@/api/hazardous'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '00': 'warning',
        '01': 'gray',
        '02': 'danger',
        '10': 'gray',
        '11': 'danger',
        '20': 'info',
        '21': 'success',
        '22': 'danger'
      }
      return statusMap[status]
    },
    statusTranslate: function(status) {
      const statusMap = {
        '00': '待运输未出库',
        '01': '待运输已出库',
        '02': '待运输丢失', // （曾有关联产废AP，然后丢失）
        '10': '运输中', // （只关联运输AP）
        '11': '运输中丢失', // （曾有关联运输AP，然后丢失）
        '20': '待处置运输中', // （同时关联上处置单位仓库AP和车辆AP）
        '21': '待处置在库', // （只关联处置仓库）
        '22': '待处置丢失'// （曾有处置仓库连接记录，最终丢失连接）
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
        this.originlist = response.data
        this.listLoading = false
      })
    },
    handleFilter() {
      const data = this.originlist
      const target = this.list.zetagid
      if (target) {
        let tmplist = []
        data.forEach(function(item, index) {
          if (item.ZetagId.includes(target)){
            console.log(item.ZetagId)
            tmplist.push(item)
          }
        })
        console.log(tmplist.length)
        if (tmplist.length > 0 ){
          this.list = tmplist
        }

      } else{
        this.fetchData()
      }
    }
  }
}
</script>
