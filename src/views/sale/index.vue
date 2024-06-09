<template>
  <div>
    <el-row style="margin-top: 50px">
      <el-col :span="24">
        <el-table
          :data="productList"
          style="width: 100%"
        >
          <el-table-column
            label="商品名"
            width="350"
          >
            <template v-slot="scope">
              <el-popover trigger="hover" placement="top">
                <p>商品描述: {{ scope.row.productDesc }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.productName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            width="350"
          >
            <template v-slot="scope">
              <span style="margin-left: 10px">{{ scope.row.quota }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            width="350"
          >
            <template v-slot="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
          >
            <template v-slot="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Sale } from '@/api/Sale'

export default {
  name: 'Sale',
  data() {
    return {
      productList: [
        {
          productName: null,
          price: null,
          productDesc: null,
          quota: null,
          productId: null
        }
      ],
      dialogVisible: false,
      payContent: ''
    }
  },
  created() {
    Sale.getProductList().then(res => {
      console.log(res.data)
      this.productList = res.data.data
    })
  },
  methods: {
    handleEdit: function(index, row) {
      console.log(index, row)
      Sale.createPayOrder({ productId: row.productId }).then(res => {
        this.$message.success('下单成功，请扫码支付')
        console.log(res.data)
        localStorage.removeItem('callbackHTML')
        localStorage.setItem('callbackHTML', res.data.data)
        const newWin = window.open('', '_blank')
        newWin.document.write(localStorage.getItem('callbackHTML'))
        newWin.document.close()
      }).catch(() => {
        this.$message.error('下单失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
