import { ContainerState } from './type';
import * as actions from './actions';
// import * as getters from './getters';
import * as mutations from './mutations';

const state: ContainerState = {
  container: {
    ingresses: [
      {
        name: 'hello-devops-ingress',
        domain_name: 'hello-devops.console.spaceone.digitalkds.co.kr',
        target_service: 'hello-devops-service',
      },
      {
        name: 'nginx-ingress',
        domain_name: 'kronos.test.digitalkds.co.kr',
        target_service: 'nginx-service',
      },
    ],
    services: [
      {
        name: 'hello-devops-service',
        target_pod: 'hello-devops-pod',
        target_port: 8080,
        type: 'LoadBalancer',
      },
      {
        name: 'nginx-service',
        target_pod: 'nginx-pod',
        target_port: 80,
        type: 'LoadBalancer',
      },
    ],
    pods: [
      {
        name: 'hello-devops-deploy-55b56c597c-mzkt5',
        status: 'Pending',
        source_pod: 'hello-devops-pod',
      },
      {
        name: 'nginx-pod-76cdfb5d5-2fvzf',
        status: 'Running',
        source_pod: 'nginx-pod',
      },
      {
        name: 'nginx-pod-76cdfb5d5-5fmjj',
        status: 'Running',
        source_pod: 'nginx-pod',
      },
      {
        name: 'nginx-pod-76cdfb5d5-cmbq7',
        status: 'Running',
        source_pod: 'nginx-pod',
      },
      {
        name: 'nginx-pod-76cdfb5d5-fcrcc',
        status: 'Running',
        source_pod: 'nginx-pod',
      },
      {
        name: 'nginx-pod-76cdfb5d5-twq9j',
        status: 'Running',
        source_pod: 'nginx-pod',
      },
    ],
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
