<template>
    <div class="dialogArea">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        width="800px"
        >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本资料" name="first">
                 <el-form label-position="right" label-width="160px" :model="baseinfo">
                    <el-form-item label="微信商户号：">
                        <el-input v-model="baseinfo.wxSellersNo"></el-input>
                    </el-form-item>
                    <el-form-item label="微信公众号-APPID：">
                        <el-input v-model="dialog.sellersAPPID"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input v-model="dialog.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱：">
                        <el-input v-model="baseinfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="固定电话：">
                        <el-input v-model="baseinfo.fixedPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input v-model="baseinfo.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="商户简称：">
                        <el-input v-model="baseinfo.sellersJC"></el-input>      
                    </el-form-item>
                    <el-form-item label="所在地区：">
                        <el-cascader class="areaCascader" 

                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="baseinfo.area"
                                      @change="handleChange">
                                    </el-cascader>      
                    </el-form-item>
                    </el-form>
                    <div class="btn">
                      <el-button @click="firstclick('second')" type="success" size="medium">下一步</el-button>
                    </div>
                
            </el-tab-pane>
            <el-tab-pane label="商户资料" name="second">
                 <el-form label-position="right" label-width="160px" :model="baseinfo">
                        <el-form-item label="商户名称：">
                            <!-- <el-input v-model="sellersInfo.sellersName"></el-input> -->
                            <el-input v-model="dialog.sellersName" ></el-input>
                        </el-form-item>
                        <el-form-item label="注册地址：">
                            <el-input v-model="sellersInfo.registAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="营业执照注册号：">
                            <el-input v-model="sellersInfo.businessLicenceNo"></el-input>
                        </el-form-item>
                        <el-form-item label="商户行业类型：">
                        <!-- <el-select v-model="sellersInfo.sellersTradeType" > -->
                            <el-select v-model="dialog.sellersTradeType" >
                        <el-option
                            v-for="item in sellersTradeType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="经营范围：">
                            <el-input v-model="sellersInfo.businessScope"></el-input>
                        </el-form-item>
                        <el-form-item label="经营期限：">
                            <el-date-picker
                                v-model="sellersInfo.operateTerm"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="组织机构代码/统一社会信用代码：">
                            <el-input v-model="sellersInfo.tycode"></el-input>      
                        </el-form-item>
                        <el-form-item label="营业期限：">
                            <el-date-picker
                                v-model="sellersInfo.businessTerm"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="证件持有人类型：">
                        <el-select v-model="sellersInfo.certifyHolderType" >
                        <el-option
                            v-for="item in certifyHolderType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="证件持有人姓名：">
                            <el-input v-model="sellersInfo.certifyHolderName"></el-input>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                        <el-select v-model="sellersInfo.certifyType" >
                        <el-option
                            v-for="item in certifyType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button @click="firstclick('first')" type="success" size="medium">上一步</el-button>
                    <el-button @click="firstclick('third')" type="success" size="medium">下一步</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="结算账号" name="third">
                <el-form label-position="right" label-width="160px" :model="settleAccount">
                    <el-form-item label="开户名称：">
                        <el-input v-model="settleAccount.accountName"></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行所在地区：">
                        <el-cascader class="areaCascader" 
                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="settleAccount.area"
                                      @change="handleChange">
                        </el-cascader>  
                    </el-form-item>
                    <el-form-item label="开户银行：">
                        <el-input v-model="settleAccount.accountOpenBank"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号：">
                        <el-input v-model="settleAccount.bankAccount"></el-input>
                    </el-form-item>
                </el-form>
                 <div class="btn">
                    <el-button @click="firstclick('second')" type="success" size="medium">上一步</el-button>
                    <el-button @click="firstclick('fourth')" type="success" size="medium">下一步</el-button>
                 </div>
            </el-tab-pane>
            <el-tab-pane label="附件" name="fourth">
                <el-form label-position="right" label-width="160px" :model="enclosure">
                    <el-form-item label="营业执照：">
                        <el-upload
                            class="avatar-uploader"
                            
                            action="https://adveross.oss-cn-shenzhen.aliyuncs.com/"
                            :show-file-list="false"
                            :http-request="businessLinseSuccess"
                            :before-upload="beforeAvatarUpload"
                            >
                            <img v-if="enclosure.businessLinseimgUrl" :src="enclosure.businessLinseimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="开户许可证：">
                        <el-upload
                            class="avatar-uploader"
                            action="https://adveross.oss-cn-shenzhen.aliyuncs.com/"
                            :show-file-list="false"
                            :on-success="openPermitSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="enclosure.openPermitimgUrl" :src="enclosure.openPermitimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="身份证人面照：">
                        <el-upload
                            class="avatar-uploader"
                            action="https://adveross.oss-cn-shenzhen.aliyuncs.com/"
                            :show-file-list="false"
                            :on-success="identityCardzSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="enclosure.identityCardzimgUrl" :src="enclosure.identityCardzimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="身份证国徽照：">
                        <el-upload
                            class="avatar-uploader"
                            action="https://adveross.oss-cn-shenzhen.aliyuncs.com/"
                            :show-file-list="false"
                            :on-success="identityCardfSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="enclosure.identityCardfimgUrl" :src="enclosure.identityCardfimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div class="btn">
                <el-button @click="firstclick('third')" type="success" size="medium">上一步</el-button>
                 <el-button @click="submit" type="success" size="medium" :loading="loading">提交</el-button>
                 </div>
            </el-tab-pane>
        </el-tabs>
        
        </el-dialog>
    </div>
</template>
<script>
import upload from '@/api/api'
export default {
    
  data() {
    return {
      loading:false,
      area: configs.options,
      sellersTradeType: businessObj.sellersTradeType,
      certifyHolderType: [], // 证件持有人类型
      certifyType: [], // 证件类型
      activeName: "first",
      baseinfo: {
        wxSellersNo: "",
        sellersAPPID: "",
        contacts: "",
        email: "",
        fixedPhone: "",
        mobilePhone: "",
        sellersJC: "", // 商户简称
        area: []
      },
      sellersInfo: {
        sellersName: "",
        registAddress: "",
        businessLicenceNo: "",
        sellersTradeType: "", // 商户行业类型
        businessScope: "", // 经营范围
        businessTerm: [new Date(2018, 10, 10), new Date(2018, 10, 11)], // 营业期限
        tycode: "", // 组织机构代码/统一社会信用代码,
        operateTerm: [], //经营期限,
        certifyHolderType: "",
        certifyHolderName: "",
        certifyType: ""
      },
      settleAccount: {
        accountName: "",
        area: [],
        accountOpenBank: "", // 开户银行
        bankAccount: ""
      },
      enclosure: {
        businessLinseimgUrl: "",
        openPermitimgUrl:"",// 开户许可证
        identityCardzimgUrl:"",// 身份证人面照
        identityCardfimgUrl:""
      }
    };
  },
  props: {
    dialog: {
      title: "添加商户",
      dialogVisible: false,
      loading:false,
      sellersName: "",
      sellersTradeType:"",
      sellersAPPID:"",
      contacts:""
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
      this.loading=true;
      this.sellersInfo.sellersName = this.dialog.sellersName; //修改需要改变 商户编号
      this.sellersInfo.sellersTradeType=this.dialog.sellersTradeType ; // 商户行业类型
      this.baseinfo.sellersAPPID=this.dialog.sellersAPPID; // 商户APPID
      this.baseinfo.contacts=this.dialog.contacts;//联系人
      
      this.$emit("submit", {baseinfo:this.baseinfo, sellersInfo:this.sellersInfo,settleAccount:this.settleAccount,enclosure:this.enclosure});
  this.loading=this.dialog.loading;
    },
    handleChange(value) {
      console.log(value || "");
    },
    //图片上传
    // businessLinseSuccess(res, file) {
    //   this.enclosure.businessLinseimgUrl = URL.createObjectURL(file.raw);

    //   console.log(this.enclosure.businessLinseimgUrl);

    businessLinseSuccess  (param) { //自定义文件上传
    debugger
    var fileObj = param.file;
    // 接收上传文件的后台地址
    var FileController = "https://adveross.oss-cn-shenzhen.aliyuncs.com/";
    // FormData 对象
    var form = new FormData();
    // 文件对象
    form.append("file", fileObj);
    // 其他参数
    // form.append("xxx", xxx);
    // XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.upload.addEventListener("progress", vm.progressFunction, false); //监听上传进度
    xhr.onload = function () {
       vm.Form.playUrl = 'https://adveross.oss-cn-shenzhen.aliyuncs.com/'
        // vm.Form.playUrl = xhr.response; //接收上传到阿里云的文件地址
        vm.$message({
            message: '恭喜你，上传成功!',
            type: 'success'
        });
    };
    xhr.send(form);
},
    // },

    openPermitSuccess(res, file) {
      this.enclosure.openPermitimgUrl = URL.createObjectURL(file.raw);
      console.log(this.enclosure.openPermitimgUrl);
    },
    identityCardzSuccess(res, file) {
      this.enclosure.identityCardzimgUrl = URL.createObjectURL(file.raw);
      console.log(this.enclosure.identityCardzimgUrl);
    },
    identityCardfSuccess(res, file) {
      this.enclosure.identityCardfimgUrl = URL.createObjectURL(file.raw);
      console.log(this.enclosure.identityCardfimgUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 78px;
  display: block;
}
/* .dialogArea .el-select,.el-cascader{
      width:300px !important;
  } */
</style>