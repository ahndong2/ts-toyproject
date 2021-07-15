import { GlobalState } from './type';

export const setGlobals = (state: GlobalState, userObject: GlobalState): void => {
  state.viewType = userObject.viewType;
  state.NS = userObject.NS;
  state.NSList = userObject.NSList;
  state.refreshTime = userObject.refreshTime;
  state.isDiagramView = userObject.isDiagramView;
};

export const setViewType = (state: GlobalState, type: string): void => {
  state.viewType = type;
};

export const setNS = (state: GlobalState, NS?: string): void => {
  state.NS = NS;
};
export const setNSList = (state: GlobalState, NSList?: Array<any>): void => {
  state.NSList = NSList;
};
export const setRefreshTime = (state: GlobalState, refreshTime?: number): void => {
  state.refreshTime = refreshTime;
};
export const setIsDiagramView = (state: GlobalState, isDiagramView?: boolean): void => {
  state.isDiagramView = isDiagramView;
};
