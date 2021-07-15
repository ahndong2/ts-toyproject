import { ContainerState } from './type';

export const setContainer = (state: ContainerState, containerObject: ContainerState): void => {
  state.container = containerObject;
};
