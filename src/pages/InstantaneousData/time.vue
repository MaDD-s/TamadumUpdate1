<template>
  <div class="row">
    <div class="col-md-12">
      <card class="card-plain" body-classes="table-full-width">
        <div class="position-relative">
          <!-- Search bar row -->
          
          <el-table
            header-cell-class-name="table-transparent"
            header-row-class-name="table-header"
            row-class-name="table-transparent"
            :data="filteredTableData"
            height="500px"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- Table columns -->
            <template v-for="column in columns">
                <el-table-column>
                    <template slot="header">
                        <input v-if="shouldDisplaySearch(column.prop)" 
                        v-model="search[column.prop]" 
                        class="form-control search-input" 
                        :placeholder="column.label"
                        clearable />
                    </template>
                <el-table-column :key="column.prop" 
                                :prop="column.prop" 
                                :label="column.label" 
                                :width="column.prop === 'id' ? '65' : '250'" 
                                :sortable="isSortable(column.prop)">
                </el-table-column>
            </el-table-column>
            </template>
          </el-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Input } from 'element-ui';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Input.name]: Input
  },
  data() {
    return {
      tableData: [],
      search: {},
      columns: [
        { prop: 'id', label: 'ID', sortable: false },
        { prop: 'concentrator', label: 'Concentrator', searchable: true },
        { prop: 'transf', label: 'Transformer', searchable: true },
        { prop: 'meter_number', label: 'Meter Number', searchable: true },
        { prop: 'user_code', label: 'User Code', searchable: true },
        { prop: 'user_name', label: 'User Name', searchable: true },
        { prop: 'address', label: 'Address', searchable: true },
        { prop: 'add_door', label: 'Apartment Door', searchable: true },
        { prop: 'meter_type', label: 'Meter Type', searchable: true },
        { prop: 'date', label: 'Date', sortable: true },
        { prop: 'total_tariff', label: 'Total Tariff.kWh', sortable: true },
        { prop: 'tariff1', label: 'Tariff1.kWh', sortable: true },
        { prop: 'tariff2', label: 'Tariff2.kWh', sortable: true },
        { prop: 'tariff3', label: 'Tariff3.kWh', sortable: true },
        { prop: 'tariff4', label: 'Tariff4.kWh', sortable: true }
      ]
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    clearSearch(column) {
      this.search[column] = '';
    },
    shouldDisplaySearch(columnProp) {
      const column = this.columns.find(col => col.prop === columnProp);
      return column && column.searchable;
    },
    isSortable(columnProp) {
      const column = this.columns.find(col => col.prop === columnProp);
      return column && column.sortable !== false;
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
  background-color: #0a2fff;
}
</style>