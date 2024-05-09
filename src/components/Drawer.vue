<template>
<div class="my-5">
    <v-card>
      <v-layout>
<!--        <v-overlay>-->
          <v-navigation-drawer
            permanent
            v-model="drawer"
            :width="500"
            class="v-navigation-drawer p-5"
        >
          <div class="d-flex justify-end mb-5">
            <v-btn @click="drawer = false" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-chip v-for="(item, index) in selectedItems"
                  :key="index"
                  closable
                  @click:close.stop="removeItem(item)"
                  class="mr-2 mb-2"
                  :color="item.CODE==='MEAL_TYPE'? 'teal' :
                        item.CODE==='DIET'? 'cyan' :
                        item.CODE==='HEALTH'? 'lightBlue' :
                        item.CODE==='DISH_TYPE'? 'lightGreen': 'green'"

          >
            {{ capitalizeFirstLetter(item.label) }}
          </v-chip>


          <v-expansion-panels >
            <v-expansion-panel v-for="(category, ind) in items" :key="ind">
              <v-expansion-panel-title>
                <v-list class="font-serif font-bold">
                  {{category.title}}
                </v-list>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list-item v-for="(item,idx) in category.arr"
                             :key="idx"
                             @click="selectItem(item,category)"
                             class="font-serif"
                >
                  <v-list-item-title>{{ capitalizeFirstLetter(item) }}</v-list-item-title>
                </v-list-item>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-navigation-drawer>
<!--        </v-overlay>-->
      </v-layout>
    </v-card>

</div>
</template>

<script setup>
import {inject, reactive} from 'vue'
const drawer = inject("drawer");
const selectedItems = inject("selectedItems")
const items = reactive([
  { title: 'Meal type',CODE:'MEAL_TYPE',arr:reactive(['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'])},
  { title: 'Diet',CODE:'DIET',arr:reactive(['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'])},
  { title: 'Cuisine type', CODE: "CUISINE_TYPE", arr: reactive([
      'American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian',
      'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American',
      'South East Asian'])
  },
  { title: 'Health', CODE: "HEALTH", arr: reactive(['alcohol-cocktail',
      'alcohol-free', 'celery-free', 'crustacean-free',
      'dairy-free', 'DASH', 'egg-free', 'fish-free', 'fodmap-free', 'gluten-free', 'immuno-supportive', 'keto-friendly',
      'kidney-friendly', 'kosher', 'low-fat-abs', 'low-potassium', 'low-sugar', 'lupine-free', 'Mediterranean',
      'mollusk-free', 'mustard-free', 'no-oil-added', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free',
      'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious', 'sulfite-free', 'tree-nut-free', 'vegan', "vegetarian", 'wheat-free']) },
  { title: 'Dish type',CODE:'DISH_TYPE',arr:reactive(['Biscuits and cookies', 'Bread', 'Cereals',
      'Condiments and sauces', 'Desserts', 'Drinks', 'Main course', 'Pancake', 'Preps', 'Preserve', 'Salad', 'Sandwiches',
      'Side dish', 'Soup', 'Starter', 'Sweets'])}
]);

const selectItem = (item, category) => {
  if (category) {
    selectedItems.push({ CODE: category.CODE, label: item });
    const itemIndex = category.arr.indexOf(item);
    if (itemIndex !== -1) {
      category.arr.splice(itemIndex, 1);
      category.arr.sort();
    }
  }

  console.log("selectedItems",selectedItems)
};

const removeItem = (item) => {
  const categoryIndex = items.findIndex(category => category.CODE === item.CODE)
  items[categoryIndex].arr.push(item.label)
  selectedItems.splice(item,1)
  items[categoryIndex].arr.sort()
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

