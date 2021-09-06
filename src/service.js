export function setAppHeader(store, route) {
  if(route?.meta?.mainHeader) store.commit('app/setMainHeader', route.meta.mainHeader);
  if(route?.meta?.subHeader) store.commit('app/setMainHeader', route.meta.subHeader);
}