<template>
  <q-page class="q-pa-lg">
    <div class="row q-pa-sm text-h5">О программе</div>
    <div class="row q-pa-sm text-h6">Моё первое приложение на Quasar</div>
    <div class="row q-pa-sm">
      <p><u>Что сделано:</u>
        <ul>
          <li>Vue3 с Options API (внешне практически то же самое, что Vue2), Quasar 2.0.4.</li>
          <li>Общий компонент для работы с правами по задачам и по пользователям <strong>PagePermissions.vue</strong> и его "дочерние" компоненты <strong>ModPermForm.vue</strong> и <strong>SetPermObject.vue</strong>.</li>
          <li>Vuex с двумя модулями:
            <ul>
              <li>permissions — работа с правами на задачи, в том числе чтение/фиктивная запись данных с API через axios;</li>
              <li>app — попытка поработать с заголовком приложения. Через Quasar-хук preFecth получилось не совсем так, как хотелось (из-за того, что компонент один preFetch не отрабатывает переход на тот же компонент), а через vue-router-хуки не разобрался, как обратиться к Quasar-store.</li>
            </ul>
          </li>
          <li>Vue-router — отрабатываются все маршруты с любого валидного URI.</li>
        </ul>
      </p>
      <p><u>Что не сделано:</u>
        <ul>
         <li>TypeScript — в процессе изучения.</li>
        </ul>
      </p>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
// import { setAppHeader } from '../service.js';

export default defineComponent({
  name: 'PageAbout',

  // preFetch ({ store, currentRoute /*, redirect, previousRoute, ssrContext, urlPath, publicPath */ }) {
  //   setAppHeader(store, currentRoute)
  // }

})
</script>
