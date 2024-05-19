<script setup lang="ts">
import {type RouteMeta, useRoute} from "vue-router";
interface MetaType extends RouteMeta {
  title: string
}
const route = useRoute();

</script>

<template>
  <div class="gvb_breadcrumbs">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in route.matched">
        {{(item.meta as MetaType).title}}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
