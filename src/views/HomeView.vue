<script setup lang="ts">
import type { FlightModel } from "@/models/flight-model";
import { FlightService } from "@/services/flight.service";
import { formatDate } from "@/utils";
import { ref } from "vue";

const flights = ref<FlightModel[]>([]);

FlightService.getDepartures().then((data) => (flights.value = data));
</script>

<template>
  <div class="container py-5">
    <div class="mb-5">
      <h1 class="display-5 fw-bold text-primary mb-2">Flights</h1>
      <p class="text-body-secondary fs-5 mb-0">
        Explore available flights and destinations.
      </p>
    </div>

    <div class="row g-4">
      <div v-for="f in flights" :key="f.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
          <!-- Image -->
          <img
            :src="f.imgUrl"
            :alt="f.destination"
            class="card-img-top object-fit-cover"
            style="height: 220px"
          />

          <div class="card-body d-flex flex-column p-4">
            <!-- Destination -->
            <div class="mb-4">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge text-bg-primary rounded-pill px-3 py-2">
                  Departure
                </span>

                <small class="text-body-secondary"> Flight </small>
              </div>

              <h3 class="card-title fw-semibold mb-1">
                {{ f.destination }}
              </h3>

              <p class="text-body-secondary mb-0">
                Scheduled flight to {{ f.destination }}
              </p>
            </div>

            <!-- Flight information -->
            <div class="border-top border-bottom py-3 mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <small class="text-body-secondary d-block">
                    Flight number
                  </small>
                  <span class="fw-semibold">
                    {{ f.flightNumber }}
                  </span>
                </div>

                <div class="text-end">
                  <small class="text-body-secondary d-block"> Scheduled </small>
                  <span class="fw-semibold">
                    {{ formatDate(f.scheduledAt) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Button -->
            <RouterLink
              :to="`/details/${f.id}`"
              class="btn btn-primary btn-lg w-100 rounded-3 fw-semibold mt-auto"
            >
              View flight details
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
