<template>
  <div class="row">
    <div class="col-md-12">
      <card class="card-plain" body-classes="table-full-width">
        <!-- Button group -->
        <div class="button-group">
          <el-button type="primary" @click="fetchData">Мэдээлэл татах</el-button>
          <el-button type="primary" @click="exportData">Экспорт</el-button>
        </div>

        <div class="position-relative" style="margin-top: -12px;">
          <el-table
            ref="table"
            class="table-container"
            header-cell-class-name="table-e"
            header-row-class-name="custom-table-header"
            row-class-name="table-transparent"
            :data="filteredTableData"
            height="675px"
            @row-click="handleRowClick"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- Table columns -->
            <template v-for="column in columns">
              <el-table-column
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :sortable="column.sortable"
              >
                <template v-if="column.searchable" slot="header">
                  <input v-model="search[column.prop]" class="form-control search-input" :placeholder="column.label" clearable />
                  <span>{{ column.label }}</span>
                </template>
              </el-table-column>
            </template>
            <el-table-column label="Үйлдлүүд" width="250">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                  >Өөрчлөх</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Устгах</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Input, Button } from 'element-ui';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input,
    [Button.name]: Button
  },
  data() {
    return {
      tableData: [],
      search: {},
      columns: [
        { prop: 'id', label: 'ID', width: '65', sortable: false, searchable: false },
        { prop: 'concentrator', label: 'Концентратор', width: '250', sortable: true, searchable: true },
        { prop: 'transf', label: 'Трансформатор', width: '250', sortable: true, searchable: true },
        { prop: 'meter_number', label: 'Тоолуурын дугаар', width: '250', sortable: true, searchable: true },
        { prop: 'user_code', label: 'Хэрэглэгчийн дугаар', width: '250', sortable: true, searchable: true },
        { prop: 'user_name', label: 'Хэрэглэгчийн нэр', width: '250', sortable: true, searchable: true },
        { prop: 'address', label: 'Хаяг', width: '250', sortable: true, searchable: true },
        { prop: 'add_door', label: 'Хаалга тоот', width: '250', sortable: true, searchable: true },
        { prop: 'meter_type', label: 'Тоолуурын төрөл', width: '250', sortable: true, searchable: true },
        { prop: 'date', label: 'Мэдээлэл татсан огноо', width: '250', sortable: true, searchable: false },
        { prop: 'total_tariff', label: 'Нийт.kWh', width: '250', sortable: true, searchable: false },
        { prop: 'tariff1', label: 'Тариф 1.kWh', width: '250', sortable: true, searchable: false },
        { prop: 'tariff2', label: 'Тариф 2.kWh', width: '250', sortable: true, searchable: false },
        { prop: 'tariff3', label: 'Тариф 3.kWh', width: '250', sortable: true, searchable: false },
        { prop: 'tariff4', label: 'Тариф 4.kWh', width: '250', sortable: true, searchable: false }
      ],
      scrollbar: null
    };
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter(row => {
        return Object.keys(this.search).every(key => {
          const searchValue = this.search[key].toLowerCase();
          return String(row[key]).toLowerCase().includes(searchValue);
        });
      });
    }
  },
  async mounted() {
    try {
      const response = await fetch("https://65de1036dccfcd562f56311f.mockapi.io/api/v1x/DataTest");
      const data = await response.json();
      this.tableData = data;
      const container = document.querySelector('.el-table__body-wrapper');
      this.scrollbar = new PerfectScrollbar(container);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    handleRowClick(row) {
      this.$refs['table'].toggleRowSelection(row);
    },
    fetchData() {
      // Implement logic to fetch data
      console.log('Fetching data...');
    },
    exportData() {
      // Implement logic to export data
      console.log('Exporting data...');
    }
  },
  beforeDestroy() {
    if (this.scrollbar) {
      this.scrollbar.destroy();
    }
  }
};
</script>

<style>
.table-transparent {
  background-color: transparent !important;
}
.table-header .header-text {
  margin-bottom: 10px;
  text-align: left;
}
.el-table__header th {
  background-color: transparent !important;
  border-color: transparent !important;
}
.search-row {
  margin-bottom: 10px;
}
.search-column {
  display: flex;
}
.search-input {
  width: 100%;
}
.el-table__row:hover {
  background-color: #a19f9f;
}
.table-container {
  overflow-x: auto !important;
  overflow-y: auto !important;
}
.el-table__body-wrapper {
  overflow: hidden !important;
}
.el-table__body .el-table__row:hover td {
  color: rgb(44, 212, 235) !important;
}
.el-table__body td {
  border-color: transparent !important;
}
.el-table__body tr:nth-of-type(2n) {
  background: hsla(0, 0%, 52%, 0.1) !important;
}
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}
</style>
