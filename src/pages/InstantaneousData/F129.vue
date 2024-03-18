<template>
  <div class="row mt-5">
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <div>
          <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <el-select
              class="select-primary mb-3 pagination-select"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-primary"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <el-table :data="tableData"
          @selection-change="handleSelectionChange"
          ref="baseTable">            
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
              :sortable="true"
            >
            <el-table-column>
              <template slot="header">
                <el-input
                  type="search"
                  class="mb-3 search-input"
                  prefix-icon="el-icon-search"
                  :placeholder="column.label"
                  v-model="searchQueries[column.prop]"
                  aria-controls="datatables"/>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column :min-width="135" align="right" label="Actions">
              <div slot-scope="props">
                <base-button
                  @click.native="handleLike(props.$index, props.row)"
                  class="like btn-link"
                  type="info"
                  size="sm"
                  icon
                >
                  <i class="tim-icons icon-heart-2"></i>
                </base-button>
                <base-button
                  @click.native="handleEdit(props.$index, props.row)"
                  class="edit btn-link"
                  type="warning"
                  size="sm"
                  icon
                >
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
                <base-button
                  @click.native="handleDelete(props.$index, props.row)"
                  class="remove btn-link"
                  type="danger"
                  size="sm"
                  icon
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </base-pagination>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import users from './users';
import Fuse from 'fuse.js';
import swal from 'sweetalert2';

export default {
  components: {
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  computed: {
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQueries: {
        name: '',
        email: '',
        age: ''
      },
      tableColumns: [
        {
          prop: 'name',
          label: 'Name',
          minWidth: 200
        },
        {
          prop: 'email',
          label: 'Email',
          minWidth: 250
        },
        {
          prop: 'age',
          label: 'Age',
          minWidth: 100
        },
        {
          prop: 'salary',
          label: 'Salary',
          minWidth: 120
        }
      ],
      tableData: users,
      multipleSelection: [],
      fuseSearch: null
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleLike(index, row) {
      swal.fire({
        title: `You liked ${row.name}`,
        buttonsStyling: false,
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-success btn-fill'
        }
      });
    },
    handleEdit(index, row) {
      swal.fire({
        title: `You want to edit ${row.name}`,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-info btn-fill'
        }
      });
    },
    handleDelete(index, row) {
      swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success btn-fill',
          cancelButton: 'btn btn-danger btn-fill'
        },
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(row);
          swal.fire({
            title: 'Deleted!',
            text: `You deleted ${row.name}`,
            icon: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          });
        }
      });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    }
  },
  mounted() {
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3
    });
  },
  watch: {
    searchQueries: {
      handler(newValues) {
        let result = this.tableData;
        for (const prop in newValues) {
          if (newValues[prop] !== '') {
            const fuseResult = this.fuseSearch.search(newValues[prop]);
            result = result.filter(row => fuseResult.includes(row));
          }
        }
        this.searchedData = result;
      },
      deep: true
    }
  }
};
</script>

<style>
.el-table .el-table__header-wrapper th {
  background-color: transparent;
}
.pagination-select,
.pagination-select .el-input {
  background-color: transparent;
}
.el-table__row:hover {
  background-color: #000a46;
}
.search-input {
  width: 70%;
  background-color: transparent;
}
.swal2-icon-content {
  font-size: inherit !important;
}
</style>
