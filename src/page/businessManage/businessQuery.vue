<template>
    <section>
       <div class="parent">
           <div class="margin-tops">
               <el-button type="success" size="medium" class="el-icon-plus">新增商户</el-button>
               <query :area="areas" @querys="queryBusiness"></query>
           </div>
           <div class="margin-tops">
               
           </div>
       </div>
    </section>
</template>
<script>
import query from "@/components/query";
import {reqBusiness} from '@/api/businessManage'
export default {
    data(){
        return{
          areas:{
              name:"商户名称",
              code:"商户编码"
          },
          filters:{
            names:"",
            codes:""
          }
          
        }
    },
    methods:{
        queryBusiness(name,code){
          this.filters.names=name;
          this.filters.codes=code;
          let para = {
              name:this.filters.names,
              code:this.filters.codes
          }
          reqBusiness(para).then(res=>{
              if(res.code===1){
                
              }else{

              }
          });
        }
    },
    components:{
       query //查询
    },

}
</script>
<style>
  
</style>


