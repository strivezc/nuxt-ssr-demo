<template>
  <el-dialog
    title="免费领取体验课"
    :visible.sync="dialogShow"
    @open="open"
    :before-close="close"
    :close-on-click-modal="false"
    width="591px"
    top="10vh"
  >
    <div>
      <div class="top-wrap">
        <div class="title">1、选择适合您的英语基础</div>
        <div class="block-wrap">
          <div
            v-for="item in levelList"
            :key="item.thinkLevel"
            @click="clickLevel(item)"
            :class="item.thinkLevel === activeIndex ? 'active' : ''"
            :style="{ height: `${26 + item.thinkLevel * 10}px` }"
            class="item"
          >
            <div class="my-level" v-if="item.thinkLevel === activeIndex">我的水平</div>
            <div class="bottom-line" v-if="item.thinkLevel === activeIndex"></div>
            <div class="num" :class="item.thinkLevel === activeIndex ? 'num-active' : ''">{{ item.thinkLevel }}</div>
          </div>
        </div>
        <div class="tip">{{ text }}</div>
      </div>
      <div class="bottom-wrap">
        <div class="title">2、选择上课时间：{{ dateTime }} {{ selectWeek }}</div>
        <div class="date-wrap">
          <div
            class="item"
            :class="item.classDate === dateTime ? 'active-item' : ''"
            @click="changeDateTime(item)"
            v-for="item in classDateAndWeeks"
            :key="item.week"
          >
            <div class="date">
              {{ item.classDate ? item.classDate.slice(-2) : '' }}
            </div>
            <div class="week">周{{ week[item.week - 1] }}</div>
          </div>
        </div>
        <div class="time-wrap">
          <div
            class="item"
            :class="{ active: selectTime === item.time, disabled: isDisabledTime(item.time) }"
            v-for="item in timeData"
            @click="changeTime(item)"
            :key="`${dateTime} ${item.time}`"
          >
            {{ item.time }}
          </div>
        </div>
      </div>
      <div class="tip2">预约成功则会消耗1节体验课时</div>
      <div class="btn" :class="disabled ? 'disabled-btn' : ''" @click="submit">选好了，提交给老师</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReceiveExperienceClass',
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      levelList: [
        { thinkLevel: 0, text: 'T0：完全没有英语基础，认识简单的字母，零星单词，无法沟通' },
        { thinkLevel: 1, text: 'T1：没有接受过系统的英语学习，尤其在听说方面存在障碍' },
        { thinkLevel: 2, text: 'T2：可以使用单个单词或词组回答提问，并用手势或动作完成教师所给的指令' },
        { thinkLevel: 3, text: 'T3：可以使用单一的完整句子就个人基本情况进行简单表述' },
        { thinkLevel: 4, text: 'T4：可以连贯的使用多个简单句就日常生活和活动进行交谈' },
        { thinkLevel: 5, text: 'T5：可以陈述基本事物，表达简单的好恶，能就主题进行适度的交流和讨论' },
        { thinkLevel: 6, text: 'T6：可以使用英语开展日常旅游，商务洽谈等，具备较好的口语流利度和逻辑思维' },
        { thinkLevel: 7, text: 'T7：可以轻松随意就主题内容进行讨论或辩论，举证充分得当' },
        { thinkLevel: 8, text: 'T8：可以主导谈话方向、把握谈话内容，懂得交谈的艺术，会使用英语进行跨文化交际' },
        { thinkLevel: 9, text: 'T9：可以对社会主流现象及问题发表独到的评论或见解，拥有国际化视野' },
      ],
      text: 'T0：完全没有英语基础，认识简单的字母，零星单词，无法沟通',
      activeIndex: 0,
      week: ['一', '二', '三', '四', '五', '六', '日'],
      timeData: [
        { time: '06:00~08:00' },
        { time: '08:00~10:00' },
        { time: '10:00~12:00' },
        { time: '12:00~14:00' },
        { time: '14:00~16:00' },
        { time: '16:00~18:00' },
        { time: '18:00~20:00' },
        { time: '20:00~22:00' },
      ],
      classDateAndWeeks: [],
      nowTime: '',
      dateTime: '',
      selectWeek: '',
      selectTime: '',
    }
  },
  computed: {
    disabled() {
      return !this.selectTime
    },
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
    async submit() {
      if (this.disabled) return
      try {
        const params = {
          thinkLevel: this.activeIndex,
          wantDateTime: `${this.dateTime} ${this.selectTime.replace('~', '-')}`,
        }
        await this.$api.receiveTrialClass(params)
        this.close()
        this.$store.dispatch('user/getExperienceCourseDetail').then(()=>{
          this.$bus.$emit('updateTrialClassStatus');
        })
        this.$emit('receiveSuccess')
      } catch (e) {
        console.log(e, 'error')
      }
    },
    async getClassDateAndWeeks() {
      try {
        const {resultData} = await this.$api.getTrialClassTime()
        this.classDateAndWeeks = resultData.classDateAndWeeks
        this.nowTime = resultData.nowTime
        if (this.classDateAndWeeks && this.classDateAndWeeks.length > 0) {
          this.changeDateTime(this.classDateAndWeeks[0])
        }
      } catch (e) {
        console.log(e, 'error')
      }
    },
    clickLevel(item) {
      this.activeIndex = item.thinkLevel
      this.text = item.text
    },
    isDisabledTime(time) {
      const startTime = time ? time.split('~')[0] : '00:00'
      return new Date(this.nowTime) >= new Date(`${this.dateTime} ${startTime}`)
    },
    changeTime(item) {
      if (this.isDisabledTime(item.time)) return
      if (this.selectTime === item.time) return
      this.selectTime = item.time
    },
    changeDateTime(item) {
      if (this.dateTime === item.classDate) return
      this.dateTime = item.classDate
      this.selectWeek = `星期${this.week[item.week - 1]}`
      this.selectTime = ''
    },
    open() {
      this.dialogShow=true
    },
    close() {
      this.dialogShow=false
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
  background: #f5f6f9;
  padding: 20px 40px 28px;
  border-radius: 0 0 24px 24px;
}

::v-deep .el-dialog__header {
  background: #f5f6f9;
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

.title {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
  line-height: 19px;
}

.top-wrap {
  width: 511px;
  background: #ffffff;
  border-radius: 8px 8px 8px 8px;
  box-sizing: border-box;
  padding: 20px 20px 30px 20px;

  .block-wrap {
    display: flex;
    align-items: flex-end;
    padding-top: 40px;
    padding-bottom: 11px;
    border-bottom: 3px solid #f1f1f1;

    .item {
      display: inline-block;
      position: relative;
      width: 38px;
      height: 26px;
      background: #f1f1f1;
      border-radius: 2px 2px 2px 2px;
      margin-right: 10px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      .num {
        position: absolute;
        bottom: 6px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        font-weight: 500;
        color: #999999;
      }

      .num-active {
        color: #ffffff;
      }

      .my-level {
        position: absolute;
        top: -29px;
        left: -12px;
        height: 19px;
        border-radius: 4px 4px 4px 4px;
        width: 56px;
        box-sizing: border-box;
        background: #0087ff;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 19px;

        &:before {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          display: block;
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-top-color: #0087ff;
        }
      }

      .bottom-line {
        position: absolute;
        bottom: -14px;
        width: 38px;
        height: 3px;
        background: #0087ff;
        border-radius: 60px 60px 60px 60px;
      }
    }

    .active {
      background: #0087ff;
      color: #ffffff;
    }
  }

  .tip {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 21px;
  }
}

.bottom-wrap {
  width: 511px;
  background: #ffffff;
  border-radius: 8px 8px 8px 8px;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  margin-top: 20px;
  .date-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 100%;
    height: 48px;
    border-radius: 4px;
    border: 1px solid #dcdee3;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      cursor: pointer;
      border-right: 1px solid #dcdee3;
      &:last-child {
        border-right: none;
      }
      .week {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        line-height: 14px;
      }

      .date {
        font-size: 12px;
        font-weight: 400;
        color: #333333;
        line-height: 14px;
        margin-bottom: 5px;
      }
    }
    .active-item {
      background: #0087ff;
      .week,
      .date {
        color: #ffffff;
      }
    }
  }
  .time-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .item {
      margin-bottom: 20px;
      box-sizing: border-box;
      width: 136px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #d5d5d5;
      font-size: 14px;
      font-weight: 500;
      color: #666666;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      &:nth-child(3n + 2) {
        margin-left: 30px;
        margin-right: 30px;
      }
    }

    .active {
      background: #0087ff;
      border: 1px solid #0087ff;
      color: #ffffff;
    }

    .disabled {
      background: #f1f1f1;
      border: 1px solid #d5d5d5;
    }
  }
}
.tip2 {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  line-height: 14px;
  margin-top: 10px;
  text-align: center;
}
.btn {
  width: 100%;
  margin-top: 15px;
  height: 44px;
  background: linear-gradient(90deg, #fe7501 0%, #ff9203 100%);
  border-radius: 8px 8px 8px 8px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
}
.disabled-btn {
  background: #cccccc;
}
</style>
