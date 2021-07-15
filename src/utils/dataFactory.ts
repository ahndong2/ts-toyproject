import {
  Ingress, Services, Pods, EdgesObject, Cytoscape, NodesObject,
} from './dataFactoryType';

const ingressToServices = (ingress:Ingress[], services:Services[]): Array<EdgesObject> => {
  const data:Array<EdgesObject> = [];
  [...services].forEach((s) => {
    if (ingress.filter((i) => s.name === i.target_service).length > 0) {
      data.push({
        data: {
          source: ingress.filter((i) => s.name === i.target_service)[0].name,
          target: s.name,
        },
      });
    }
  });

  return data;
};

const servicesToPods = (services:Services[], pods: Pods[]): Array<EdgesObject> => {
  const data:Array<EdgesObject> = [];
  [...pods].forEach((p) => {
    if (services.filter((s) => s.target_pod === p.source_pod).length > 0) {
      data.push({
        data: {
          source: services.filter((s) => s.target_pod === p.source_pod)[0].name,
          target: p.name,
        },
      });
    }
  });
  return data;
};

const getNodes = (data:any, type:string): Array<NodesObject> => {
  const nodes = [...data].map((v) => ({
    data: {
      ...v,
      id: v.name,
      char: type,
    },
  }));
  return nodes;
};

export const containerDataFactory = (data: any): Cytoscape => {
  const { ingresses, services, pods } = data;

  const edgesData = [
    ...ingressToServices(ingresses, services),
    ...servicesToPods(services, pods),
  ];
  const nodesData = [
    ...getNodes(ingresses, 'ingress'),
    ...getNodes(services, 'service'),
    ...getNodes(pods, 'pod'),
  ];

  const rootArr = ingresses.map((v:any): string => v.name);
  return {
    root: rootArr,
    nodes: Object.values(nodesData),
    edges: Object.values(edgesData),
  };
};
