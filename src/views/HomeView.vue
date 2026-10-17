<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import type { FlightModel } from "@/models/flight-model";
import { FlightService } from "@/services/flight.service";
import { formatDate } from "@/utils";
import { ref, watch } from "vue";

const flights = ref<FlightModel[]>([]);
const filtered = ref<FlightModel[]>([]);
const isLoading = ref(true);
const search = ref({
  text: "",
  from: "any",
  to: "any",
});

FlightService.getDepartures()
  .then((data) => {
    ((flights.value = data), (filtered.value = data));
  })
  .finally(() => {
    isLoading.value = false;
  });

function getAvailableDates() {
  const dates = new Set<string>();
  flights.value?.forEach((f) => {
    dates.add(f.scheduledAt.split("T")[0]!);
  });

  return Array.from(dates);
}

watch(search.value, () => {
  filtered.value = flights.value
    .filter((f) => {
      return (
        f.destination
          .toLocaleLowerCase()
          .includes(search.value.text.toLocaleLowerCase()) ||
        f.flightNumber
          .toLocaleLowerCase()
          .replace(/\s+/g, "")
          .includes(search.value.text.toLocaleLowerCase().replace(/\s+/g, ""))
      );
    })
    .filter((f) => {
      if (search.value.from == "any") {
        return true;
      }
      return (
        new Date(f.scheduledAt).getTime() >=
          new Date(search.value.from).getTime() &&
        (new Date(f.scheduledAt).getTime() <=
          new Date(search.value.to).setHours(23, 59, 59, 999) ||
          search.value.to == "any")
      );
    });
});

const resetFilter = () => {
  search.value.text = "";
  search.value.from = "any";
  search.value.to = "any";

  filtered.value = flights.value;
};
</script>

<template>
  <div class="container py-5">
    <div class="card mb-4">
      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-body p-4">
          <div class="row g-3 align-items-end pt-2 pb-3">
            <!-- SEARCH -->
            <div class="col-12 col-md-5">
              <label for="search" class="form-label fw-bold text-primary ms-1">
                Search flights
              </label>
              <input
                type="search"
                class="form-control form-control-lg"
                id="search"
                placeholder="Flight number or destination..."
                v-model="search.text"
              />
            </div>

            <!-- FROM DATE -->
            <div class="col-12 col-md-2">
              <label for="search" class="form-label fw-bold text-primary ms-1">
                From
              </label>
              <select
                class="form-select form-select-lg"
                id="fromDate"
                v-model="search.from"
              >
                <option value="any">Any date</option>
                <option v-for="date in getAvailableDates()" :value="date">
                  {{ date }}
                </option>
              </select>
            </div>

            <!-- TO DATE -->
            <div class="col-12 col-md-2">
              <label for="search" class="form-label fw-bold text-primary ms-1">
                To
              </label>
              <select
                class="form-select form-select-lg"
                id="toDate"
                v-model="search.to"
              >
                <option value="any">Any date</option>
                <option v-for="date in getAvailableDates()" :value="date">
                  {{ date }}
                </option>
              </select>
            </div>

            <!-- RESET -->
            <div class="col-12 col-md-3">
              <button
                type="button"
                class="btn btn-primary btn-lg w-100"
                @click="resetFilter()"
              >
                <i class="bi bi-arrow-counterclockwise me-2"></i>Reset filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfoCard
      title="Loading"
      headerBgColor="#288bd1"
      v-if="isLoading"
      class="text-center"
    >
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 3rem; height: 3rem"
      >
        <span class="visually-hidden">Učitavanje...</span>
      </div>
      <p class="text-body-secondary mt-3 fs-5">
        Učitavanje podataka o letovima...
      </p>
    </InfoCard>
    <div v-if="filtered.length > 0" class="mb-5">
      <h1 class="display-5 fw-bold text-primary mb-2">Flights</h1>
      <p class="text-body-secondary fs-5 mb-0">
        Explore available flights and destinations.
      </p>
    </div>
    <div class="row g-4">
      <div v-for="f in filtered" :key="f.id" class="col-12 col-md-6 col-lg-4">
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
    <InfoCard
      v-if="filtered.length == 0 && filtered.length < flights.length"
      title="Greška!"
      headerBgColor="#e03641"
    >
      <p>
        Nismo pronašli ništa pod tim kriterijumom. Molim Vas, pokušajte nešto
        drugo.
      </p>
      <button
        type="button"
        class="btn btn-dark text-white"
        @click="resetFilter()"
      >
        Reset filters
      </button>
    </InfoCard>
  </div>
</template>
