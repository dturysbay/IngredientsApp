<template>
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl my-10 -z-50" >
      <Header/>
      <Drawer/>
      <div class="p-10">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-center ">All recipes</h2>
          <div class="flex gap-4">
            <button @click.stop="drawer=!drawer">
              <img class="w-8" src="/filter.png" alt="filter-icon">
            </button>
          </div>
        </div>

        <div v-if="hits.length!==0">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <Card v-for="item in hits"
                  :key="item.recipe.uri"
                  :img-url="item.recipe.images?.THUMBNAIL?.url"
                  :title="item.recipe.label"
                  :cuisine-types="item.recipe.cuisineType"
            />
          </div>
        </div>
        <div v-else class="d-flex justify-center">
          <h2 class="font-sans">Please select from filters</h2>
        </div>
      </div>
    </div>
</template>

<script setup>
import {onMounted, provide, reactive, ref, watch} from "vue";
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import axios from "axios";
const drawer = ref(false)
const selectedItems = reactive([])
const hits = ref([])

provide("drawer",drawer)
provide("selectedItems",selectedItems)

const fetchItems = async () => {
  try {
    const appKey = 'f0771a0a0d20b855dbd8cd103f527da9';
    const appId = '27c9820c';
    const type = 'any';

    const params = {
      app_key: appKey,
      app_id: appId,
      type: type,
    };

    const cuisineTypes = selectedItems
        .filter(item => item.CODE === 'CUISINE_TYPE')
        .map(item => item.label);

    const mealTypes = selectedItems
        .filter(item => item.CODE === 'MEAL_TYPE')
        .map(item => item.label);

    const health = selectedItems
        .filter(item => item.CODE ==='HEALTH')
        .map(item => item.label)

    const diet = selectedItems
        .filter(item => item.CODE === 'DIET')
        .map(item => item.label)

    const dishType = selectedItems
        .filter(item => item.CODE === 'DISH_TYPE')
        .map(item => item.label)

    if (cuisineTypes.length > 0) {
      params['cuisineType'] = cuisineTypes;
    }

    if (mealTypes.length > 0) {
      params['mealType'] = mealTypes;
    }

    if(health.length > 0){
      params['health'] = health
    }

    if(diet.length > 0){
      params['diet'] = diet
    }

    if(dishType.length > 0){
      params['dishType'] = dishType
    }

    const queryString = Object.entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
          } else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
        })
        .join('&');

    const { data } = await axios.get(`https://api.edamam.com/api/recipes/v2?${queryString}`);
    hits.value = data.hits;
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await fetchItems()
})

watch(selectedItems, fetchItems, { deep: true });

</script >



<!--        <div class="px-80">-->
<!--          <v-chip v-for="(item, index) in selectedItems"-->
<!--                  :key="index"-->
<!--                  class="mr-2 mb-2"-->
<!--                  color="green">-->
<!--            {{ item.label }}-->
<!--          </v-chip>-->
<!--        </div>-->

<!--            <div class="relative">-->
<!--              <img class="absolute left-4 top-3" src="/search.svg" alt="search">-->
<!--              <input-->
<!--                  class="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"-->
<!--                  placeholder="Поиск"-->
<!--                  type="text"-->
<!--              >-->
<!--            </div>-->

<!--/*-->
<!--TODO:-->

<!--1) MAKE REQUEST-->
<!--2) DISPLAY ELEMS-->
<!--3) SEARCH ON THE MAIN PAGE-->
<!--4) ADD SEARCH TO THE DRAWER-->
<!--5) MAKE SLIDER FOR CALORIE-->

<!--*/-->



<!--// const fetchItems = async () => {-->
<!--//   try{-->
<!--//     const appKey = 'f0771a0a0d20b855dbd8cd103f527da9'-->
<!--//     const appId = '27c9820c'-->
<!--//     const type = 'any'-->
<!--//-->
<!--//     const url = `https://api.edamam.com/api/recipes/v2?app_key=${appKey}&cuisineType=asian&type=${type}&app_id=${appId}`-->
<!--//-->
<!--//     const {data} = await axios.get(url)-->
<!--//     hits.value = data.hits-->
<!--//     console.log("here",hits.value)-->
<!--//   }catch (err){-->
<!--//     console.log(err)-->
<!--//   }-->
<!--// }-->