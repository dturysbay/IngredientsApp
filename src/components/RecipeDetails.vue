<template>
  <div>
    <h2 class="font-italic font-bold">{{recipeDetails.label}}</h2>
    <div class="p-2">
      <div>
        <v-chip v-for="(detail,idx) in recipeDetails.mealType" :key="idx" class="mr-2 mb-2" color="teal">
          {{detail}}
        </v-chip>
      </div>
     <div>
       <v-chip v-for="(detail,idx) in recipeDetails.cuisineType" :key="idx" class="mr-2 mb-2" color="green">
         {{detail}}
       </v-chip>
     </div>
      <div>
        <v-chip v-for="(detail,idx) in recipeDetails.dietLabels" :key="idx" class="mr-2 mb-2" color="cyan">
          {{detail}}
        </v-chip>
      </div>
      <div>
        <v-chip v-for="(detail,idx) in recipeDetails.healthLabels" :key="idx" class="mr-2 mb-2" color="lightBlue">
          {{detail}}
        </v-chip>
      </div>
      <div>
        <v-chip v-for="(detail,idx) in recipeDetails.dishType" :key="idx" class="mr-2 mb-2" color="lightGreen">
          {{detail}}
        </v-chip>
      </div>
      <div>
        <v-chip v-for="(detail,idx) in recipeDetails.cautions" :key="idx" class="mr-2 mb-2" color="red">
          {{detail}}
        </v-chip>
      </div>
    </div>
    <div class="d-flex items-center w-full">
      <div class="mr-5">
        <v-img width="400" height="400"  :src="recipeDetails.images.THUMBNAIL.url"></v-img>
      </div>

      <div class="max-w-lg mx-auto ml-2">
        <div>
          <v-list  v-for="(ingredient,idx) in recipeDetails.ingredientLines" :key="ingredient" class="font-italic mb-2">
            <span class="font-bold">{{idx+1}})</span>{{ingredient}}
          </v-list>
        </div>
        <div>
          <div class="d-flex">
            <h2 class="font-mono mr-2">Calories:</h2>
            <h2 class="font-italic">{{recipeDetails.calories}}</h2>
          </div>
         <div class="d-flex">
           <h2 class="font-mono mr-2">Total time:</h2>
           <h2 class="font-italic">{{recipeDetails.totalTime}}</h2>
         </div>

          <div class="d-flex">
            <h2 class="font-mono mr-2">Total Weight:</h2>
            <h2 class="font-italic">{{recipeDetails.totalWeight}}</h2>
          </div>

        </div>

      </div>
    </div>
    <a :href="recipeDetails.url" class="text-blue-500 hover:text-blue-700">For more</a>
  </div>
</template>

<script setup>
import {inject} from "vue";
const recipeDetails = inject("recipeDetails")
</script>