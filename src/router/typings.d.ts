// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    permObjectType?: 'task' | 'user';
    mainHeader?: string;
    subHeader?: string;
    gridCaption?: string;
  }
}
