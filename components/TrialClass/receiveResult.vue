<template>
  <el-dialog
      title="免费领取体验课"
      :visible.sync="dialogShow"
      @open="open"
      :before-close="close"
      :close-on-click-modal="false"
      width="543px"
  >
    <div class="container">
      <img src="@/assets/img/eClassIcon.png" class="icon" alt=""/>
      <div class="title">恭喜您，领取成功！</div>
      <div class="tip">请联系课程顾问，顾问会给您安排1V1教学老师~</div>
      <a :href="`${BASE_PATH}/student/home/learning-hall`" @click="close">
        <div class="btn">返回学习大厅，联系课程顾问</div>
      </a>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReceiveResult',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      BASE_PATH: process.env.BASE_PATH
    }
  },
  computed:{
    dialogShow: {
      get() {
        return this.showDialog;
      },
      set(newVal) {
        this.$emit("update:showDialog", newVal);
      },
    },
  },
  methods: {
    close() {
      this.dialogShow=false
    },
    open(){
      this.dialogShow=true
    }
  }
}
</script>

<style scoped lang="scss">
  ::v-deep .el-dialog__body {
    padding: 20px 40px 28px;
    border-radius: 0 0 24px 24px;
  }

  ::v-deep .el-dialog__header {
    border-radius: 24px 24px 0 0;
    padding: 40px 40px 0;
  }

  ::v-deep .el-dialog__title {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
  }

  ::v-deep .el-dialog__headerbtn {
    right: 40px;
    top: 40px;
    color: #cccccc;
  }

  ::v-deep .el-dialog {
    border-radius: 24px;
  }

  .icon {
    width: 123px;
    height: 95px;
    display: block;
    margin: auto;
    margin-top: 30px;
  }

  .title {
    margin-top: 18px;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 19px;
    text-align: center;
  }

  .tip {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
    text-align: center;
  }

  .btn {
    cursor: pointer;
    width: 340px;
    height: 44px;
    background: #0087ff;
    border-radius: 8px 8px 8px 8px;
    margin: 27px auto 0;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    line-height: 44px;
    text-align: center;
  }
</style>
