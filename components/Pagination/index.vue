<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      let pageMax = Math.ceil(this.total / val);
      // 判断跳转页数是否大于最大页数，如果大于，跳转页数就等于最大页数
      if (this.currentPage > pageMax) {
        this.currentPage = pageMax;
      }
      this.$emit('pagination', { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        // scrollTo(0, 500);
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        // scrollTo(0, 500);
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  margin: 30px 16px;
  text-align: right;
}

.pagination-container.hidden {
  display: none;
}
</style>
