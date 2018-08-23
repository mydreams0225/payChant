<template>
    <div class="dialogArea">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        width="800px"
        >
                 <el-form label-position="right" label-width="160px" :model="baseinfo">
                    <el-form-item label="门店名称：">
                        <el-input v-model="baseinfo.storeName"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区：">
                        <el-cascader class="areaCascader" 

                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="baseinfo.area"
                                      @change="handleChange">
                                    </el-cascader>      
                    </el-form-item>
                    
                    <el-form-item label="详细地址：">
                        <el-input v-model="baseinfo.storeDetailAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input v-model="baseinfo.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input v-model="baseinfo.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="固定电话：">
                        <el-input v-model="baseinfo.fixedPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱：">
                        <el-input v-model="baseinfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="简介：">
                        <el-input v-model="baseinfo.abstracts"></el-input>      
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="baseinfo.memo"></el-input>      
                    </el-form-item>
                    </el-form>
                    <div class="btn">
                      <el-button @click="submit" type="success" size="medium">提交</el-button>
                    </div>     
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      area: configs.options,
      baseinfo: {
        storeName: "",
        area: [],
        storeDetailAddress: "",
        contacts:"",
        mobilePhone:"",
        fixedPhone:"",
        email:"",
        abstracts: "",
        memo: ""
      }
    };
  },
  props: {
    dialog: {
      title: "添加门店111",
      dialogVisible: false,
      loading: false,
      storeName: "1",
      area: "",
      baseinfo: {}
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    firstclick(name) {
      this.activeName = name;
    },
    submit() {
      console.log("add");
      console.log(this.baseinfo.area[2]);
      this.loading = true;
      this.baseinfo.storeName = this.dialog.storeName; //修改需要改变
      this.baseinfo.area[2] = this.dialog.area; //地区
      this.$emit("submit", this.baseinfo);
      this.loading = this.dialog.loading;
    },
    handleChange(value) {
      console.log(value || "");
    }
  }
};
</script>
<style >
.dialogArea .el-input,
.el-select,
.el-cascader {
  width: 350px;
}
.dialogArea .el-form-item {
  margin-bottom: 0px;
}
.dialogArea .btn {
  padding-left: 160px;
}
/* .dialogArea .el-select,.el-cascader{
      width:300px !important;
  } */
</style>