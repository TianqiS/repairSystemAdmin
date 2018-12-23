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
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.device_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用单位" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.use_unit }}
        </template>
      </el-table-column>
      <el-table-column label="序列号" >
        <template slot-scope="scope">
          {{ scope.row.serial_number }}
        </template>
      </el-table-column>
      <el-table-column label="使用地址" >
        <template slot-scope="scope">
          {{ scope.row.location }}
        </template>
      </el-table-column>
      <el-table-column label="维护人员" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="repair_time" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="设备状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status === 1? '正常' : '故障' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="repairDetail" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备编号" prop="deviceId">
          <el-input v-model="repairDetail.device_id"/>
        </el-form-item>
        <el-form-item label="报修用户" prop="userName">
          <el-input v-model="repairDetail.userInfo.name"/>
        </el-form-item>
        <el-form-item label="修理工人" prop="repairmanName">
          <el-select v-model="repairDetail.repairmanInfo.name" class="filter-item" placeholder="Please select">
            <el-option v-for="repairman in repairmanList" :key="repairman.staff_id" :label="repairman.name" :value="repairman.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="报修详情" prop="detail">
          <el-input v-model="repairDetail.detail"/>
        </el-form-item>
        <el-form-item label="报修时间" prop="repairTime">
          <el-input v-model="repairDetail.repair_time"/>
        </el-form-item>
        <el-form-item label="结束时间" prop="finishTime">
          <el-input v-model="repairDetail.finish_time"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceList, getRepairmanList } from '@/api/deviceList'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '-1': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      textMap: {
        update: 'Edit'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      repairDetail: {
        device_id: '',
        userInfo: {
          name: ''
        },
        repairmanInfo: {
          name: ''
        },
        detail: '',
        repair_time: '',
        finish_time: ''
      },
      repairmanList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDeviceList({}).then(response => {
        this.list = response.list
        this.listLoading = false
      })
      getRepairmanList({}).then(response => {
        this.repairmanList = response.repairmanList
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log(this.repairDetail)
        }
      })
    },
    handleUpdate(row) {
      this.repairDetail = Object.assign({}, this.repairDetail, { ...row })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
