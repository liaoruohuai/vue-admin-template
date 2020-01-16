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
      <el-table-column label="联单编号" width="300" align="left">
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
      <el-table-column align="left" label="Actions" min-width="200">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            round
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            round
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
          <el-button
            v-if="row.isTran"
            type="success"
            round
            size="small"
            icon="el-icon-view"
            @click="showMap(row)"
          >
            运输实时监控
          </el-button>
          <el-button
            v-if="row.haveTran"
            type="warning"
            round
            size="small"
            icon="el-icon-video-camera"
            @click="showMap(row)"
          >
            运输路线回放
          </el-button>
        </template>
      </el-table-column>

      <el-dialog :visible.sync="dialogMapVisible" custom-class="customWidth" title="运输实时监控" :append-to-body="true">
        <template>
          <baidu-map
            class="map"
            :center="center"
            :zoom="zoom"
            @ready="mapReady"
          >
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
            <bm-marker v-if="showNow" :position="now" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
              <bm-label content="当前位置" :label-style="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
            </bm-marker>
            <bm-polyline v-if="showLine" :path="polylinePath" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="5" :editing="true" @lineupdate="updatePolylinePath" />
          </baidu-map>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogMapVisible = false">Confirm</el-button>
        </span>
      </el-dialog>

    </el-table>
  </div>
</template>

<script>
import { getOutTransList, getBdGeo } from '@/api/OutTrans'

export function translateCallback(data) {
  if (data.status === 0) {
    console.log(data.points[0])
  }
}

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
      listLoading: true,
      dialogMapVisible: false,
      center: { lng: 0, lat: 0 },
      now: { lng: 0, lat: 0 },
      showNow: false,
      showLine: false,
      polylinePath: [
        { lng: 121.37074, lat: 31.056627 },
        { lng: 121.37075, lat: 31.056644 },
        { lng: 121.37092, lat: 31.057407 },
        { lng: 121.410545, lat: 31.02709 },
        { lng: 121.42347, lat: 31.031202 },
        { lng: 121.42448, lat: 31.03152 },
        { lng: 121.452736, lat: 30.97793 },
        { lng: 121.46526, lat: 30.846714 },
        { lng: 121.44754, lat: 30.818958 },
        { lng: 121.44648, lat: 30.818216 }
      ],
      zoom: 3
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
        v.isTran = true
        if (v.OutTransId === '1578041338' || v.OutTransId === '1578375435') {
          v.haveTran = true
        } else {
          v.haveTran = false
        }
        if (v.OutTransId === '1578037711') {
          v.nowLoc = { lng: 121.399138, lat: 31.165005 }
          v.isTran = true
        } else {
          v.isTran = false
        }

        if (v.OutTransId === '1578041338') {
          v.nowLoc = { lng: 121.452736, lat: 30.97793 }
        }
        if (v.OutTransId === '1578375435') {
          v.nowLoc = { lng: 121.452736, lat: 30.97793 }
          v.haveTran = true
        }

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
    },
    showMap(row) {
      this.dialogMapVisible = true
      // const Lat = 31.055882
      // const Lng = 121.370834
      this.showNow = row.isTran
      this.showLine = row.haveTran
      getBdGeo({ lng: row.nowLoc.lng.toString(), lat: row.nowLoc.lat.toString() }).then(response => {
        response.data.map(v => {
          console.log(v.Lat, v.Lng)
          this.center.lat = v.Lat
          this.center.lng = v.Lng
          this.now.lat = v.Lat
          this.now.lng = v.Lng
          this.zoom = 12
        })
      })
    },
    mapReady({ BMap, map }) {
      this.zoom = 13
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath()
    }
  }
}
</script>

<style>
  .map {
    width: 1400px;
    height: 800px;
  }
  .customWidth{
    width: 1450px;
    height:900px;
    position: absolute;
    margin: 0;
    top:-15%;
    left:10%
  }
</style>
