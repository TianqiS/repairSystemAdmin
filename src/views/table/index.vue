<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="设备编号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.device_id }}
        </template>
      </el-table-column>
      <el-table-column label="报修用户" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userInfo.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修理工人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.repairmanInfo.name || '无' }}
        </template>
      </el-table-column>
      <el-table-column label="报修详情" >
        <template slot-scope="scope">
          {{ scope.row.detail }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="报修状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.log_status | statusFilter">{{ scope.row.log_status === 1? '已修复' : '维修中' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="repair_time" label="报修时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.repair_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="finish_time" label="结束时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.finish_time || '未完成' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        "1": 'success',
        // draft: 'gray',
        "-1": 'danger'
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
      getList({}).then(response => {
        console.log(response)
        this.list = response.list
        this.listLoading = false
      })
    }
  }
}
</script>
