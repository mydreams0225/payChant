<template>
    
    <section>
         <div class="parent">
             <div class="margin-tops clearF" >
                 <query :area="areas" @querys="queryflow"></query>
             </div>
              <div class="margin-tops">
               <el-table
                   v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="flowData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="sellersId"
                    label="商户编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="orderId"
                    label="内部订单号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="wxorderId"
                    label="微信订单号">
                    </el-table-column>
                    <el-table-column
                    prop="tradeChannel"
                    label="交易渠道">
                    </el-table-column>
                    <el-table-column
                    prop="tradeTime"
                    label="交易时间">
                    </el-table-column>
                    <el-table-column
                    prop="storeId"
                    label="店铺编号">
                    </el-table-column>
                     <el-table-column
                    prop="deviceNo"
                    label="设备号">
                    </el-table-column>
                    <el-table-column
                    prop="tradeMoney"
                    label="交易金额">
                    </el-table-column>
                    <el-table-column
                    prop="tradeStatus"
                    label="交易状态">
                    </el-table-column>
                    <el-table-column
                    prop="wxopenid"
                    label="微信openid">
                    </el-table-column>
                    <el-table-column
                    prop="wxsubopenid"
                    label="微信subopenid">
                    </el-table-column>
                     <el-table-column
                    prop="businessExId"
                    label="业务扩展员编号">
                    </el-table-column>
                    <el-table-column
                    prop="wxmemo"
                    label="微信返回的备注">
                    </el-table-column>
                </el-table>
           </div>
             <div class="margin-tops">
               <paging :total="totals" @handleCurrentChange="handleCurrentChanges"> </paging>
           </div>
         </div>
    </section>
</template>
<script>
import query from "@/components/query";
import paging from "@/components/paging";
import {
  reqFlow
} from "@/api/flowQuery";
export default {
  data() {
    return {
      loading: false,
      flowData: [{}],
      areas: {
        name: "", //内部订单号
        code: "" //商品编号
      },
      filters: {
        orderNo: "",
        codes: ""
      },
      totals: {
        totalNum: 15,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  mounted() {
    this.queryflow();
  },
  methods: {
    queryflow(name, code) {
      this.filters.orderNo = name;
      this.filters.codes = code;
      let para = {
        name: this.filters.orderNo || "",
        code: this.filters.orderNo || "",
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize
      };
      this.loading=true;
      reqFlow(para).then(res => {
        if (res.code === 1) {
            this.flowData=[];
            var list =res.list;
            list.forEach(item => {
                var temp={
                    sellersId:item.sellersId,
                    orderId:item.orderId,
                    wxorderId:item.wxorderId,
                    tradeChannel:item.tradeChannel,
                    tradeTime:item.tradeTime,
                    storeId:item.storeId,
                    deviceNo:item.deviceNo,
                    tradeMoney:item.tradeMoney,
                    tradeStatus:item.tradeStatus,
                    wxopenid:item.wxopenid,
                    wxsubopenid:item.wxsubopenid,
                    businessExId:item.businessExId,
                    wxmemo:item.wxmemo
                }
                this.flowData.push(temp);
            });
        }
        this.loading=false;
      });
    },
     handleCurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryflow(this.filters.orderNo, this.filters.codes);
    },
  },
  components: {
    query,
    paging
  }
};
</script>
<style>
.clearF::after {
  content: "";
  clear: both;
}
</style>


