<template>
    <section>
       <div class="parent">
           <div class="margin-tops">
               <el-button type="success" size="medium" class="el-icon-plus" @click="openBusiness">新增商户</el-button>
               <query :area="areas" @querys="queryBusiness"></query>
           </div>
           <!-- 展示区 -->
           <div class="margin-tops">
               <el-table
                   v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="businessData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="sellersId"
                    label="商户编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="sellersName"
                    label="商户名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="sellersTradeType"
                    label="商户行业类型">
                    </el-table-column>
                    <el-table-column
                    prop="sellersAPPID"
                    label="商户APPID">
                    </el-table-column>
                    <el-table-column
                    prop="contacttMethod"
                    label="联系方式">
                    </el-table-column>
                    <el-table-column
                    prop="contacts"
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建日期">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="180">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini" class="el-icon-edit"></el-button>
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.sellersId)"
                                type="danger"
                                class="el-icon-error"
                                size="mini"
                                >
                                </el-button>
                            </template>
                     </el-table-column>
                </el-table>
           </div>
           <div class="margin-tops">
               <paging :total="totals" @handleCurrentChange="handleCurrentChanges"> </paging>
           </div>
           <businessDialog :dialog="dialog" @submit="submits"></businessDialog>   
       </div>
    </section>
</template>
<script>
import query from "@/components/query";
import {
  reqBusiness, // 查询请求
  reqAddBusiness, // 添加请求
  reqEditBusiness // 修改请求
} from "@/api/businessManage";
import paging from "@/components/paging"; // 引入分页组件
import businessDialog from "@/components/businessDialog"; // 引入添加修改弹出界面

export default {
  data() {
    return {
      loading: true, // 展示区加载中
      //// 父组件传给子组件
      areas: {
        name: "商户名称",
        code: "商户编码"
      },
      filters: {
        names: "",
        codes: ""
      },
      totals: {
        totalNum: 12,
        pageSize: 10,
        currentPage: 1
      },
      businessData: [
        {
          sellersId: "1",
          sellersName: "gg",
          sellersTradeType: "行业2",
          sellersAPPID: "appid",
          contacts:"zlz"
        }
      ],
      dialog: {
        title: "",
        dialogVisible: false,
        sellersName: "",
        sellersTradeType: "",
        sellersAPPID: "", //父传子
        contacts: "",
        loading: false
      }
    };
  },
  mounted() {
    this.queryBusiness(this.filters.names, this.filters.codes);
  },
  methods: {
    //打开商户添加页面
    openBusiness() {
      this.dialog.dialogVisible = true;
      this.dialog.title = "添加商户列表";
      this.dialog.sellersName = "";
      this.dialog.sellersTradeType = "";
      this.dialog.sellersAPPID = "";
      this.dialog.contacts = "";
    },
    //查询
    queryBusiness(name, code) {
      this.filters.names = name;
      this.filters.codes = code;
      let para = {
        name: this.filters.names,
        code: this.filters.codes
      };
      this.loading = false;
      reqBusiness(para).then(res => {
        if (res.code === 1) {
        } else {
        }
      });
    },
    //改变当前页数
    handleCurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryBusiness(this.filters.names, this.filters.codes);
    },
    //单行删除
    deleteRow(index, rowId) {
      console.log("rows");
      console.log(rowId);
      rows.splice(index, 1);
    },
    //编辑信息查看
    handleClick(row) {
      this.dialog;
      this.dialog.dialogVisible = true;
      this.dialog.title = "修改商户列表";

      this.dialog.sellersName = row.sellersName;
      this.dialog.sellersTradeType = row.sellersTradeType;
      this.dialog.sellersAPPID = row.sellersAPPID;
      this.dialog.contacts = row.contacts;
    },
    // 子组件传给父组件
    submits(obj) {
      console.log("obj1");
      console.log(obj);

      let para = {
        // 基本信息
        wxSellersNo: obj.baseinfo.wxSellersNo,
        sellersAPPID: obj.baseinfo.sellersAPPID,
        contacts: obj.baseinfo.contacts,
        email: obj.baseinfo.email,
        fixedPhone: obj.baseinfo.fixedPhone,
        mobilePhone: obj.baseinfo.mobilePhone,
        sellersJC: obj.baseinfo.sellersJC,
        businessArea: obj.baseinfo.area,
        //商户信息
        sellersName: obj.sellersInfo.sellersName,
        registAddress: obj.sellersInfo.registAddress,
        businessLicenceNo: obj.sellersInfo.businessLicenceNo,
        sellersTradeType: obj.sellersInfo.sellersTradeType, // 商户行业类型
        businessScope: obj.sellersInfo.businessScope, // 经营范围
        businessTerm: obj.sellersInfo.businessTerm, // 营业期限
        tycode: obj.sellersInfo.tycode, // 组织机构代码/统一社会信用代码,
        operateTerm: obj.sellersInfo.operateTerm, //经营期限
        certifyHolderType: obj.sellersInfo.certifyHolderType,
        certifyHolderName: obj.sellersInfo.certifyHolderName,
        certifyType: obj.sellersInfo.certifyType,
        //结算账号
        accountName: obj.settleAccount.accountName,
        openAccountArea: obj.settleAccount.area,
        accountOpenBank: obj.settleAccount.accountOpenBank,
        bankAccount: obj.settleAccount.bankAccount,
        //附件
        businessLinseimgUrl: obj.enclosure.businessLinseimgUrl,
        openPermitimgUrl: obj.enclosure.openPermitimgUrl,
        identityCardfimgUrl: obj.enclosure.identityCardfimgUrl,
        identityCardzimgUrl: obj.enclosure.identityCardzimgUrl
      };
      console.log(para);
      if (this.dialog.title === "添加商户列表") {
        //添加请求
        reqAddBusiness(para).then(res => {});
      } else {
        //修改请求
        reqEditBusiness(para).then(res => {});
      }
      this.dialog.loading = false;
    }
  },

  components: {
    query, //查询
    paging,
    businessDialog
  }
};
</script>
<style>
</style>


