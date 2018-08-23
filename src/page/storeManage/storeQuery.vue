<template>
    <section>
       <div class="parent">
           <div class="margin-tops">
               <el-button type="success" size="medium" class="el-icon-plus" @click="openStore">新增门店</el-button>
               <query :area="areas" @querys="queryStore"></query>
           </div>
            <!-- 展示区 -->
           <div class="margin-tops">
               <el-table
                   v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="storeData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="storeId"
                    label="门店编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="storeName"
                    label="门店名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="storeAddress"
                    label="门店地址">
                    </el-table-column>
                    <el-table-column
                    prop="storeDetailAddress"
                    label="详细地址">
                    </el-table-column>
                    <el-table-column
                    prop="contacts"
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="contactsPhone"
                    label="联系人手机">
                    </el-table-column>
                     <el-table-column
                    prop="contactsEmail"
                    label="邮箱">
                    </el-table-column>
                    <el-table-column
                    prop="abstracts"
                    label="简介">
                    </el-table-column>
                    <el-table-column
                    prop="memo"
                    label="备注">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="240">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini" class="el-icon-edit"></el-button>
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.storeId)"
                                type="danger"
                                class="el-icon-error"
                                size="mini"
                                >
                                </el-button>
                                <el-button @click="receiptCode(scope.row.url)" size="mini">收款码</el-button>
                            </template>
                     </el-table-column>
                </el-table>
           </div>
           <div class="margin-tops">
               <paging :total="totals" @handleCurrentChange="handleCurrentChanges"> </paging>
           </div>
           <storeDialog :dialog="dialog" @submit="submits"></storeDialog> 
           <el-dialog
            :visible.sync="receiptDialog.dialogVisible"
            width="800px">
             <div class="imgBox">
               <img :src="receiptDialog.url" alt="">
             </div>
           </el-dialog>
       </div>
    </section>
</template>
<script>
import query from "@/components/query";
import {
  reqStore,
  reqRemoveStore,
  reqEditStore,
  reqAddStore
} from "@/api/storeManage";
import paging from "@/components/paging";
import storeDialog from "@/components/storeDialog";
export default {
  data() {
    return {
      areas: {
        name: "门店名称",
        code: "门店编码"
      },
      filters: {
        names: "",
        codes: ""
      },
      totals: {
        totalNum: 15,
        pageSize: 10,
        currentPage: 1
      },
      storeData: [{url:"http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"}],
      loading: false,
      dialog: {
        title: "添加商户1",
        dialogVisible: false,
        loading: false
      },
      receiptDialog:{
        dialogVisible: false,
        url:"",
      }
    };
  },
  mounted() {
    this.queryStore();
  },
  methods: {
    queryStore(name, code) {
      this.filters.names = name;
      this.filters.codes = code;
      let para = {
        name: this.filters.names || "",
        code: this.filters.codes || "",
        currentPage:this.totals.currentPage,
        pageSize:this.totals.pageSize,
      };
      reqStore(para).then(res => {
        if (res.code === 1) {
          this.storeData = [];
          var list = res.list; //返回的list集合
          list.forEach(item => {
            var temp = {
              storeName: item.storeName,
              storeAddress: item.storeAddress,
              storeDetailAddress: item.storeDetailAddress,
              contacts: item.contacts,
              contactsPhone: item.contactsPhone,
              contactsEmail: item.contactsEmail,
              abstracts: item.abstracts,
              memo: item.memo
            };
            this.storeData.push(temp);
          });
          this.totals.totalNum = res.totalNum; //总条数
        } else {
          console.log("error");
        }
      });
    },
    //打开门店添加页面
    openStore() {
      this.dialog.dialogVisible = true;
      this.dialog.title = "添加门店";
      //   this.dialog.sellersName = "";
    },
    //改变当前页数
    handleCurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;

      this.queryStore(this.filters.names, this.filters.codes);
    },
    //编辑信息查看
    handleClick(row) {
      this.dialog;
      this.dialog.dialogVisible = true;
      this.dialog.title = "编辑门店信息";
      //   this.dialog.sellersName = row.sellersName;
    },
    //单行删除
    deleteRow(index, rowId) {
      let para = {
        storeId: rowId //门店编号
      };
      reqRemoveStore(para).then(res => {
        if (res.code === 1) {
        }
      });
      //   console.log("rows");
      //   console.log(rowId);
      //   rows.splice(index, 1);
    },
    
    submits(obj) {
      //   storeName: "",
      // area: [],
      // storeDetailAddress: "",
      // contacts:"",
      // mobilePhone:"",
      // fixedPhone:"",
      // email:"",
      // abstracts: "",
      // memo: ""
      let para = {
        storeName: obj.storeName,
        area: obj.area[2],
        storeDetailAddress: obj.storeDetailAddress,
        contacts: obj.contacts,
        mobilePhone: obj.mobilePhone,
        email: obj.email,
        abstracts: obj.abstracts,
        memo: obj.memo
      };
      if (this.dialog.title === "添加门店") {
        //添加请求
        // reqAddBusiness(para).then(res => {
        reqAddStore(para).then(res => {
          console.log(res);
        });
        // });
      } else {
        //修改请求
        reqEditStore(para).then(res => {});
      }
    },
    //收款码
    receiptCode(url){
         this.receiptDialog.dialogVisible=true;
         this.receiptDialog.url=url;
    },
  },
  components: {
    query, //查询
    paging,
    storeDialog
  }
};
</script>
<style>
.imgBox{
  text-align: center;

  width:100%;
  height: 700px;
}
.imgBox img{
 height: 100%;
 width: 100%;

}
</style>


