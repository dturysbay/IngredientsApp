<template>
<div>
    <v-card class="cursor-pointer hover:-translate-y-2 hover:shadow-xl transition duration-300 ease-in-out">
      <div class="p-5">
        <v-img width="200" height="200" cover :src="imgUrl" aspect-ratio="16/9"></v-img>
        <v-card-text class="font-serif mb-5" style="height: 50px">
          {{title}}
        </v-card-text>

<!--        <v-chip v-for="cuisineType in cuisineTypes" color="green" class="m-1">-->
<!--          {{cuisineType}}-->
<!--        </v-chip>-->
      </div>

    </v-card>
</div>


</template>
<script setup>
defineProps({
  title:String,
  imgUrl:String,
  // cuisineTypes:[String]
})
</script>
