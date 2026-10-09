<script setup lang="ts">
import { FlightService } from "@/services/flight.service";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = Number(route.params.id);

const details = ref<any>();
FlightService.getDepartureDetails(id).then((data) => (details.value = data));
</script>

<template>
  <p>ID: {{ id }}</p>
  <pre>{{ details }}</pre>
</template>
