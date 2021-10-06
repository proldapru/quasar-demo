import {
  getModule,
  VuexModule,
  Mutation,
  Module,
} from 'vuex-module-decorators';
import store from '.';

@Module({ dynamic: true, namespaced: true, store, name: 'Application' })
class Application extends VuexModule {
  subHeader = '';

  @Mutation
  setSubHeader(text: string) {
    this.subHeader = text;
  }
}

export default getModule(Application);
