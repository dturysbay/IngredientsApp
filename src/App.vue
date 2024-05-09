<template>
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl my-10 -z-50" >
      <Header/>
      <Drawer/>
      <div class="p-10">
        <router-view>
        </router-view>
      </div>

    </div>
</template>

<script setup>
import { provide, reactive, ref} from "vue";
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";
const drawer = ref(false)
const selectedItems = reactive([])
const hits = ref([])
const recipeDetails = ref({})
const search = ref('')

provide("hits",hits)
provide("drawer",drawer)
provide("selectedItems",selectedItems)
provide("recipeDetails",recipeDetails)
provide("search",search)

</script >