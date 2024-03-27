<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
              <h2 class="card-title">Хэрэглээ <el-select
                  multiple
                  class="select-info"
                  size="large"
                  v-model="selects.multiple"
                  collapse-tags
                  placeholder="Дэд станцаа сонгоно уу"
                >
                  <el-option
                    v-for="option in selects.countries"
                    class="select-info"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  >
                  </el-option>
                </el-select></h2>
              <h5 class="card-category">kWh</h5>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle"
                :class="isRTL ? 'float-left' : 'float-right'"
                data-toggle="buttons"
              >
                <label
                  v-for="(option, index) in bigLineChartCategories"
                  :key="option.name"
                  class="btn btn-sm btn-primary btn-simple"
                  :class="{ active: bigLineChart.activeIndex === index }"
                  :id="index"
                >
                  <input
                    type="radio"
                    @click="initBigChart(index)"
                    name="options"
                    autocomplete="off"
                    :checked="bigLineChart.activeIndex === index"
                  />
                  <span class="d-none d-sm-block">{{ option.name }}</span>
                  <span class="d-block d-sm-none">
                    <i :class="option.icon"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <!-- Stats Cards -->
    <div class="col-lg-3 col-md-6" v-for="card in statsCards" :key="card.title">
      <stats-card
        :title="card.title"
        :sub-title="card.subTitle"
        :type="card.type"
        :icon="card.icon"
      >
        <div slot="footer" v-html="card.footer"></div>
      </stats-card>
    </div>

    <!-- Small charts -->
    <div class="col-lg-8" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">b</h5>
          <h3 class="card-title">
            <i class="tim-icons icon-send text-success "></i> 12,100K
          </h3>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            :chart-data="greenLineChart.chartData"
            :gradient-stops="greenLineChart.gradientStops"
            :extra-options="greenLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-4" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">нийт тоолуур</h5>
          <h3 class="card-title">
            <i class="tim-icons icon-send text-success "></i> 12000
          </h3>
        </template>
        <div class="chart-area">
          <pie-chart
                  :chart-data="pieChart1.chartData"
                  :extra-options="pieChart1.extraOptions"
                  :height="120"
                >
                </pie-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-12">
      <card type="tasks" :header-classes="{ 'text-right': isRTL }">
        <template slot="header">
          <h6 class="title d-inline">Tasks (5)</h6>
          <p class="card-category d-inline">Өнөөдөр</p>
          <base-dropdown
            menu-on-right=""
            tag="div"
            title-classes="btn btn-link btn-icon"
            :class="{ 'float-left': isRTL }"
          >
            <i slot="title" class="tim-icons icon-settings-gear-63"></i>
            <a class="dropdown-item" href="#pablo"> Хадгалах </a>
            <a class="dropdown-item" href="#pablo"> Засах </a>
            <a class="dropdown-item" href="#pablo"> Устгах </a>
          </base-dropdown>
        </template>
        <div class="table-full-width table-responsive">
          <task-list></task-list>
        </div>
      </card>
    </div>
    
  </div>
</template>
<script>
import {Select, Option } from 'element-ui';
import {
  BaseProgress,
  BaseSwitch,
  Slider,
  ImageUpload,
  TagsInput
} from 'src/components/index';
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import PieChart from 'src/components/Charts/PieChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from './TaskList';
import UserTable from './UserTable';
import CountryMapCard from './CountryMapCard';
import StatsCard from 'src/components/Cards/StatsCard';
import config from '@/config';


let bigChartData = [
  [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
]
let bigChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

export default {
  components: {
    LineChart,
    PieChart,
    BarChart,
    StatsCard,
    TaskList,
    CountryMapCard,
    UserTable,
    [Option.name]: Option,
    [Select.name]: Select,
    BaseSwitch,
    BaseProgress,
    ImageUpload,
    TagsInput,
    Slider
  },
  data() {
    return {
      enabledRadio: '2',
      disabledRadio: '2',
      images: {
        regular: null,
        avatar: null
      },
      switches: {
        defaultOn: true,
        defaultOff: false,
        plainOn: true,
        plainOff: false,
        withIconsOn: true,
        withIconsOff: false
      },
      sliders: {
        simple: 30,
        rangeSlider: [20, 60]
      },
      selects: {
        simple: '',
        countries: [
          { value: '1-дугаар дэд станц', label: '1-дугаар дэд станц' },
          { value: '2-дугаар дэд станц', label: '2-дугаар дэд станц' },
          { value: '3-дугаар дэд станц', label: '3-дугаар дэд станц' },
          { value: '4-дугаар дэд станц', label: '4-дугаар дэд станц' },
          { value: '5-дугаар дэд станц', label: '5-дугаар дэд станц' },
          { value: '6-дугаар дэд станц', label: '6-дугаар дэд станц' },
          { value: '7-дугаар дэд станц', label: '7-дугаар дэд станц' },
          { value: '8-дугаар дэд станц', label: '8-дугаар дэд станц' },
          { value: '9-дугаар дэд станц', label: '9-дугаар дэд станц' },
          { value: '10-дугаар дэд станц', label: '10-дугаар дэд станц' }
        ],
        multiple: 'ARS'
      },
      statsCards: [
        {
          title: 'Нийт тоолуур',
          subTitle: 'Тоо',
          type: 'warning',
          icon: 'tim-icons icon-chat-33',
          footer: '<i class="tim-icons icon-refresh-01"></i>'
        },
        {
          title: '1000',
          subTitle: 'Татагдсан тоолуур',
          type: 'primary',
          icon: 'tim-icons icon-shape-star',
          footer: '<i class="tim-icons icon-sound-wave"></i></i> '
        },
        {
          title: '150',
          subTitle: 'Нийт таслалт',
          type: 'info',
          icon: 'tim-icons icon-single-02',
          footer: '<i class="tim-icons icon-trophy"></i> '
        },
        {
          title: '23',
          subTitle: 'Алдаа',
          type: 'danger',
          icon: 'tim-icons icon-molecule-40',
          footer: '<i class="tim-icons icon-watch-time"></i> '
        }
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      pieChart1: {
        chartData: {
          labels: [1, 2],
          datasets: [
            {
              label: 'Emails',
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ['#ff00ff', '#0000ff'],
              borderWidth: 0,
              data: [50, 50]
            }
          ]
        },
        extraOptions: chartConfigs.pieChartOptions
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
          datasets: [
            {
              label: 'шинээр нэмэгдсэн тоолуур',
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          'rgba(66,134,121,0.15)',
          'rgba(66,134,121,0.0)',
          'rgba(66,134,121,0)'
        ],
        gradientStops: [1, 0.4, 0]
      },
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return [{ name: 'Хоногоор', icon: 'tim-icons icon-single-02' }, { name: 'Долоо хоногоор', icon: 'tim-icons icon-gift-2' }, { name: 'Сараар', icon: 'tim-icons icon-tap-02' }];
    }
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data: bigChartData[index]
        }],
        labels: bigChartLabels
      };
      var currentDate = new Date();
        var calculatedDays = [];
        var calculatedWeeks = [];
        var calculatedMonths = []
              if (index === 0) {
                for (let i = 1; i <= 12; i++) {
                  // Get the date 10 days before the current date
                  let date = new Date(currentDate);
                  date.setDate(date.getDate() - i);
                  
                  // Format the date as MM/DD
                  let month = date.getMonth() + 1; // Months are zero-indexed
                  let day = date.getDate();
                  let formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
                  
                  calculatedDays.unshift(formattedDate);                  
                }
                chartData.labels = calculatedDays;
              }

              if (index === 1) {
                for (let i = 0; i < 10; i++) {
                  let sundayDate = new Date(currentDate);
                  sundayDate.setDate(sundayDate.getDate() - sundayDate.getDay() + (i * -7)); // Go back to Sunday of the week i weeks ago
                  let month = sundayDate.getMonth() + 1; // Months are zero-indexed
                  let day = sundayDate.getDate();
                  let formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
                  
                  calculatedWeeks.unshift(formattedDate);                  
                }
                chartData.labels = calculatedWeeks;
              }

              if (index === 2) {
                for (let i = 0; i <= 6; i++) {       
                  let date = new Date(currentDate);
                  date.setMonth(date.getMonth() - i);              
                  let month = date.getMonth() + 1; // Months are zero-indexed
                  let year = date.getFullYear();
                  let formattedDate = (month < 10 ? '0' : '') + month + '/' + year;
                  
                  calculatedMonths.unshift(formattedDate);                  
                }
                chartData.labels = calculatedMonths;
              }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = 'ar';
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  }
};
</script>
<style></style>
