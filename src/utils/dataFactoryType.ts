export interface Ingress {
  name? :string;
  target_service? :string;
  domain_name? :string,
  [key:string]: unknown,
}
export interface Services {
  name? :string;
  target_pod? :string;
  target_port? :string;
  type? :string;
  [key:string]: unknown,
}
export interface Pods {
  name? :string;
  source_pod? :string;
  status? :string;
  [key:string]: unknown,
}
export interface Edges {
  source? :string;
  target? :string;
  [key:string]: unknown,
}
export interface EdgesObject {
  data? : Edges
}
export interface Nodes {
  id? :string;
  char? :string;
  [key:string]: unknown,
}
export interface NodesObject {
  data? : Nodes
}
export interface Cytoscape {
  root? : string[],
  nodes? : any,
  edges? : any,
}
