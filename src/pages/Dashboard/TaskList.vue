<template>
  <base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
      <td><base-checkbox v-model="row.done"></base-checkbox></td>
      <td>
        <p class="title">{{ row.title }}</p>
        <p class="text-muted">{{ row.description }}</p>
      </td>
      <td class="td-actions text-right">
        <el-tooltip
          content="Edit task"
          effect="light"
          :open-delay="300"
          placement="top"
        >
          <base-button type="link">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
        </el-tooltip>
      </td>
    </template>
  </base-table>
</template>
<script>
import { BaseTable } from '@/components';

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      tableData: [
        {
      title: 'Алдааг засах',
          description: 'Засаж байгаа',
          done: false
        },
        {
          title: 'Тоолуур холбох',
          description:
            'Холбосон',
          done: true
        },
        {
          title: 'бас л алдаа',
          description:
            'засаж байгаа',
          done: false
        },
        {
          title: 'алдаа',
          description: 'зассан',
          done: false
        },
        {
          title: 'алдаа',
          description:
            'зассан',
          done: false
        },
        {
          title: 'алдаа',
          description: 'зассан',
          done: false
        }
      ]
    };
  }
};
</script>
<style></style>
