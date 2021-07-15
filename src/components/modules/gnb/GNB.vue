<template>
  <div class="gnb">
    <div class="left-part">
      <div class="logo">
        TOY
      </div>
      <div v-if="viewType === 'Graph'" class="form">
        <select id="ns-list" v-model="nsValue" class="inp"
                @change="nsChange"
        >
          <option v-for="ns in namespaceList" :key="ns.id" :label="ns.label"
                  :value="ns.value"
          />
        </select>
        <!-- <input type="text" placeholder="filter..." class="inp inp-filter"> -->
        <button type="button" class="btn" @click="refresh">
          Refresh
        </button>
        <select id="ns-list" v-model="rftValue"
                class="inp"
                @change="rftChange"
        >
          <option v-for="rft in refreshTimeList"
                  :key="rft.id"
                  :label="rft.label"
                  :value="rft.value"
          />
        </select>
      </div>
    </div>
    <div class="right-part">
      <router-link to="/" @click="clickViewType('Chart')">
        Chart
      </router-link>
      <router-link to="/Cytoscape" @click="clickViewType('Graph')">
        Graph
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getCurrentInstance, ComponentRenderProxy, defineComponent, reactive, toRefs, computed,
} from '@vue/composition-api';

interface nsListType {
  label?: string;
  value?: number;
}

interface Props {
  ns?: string;
  refreshTime?: number;
  namespaceList?: nsListType;
}

export default defineComponent({
  name: 'GNB',
  props: {
    ns: {
      type: String,
      default: 'default',
    },
    namespaceList: {
      type: Array,
      default: () => [],
    },
    refreshTime: {
      type: Number,
      default: 0,
    },
  },
  setup(props: Props, { emit }) {
    const vm = getCurrentInstance() as ComponentRenderProxy;
    // state
    const state = reactive({
      viewType: computed(() => vm.$store.state.global.viewType),
      nsValue: props.ns || 'default',
      rftValue: props.refreshTime,
      refreshTimeList: [
        { label: 'off', value: 0 },
        { label: '5secs', value: 5 },
        { label: '10secs', value: 10 },
        { label: '15secs', value: 15 },
        { label: '30secs', value: 30 },
        { label: '60secs', value: 60 },
      ],
    });

    // GNB NameSpace Change
    const nsChange = ():void => {
      const nsSelectValue = state.nsValue;
      emit('change', 0, nsSelectValue);
    };
    const refresh = ():void => {
      emit('refresh');
    };
    const rftChange = ():void => {
      const rftSelectValue = state.rftValue;
      emit('change', 1, rftSelectValue);
    };

    const clickViewType = (type:string):void => {
      vm.$store.dispatch('global/setViewType', type);
    };

    return {
      ...toRefs(state),
      nsChange,
      refresh,
      rftChange,
      clickViewType,
    };
  },
});
</script>

<style>
.gnb {
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  min-width: 1000px;
  height: 4rem;
  color: #fff;
  background-color: #4a473d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.left-part {
  display: flex;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 24px;
  text-transform: lowercase;
  cursor: default;
}
.logo::before {
  content:' ';
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512.007 512.007'%3E%3Cpath d='M510.606 278.946c-6.976-67.424-39.648-133.408-92-185.76C309.582-15.773 147.918-31.485 58.254 58.274c-89.728 89.728-74.048 251.328 34.944 360.32 52.352 52.352 118.336 85.024 185.76 92 8.992.928 17.856 1.408 26.592 1.408 57.984 0 109.824-20.32 148-58.496 43.904-43.872 64.192-105.888 57.056-174.56zm-159.552 55.328c-35.712-27.264-74.432-38.048-116.48-49.568C128.718 255.682 76.142 167.362 63.854 63.843c29.824 35.968 51.84 77.056 88.448 107.168 39.008 32.064 81.952 43.744 129.12 57.408 103.552 30.048 154.784 117.6 166.56 219.52-32.32-38.848-56.032-82.433-96.928-113.665z' fill='%23fcb22a'/%3E%3C/svg%3E");
  background-position: 50%;
  background-size: 100%;
}
.form {
  display: flex;
  color: #000;
}
.inp {
  width: 180px;
  height: 2rem;
  padding: 0 .8rem;
  margin-right: 10px;
  font-size: .9rem;
  border: 0;
}
.inp-filter {
  width: 130px;
}
.btn {
  height: 2rem;
  padding: 0 20px;
  color: #fff;
  letter-spacing: .2px;
  background: #fcb22a;
  border: 0;
}
.right-part {
  position: absolute;
  top: 0;
  right: 15px;
  display: flex;
  align-items: center;
  height: 100%;
}
.right-part a {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 1rem;
  letter-spacing: .3px;
}
.right-part a:hover {
  opacity: .9;
}
.router-link-exact-active::after {
  content: ' ';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 4px;
  background: #fcb22a;
}
</style>
