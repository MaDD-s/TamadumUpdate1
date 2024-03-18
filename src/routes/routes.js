import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';

// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');
import Widgets from 'src/pages/Widgets.vue';


// Device Settings
const DCUSettings = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/deviceSettings/DCUSettings.vue');
const AreaSettings = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/deviceSettings/AreaSettings.vue');
const meterSettings = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/deviceSettings/meterSettings.vue');

  //instantaneous data pages
const F25 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/F25.vue');
const F129 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/F129.vue');
const F177 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/F177.vue');
const F130 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/F130.vue');
const F131 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/F131.vue');
const F132 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/F132.vue');
const time = () =>
import(/* webpackChunkName: "components" */ 'src/pages/instantaneousData/time.vue');

// Control Meter Settings
const control = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/ControlMeter/control.vue');
const coverEvent = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/ControlMeter/coverEvent.vue');
const tariffChange = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/ControlMeter/tariffChange.vue');

  // Load Profile Settings
const energy = () =>
import(/* webpackChunkName: "pages" */ 'src/pages/loadProfile/energy.vue');
const current = () =>
import(/* webpackChunkName: "pages" */ 'src/pages/loadProfile/current.vue');
const voltage = () =>
import(/* webpackChunkName: "pages" */ 'src/pages/loadProfile/voltage.vue');

//instantaneous data pages
const hF25 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/hF25.vue');
const hF129 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/hF129.vue');
const hF177 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/hF177.vue');
const hF130 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/hF130.vue');
const hF131 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/hF131.vue');
const hF132 = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/hF132.vue');
const peakLoad = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/peakLoad.vue');
const voltageDrop = () =>
import(/* webpackChunkName: "components" */ 'src/pages/historicalData/voltageDrop.vue');

const balanceSettings = () =>
import(/* webpackChunkName: "pages" */ 'src/pages/Balance/balanceSettings.vue');
const balanceView = () =>
import(/* webpackChunkName: "pages" */ 'src/pages/Balance/balanceView.vue');

let deviceSettingsMenu = {
  path: '/deviceSettings',
  component: DashboardLayout,
  name: 'deviceSettings',
  redirect: '/pages/user',
  children: [
    {
      path: 'DCUSettings',
      name: 'Концентратор тохиргоо',
      components: { default: DCUSettings }
    },
    {
      path: 'AreaSettings',
      name: 'Байршил тохиргоо',
      components: { default: AreaSettings }
    },
    {
      path: 'meterSettings',
      name: 'Тоолуур тохиргоо',
      components: { default: meterSettings }
    }
  ]
};

let instantaneousData = {
  path: '/instantaneousData',
  component: DashboardLayout,
  redirect: '/instantaneousData/F129',
  name: 'Агшин зуурын мэдээлэл',
  children: [
    {
      path: 'F25',
      name: 'Гүйдэл, Хүчдэл, Чадал болон бусад мэдээлэл',
      components: { default: F25 }
    },
    {
      path: 'F177',
      name: 'Нийт идэвхтэй энерги',
      components: { default: F177 }
    },
    {
      path: 'F129',
      name: 'Эерэг идэвхтэй энерги',
      components: { default: F129 }
    },
    {
      path: 'F130',
      name: 'Эерэг хуурмаг энерги',
      components: { default: F130 }
    },
    {
      path: 'F131',
      name: 'Сөрөг идэвхтэй энерги',
      components: { default: F131 }
    },
    {
      path: 'F132',
      name: 'Сөрөг хуурмаг энерги',
      components: { default: F132 }
    },
    {
      path: 'time',
      name: 'Тоолуурын огноо',
      components: { default: time }
    }
  ]
};

let controlMeterMenu = {
  path: '/ControlMeter',
  component: DashboardLayout,
  name: 'controlMeter',
  redirect: '/controlMeter/control',
  children: [
    {
      path: 'control',
      name: 'Тоолуур удирдах (асаах/унтраах)',
      components: { default: control }
    },
    {
      path: 'coverEvent',
      name: 'Тагны тохиргоо',
      components: { default: coverEvent }
    },
    {
      path: 'tariffChange',
      name: 'Тарифын тохиргоо',
      components: { default: tariffChange }
    }
  ]
};

let loadProfileMenu = {
  path: '/loadProfile',
  component: DashboardLayout,
  name: 'loadProfile',
  redirect: '/loadProfile/energy',
  children: [
    {
      path: 'energy',
      name: 'Энерги',
      components: { default: energy }
    },
    {
      path: 'current',
      name: 'Гүйдэл',
      components: { default: current }
    },
    {
      path: 'voltage',
      name: 'Хүчдэл',
      components: { default: voltage }
    }
  ]
};

let historicalDataMenu = {
  path: '/historicalData',
  component: DashboardLayout,
  redirect: '/historicalData/hF129',
  name: 'Түүхэн мэдээлэл',
  children: [
    {
      path: 'hF25',
      name: 'Гүйдэл, Хүчдэл, Чадал болон бусад мэдээлэл',
      components: { default: hF25 }
    },
    {
      path: 'hF177',
      name: 'Нийт идэвхтэй энерги',
      components: { default: hF177 }
    },
    {
      path: 'hF129',
      name: 'Эерэг идэвхтэй энерги',
      components: { default: hF129 }
    },
    {
      path: 'hF130',
      name: 'Эерэг хуурмаг энерги',
      components: { default: hF130 }
    },
    {
      path: 'hF131',
      name: 'Сөрөг идэвхтэй энерги',
      components: { default: hF131 }
    },
    {
      path: 'hF132',
      name: 'Сөрөг хуурмаг энерги',
      components: { default: hF132 }
    },
    {
      path: 'peakLoad',
      name: 'Өдрийн хамгийн өндөр ачаалал',
      components: { default: peakLoad }
    },
    {
      path: 'voltageDrop',
      name: 'Хүчдэлийн уналт',
      components: { default: voltageDrop }
    }
  ]
};

let balanceMenu = {
  path: '/balance',
  component: DashboardLayout,
  name: 'balance',
  redirect: '/Balance/balanceView',
  children: [
    {
      path: 'balanceSettings',
      name: 'Балансын тохиргоо',
      components: { default: balanceSettings }
    },
    {
      path: 'balanceView',
      name: 'Баланс гаргах',
      components: { default: balanceView }
    }
  ]
};

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home'
  },
  instantaneousData,
  controlMeterMenu,
  loadProfileMenu,
  historicalDataMenu,
  deviceSettingsMenu,
  balanceMenu,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard layout',
    children: [
      {
        path: 'dashboard',
        name: 'Хянах самбар',
        components: { default: Dashboard }
      },
      {
        path: 'widgets',
        name: 'Widgets',
        components: { default: Widgets }
      }
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
