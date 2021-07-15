<template>
  <aside class="infobox">
    <div class="card">
      <div class="card-head">
        <hgroup>
          <h1 class="card-title">{{ infoBoxData.id }}</h1>
          <h2 class="card-subtitle"
            :data-type="infoBoxData.char"
            :style="bgStyle">{{ infoBoxData.char }}</h2>
        </hgroup>
      </div>
      <div class="card-body">
        <div v-if="infoBoxData.domain_name">
          <h3>domain name</h3>
          <ul>
            <li>{{infoBoxData.domain_name}}</li>
          </ul>
        </div>
        <div v-if="infoBoxData.target_port">
          <h3>target port</h3>
          <ul>
            <li>{{infoBoxData.target_port}}</li>
          </ul>
        </div>
        <div v-if="infoBoxData.type">
          <h3>type</h3>
          <ul>
            <li>{{infoBoxData.type}}</li>
          </ul>
        </div>
        <div v-if="infoBoxData.status">
          <h3>status</h3>
          <ul>
            <li>{{infoBoxData.status}}</li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

interface Props {
  infoBoxData?: any,
}

export default defineComponent({
  name: 'InfoBox',
  props: {
    infoBoxData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    bgStyle(): any {
      let iconName;
      switch (this.infoBoxData.char) {
        case 'ingress':
          iconName = 'ing';
          break;
        case 'service':
          iconName = 'svc';
          break;
        case 'pod':
          // status: pending, running
          if (this.infoBoxData.status === 'Running') {
            iconName = 'pod-running';
          } else {
            iconName = 'pod-pending';
          }
          break;
        default:
          break;
      }
      return `background-image: url(/img/res/${iconName}.svg)`;
    },
  },
  setup(props:Props) {
    console.log('infoBoxData: ', props.infoBoxData);
  },
});
</script>

<style scoped>
.infobox {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
.card {
  min-width: 400px;
  min-height: 300px;
  background-color: #fff;
  box-shadow: 2px 5px 4px 0 rgb(0 0 0 / 7%);
}
.card-head {
  padding: 1.2rem 1.8rem;
  background: #776C61;
}
.card-body {
  padding: 1.5rem;
}
hgroup {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
h1 {
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;
}
h2 {
  position: absolute;
  top: 15px;
  right: -5px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  width: 60px;
  padding-top: 55px;
  background-repeat: no-repeat;
  background-position: 50% 0%;
  background-size: 50px;
}
h3 {
  font-size: 15px;
  color: #111;
  text-transform: capitalize;
}
ul {
  padding: 0 0 0 28px;
  margin-top: .3rem;
}
li {
  line-height: 1.4;
  color: #555;
}
::marker {
  font-size: 1px;
}
b {
  font-weight: 400;
}
.btn-dtl {
  display: block;
  height: 2.3rem;
  margin-left: auto;
}
</style>
