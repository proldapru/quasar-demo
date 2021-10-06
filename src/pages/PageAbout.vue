<template>
  <q-page class="q-pa-lg">
    <div class="row q-pa-sm text-h5">Моё первое приложение на Quasar</div>
    <div class="row q-pa-sm">
     <p><strong>Version 0.0.3</strong>
        <ul>
          <li>Приложение переписано на TypeScript.</li>
          <li>Используются библиотеки Vue3 (3.2.4), Vuex4 (4.0.2), Quasar2 (2.0.4).</li>
          <li>Используются классы и декораторы из модулей vue-property-decorator (10.0.0-rc.3), vue-class-component (8.0.0-rc1), vuex-module-decorators (1.0.1)</li>
        </ul>
     </p>
      <p><strong>Промежуточные изыскания (commit 2ed7fc4)</strong>
        <ul>
          <li>Работа с Vuex переписана с использованием vuex-module-decorators.</li>
          <li>Работа с компонентами переписана с использованием vue-property-decorator. Не смог разобраться:
            <ol>
              <li>Provide/inject метода компонента (не свойства). В итоге от их использования для подмены subHeader пришлось отказаться и вернуться в Vuex-модулю =( .</li>
            </ol>
          </li>
        </ul>
      </p>
      <p><strong>Промежуточные изыскания (commit 20379c3)</strong>
        <ul>
         <li>Попытка переписать код на "чистый" TypeScript (без дополнительных модулей). Не смог разобраться:
           <ol>
             <li>Использование namespased-модулей Vuex в Options API.</li>
             <li>Использование механизма provide/inject в Options API, в Javascript всё работало из коробки.</li>
           </ol>
         </li>
         <li>Тем не менее, после трансляции в Javascript приложение работало =).</li>
        </ul>
      </p>
     <p><strong>Version 0.0.2</strong>
        <ul>
         <li>Решена проблема с заменой заголовков mainHeader и subHeader приложения. mainHeader меняется через вычисляемое свойство на основе $route.meta, subHeader (поскольку составной) — через provide/inject метода из MainLayout. В связи с этим отказ от Vuex-модуля app и связанной с ним логики.</li>
        </ul>
      </p>
      <p><strong>Version 0.0.1</strong>
        <ul>
          <li>Vue3 с Options API (внешне практически то же самое, что Vue2), Quasar 2.0.4.</li>
          <li>Общий компонент для работы с правами по задачам и по пользователям <strong>PagePermissions</strong> и его "дочерние" компоненты <strong>ModPermForm</strong> и <strong>SetPermObject</strong>.</li>
          <li>Vuex с двумя модулями:
            <ul>
              <li>permissions — работа с правами на задачи, в том числе чтение/фиктивная запись данных с API через axios;</li>
              <li>app — попытка поработать с заголовком приложения. Через Quasar-хук preFecth получилось не совсем так, как хотелось (из-за того, что компонент один, preFetch не отрабатывает переход на тот же компонент), а через vue-router-хуки не разобрался, как обратиться к Quasar-store.</li>
            </ul>
          </li>
          <li>Vue-router — отрабатываются все маршруты с любого валидного URI.</li>
        </ul>
      </p>
  </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageAbout',
})
</script>
