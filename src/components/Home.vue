<template>
    <div class="d-flex justify-between items-center">
      <h2 class="text-xl font-bold text-center ">All recipes</h2>
      <div style="width: 100%" class="flex gap-4 w-auto">
        <button @click.stop="drawer=!drawer">
          <img class="w-8" src="/filter.png" alt="filter-icon">
        </button>
        <div class="flex-1">
          <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              style="width: 200px"
          ></v-text-field>
        </div>

      </div>
    </div>

    <div v-if="hits.length!==0">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <Card v-for="(item) in hits"
                :key="item.recipe.uri"
                :title="item.recipe.label"
                :img-url="item.recipe.images?.THUMBNAIL?.url"
                :cuisine-types="item.recipe.cuisineType"
                @click="viewRecipe(item)"
          />
      </div>
    </div>
    <div v-else class="d-flex justify-center">
      <h2 class="font-sans">Please select from filters</h2>
    </div>

</template>

<script setup>
import Card from "@/components/Card.vue";
import {inject, onMounted, watch} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const drawer = inject('drawer')
const hits = inject('hits')
const selectedItems = inject("selectedItems")
const recipeDetails = inject("recipeDetails")
const search = inject("search")

const fetchItems = async () => {
  try {
    const appKey = 'f0771a0a0d20b855dbd8cd103f527da9';
    const appId = '27c9820c';
    const type = 'any';

    const params = {
      app_key: appKey,
      app_id: appId,
      type: type,
      q:search.value
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
const router = useRouter();

const viewRecipe = (item) => {
  const removeSubstring = 'http://www.edamam.com/ontologies/edamam.owl#recipe_'
  const id = item.recipe.uri.replace(removeSubstring,'')
  console.log(item)
  recipeDetails.value = item.recipe
  router.push({ name: 'RecipeDetails', params: { id: id} })
}

onMounted(async () => {
  await fetchItems()
})
watch(selectedItems,fetchItems,{deep:true})
watch(search,fetchItems,{deep:true})

</script>