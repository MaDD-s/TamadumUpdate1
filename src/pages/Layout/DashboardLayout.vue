<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <sidebar-fixed-toggle-button />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{ name: $t('sidebar.deviceSettings'), icon: 'tim-icons icon-settings' }"
        >
          <sidebar-item
            :link="{ name: $t('sidebar.areaSettings'), path: '/deviceSettings/AreaSettings' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.dcuSettings'), path: '/deviceSettings/DCUSettings' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.meterSettings'), path: '/deviceSettings/meterSettings' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.instantaneousData'),
            icon: 'tim-icons icon-sound-wave'
          }"
        >
          <sidebar-item
            :link="{name: $t('sidebar.F25'), path: '/instantaneousData/F25' }"
           ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F177'), path: '/instantaneousData/F177' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F129'), path: '/instantaneousData/F129' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F130'), path: '/instantaneousData/F130' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F131'), path: '/instantaneousData/F131' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F132'), path: '/instantaneousData/F132' }"
          ></sidebar-item>    
          <sidebar-item
            :link="{name: $t('sidebar.time'), path: '/instantaneousData/time' }"
          ></sidebar-item>        
          </sidebar-item>
          <sidebar-item
          :link="{ name: $t('sidebar.controlMeter'), icon: 'tim-icons icon-bulb-63' }"
        >
          <sidebar-item
            :link="{ name: $t('sidebar.control'), path: '/controlMeter/control' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.coverEvent'), path: '/controlMeter/coverEvent' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.tariffChange'), path: '/controlMeter/tariffChange' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: $t('sidebar.loadProfile'), icon: 'tim-icons icon-refresh-01' }"
        >
          <sidebar-item
            :link="{ name: $t('sidebar.energy'), path: '/loadProfile/energy' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.current'), path: '/loadProfile/current' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.voltage'), path: '/loadProfile/voltage' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.history'),
            icon: 'tim-icons icon-sound-wave'
          }"
        >
          <sidebar-item
            :link="{name: $t('sidebar.F25'), path: '/historicalData/hF25' }"
           ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F177'), path: '/historicalData/hF177' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F129'), path: '/historicalData/hF129' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F130'), path: '/historicalData/hF130' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F131'), path: '/historicalData/hF131' }"
          ></sidebar-item>
          <sidebar-item
            :link="{name: $t('sidebar.F132'), path: '/historicalData/hF132' }"
          ></sidebar-item>    
          <sidebar-item
            :link="{name: $t('sidebar.peakLoad'), path: '/historicalData/peakLoad' }"
          ></sidebar-item>  
          <sidebar-item
            :link="{name: $t('sidebar.voltageDrop'), path: '/historicalData/voltageDrop' }"
          ></sidebar-item> 
          </sidebar-item>
          <sidebar-item
          :link="{ name: $t('sidebar.balance'), icon: 'tim-icons icon-refresh-01' }"
        >
          <sidebar-item
            :link="{ name: $t('sidebar.balanceSettings'), path: '/balance/balanceSettings' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.balanceView'), path: '/balance/balanceView' }"
          ></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import SidebarShare from './SidebarSharePlugin';
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import SidebarFixedToggleButton from './SidebarFixedToggleButton.vue';
import { ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    SidebarFixedToggleButton,
    ZoomCenterTransition,
    SidebarShare
  },
  data() {
    return {
      sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar');
        initScrollbar('main-panel');
        initScrollbar('sidebar-wrapper');

        docClasses.add('perfect-scrollbar-on');
      } else {
        docClasses.add('perfect-scrollbar-off');
      }
    }
  },
  mounted() {
    this.initScrollbar();
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
