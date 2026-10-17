<script setup lang="ts">
import type { DetailsModel } from "@/models/details-model";
import { FlightService } from "@/services/flight.service";
import { formatDate } from "@/utils";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const details = ref<DetailsModel>();

const brojPreostalihLetova = computed(() => {
  return details.value?.other.length ?? 0;
});

const vratiNaPocetak = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

watch(
  () => route.params.id,
  async (noviId) => {
    details.value = await FlightService.getDepartureDetails(Number(noviId));
  },
  { immediate: true },
);
</script>

<template>
  <div class="container py-5" v-if="details">
    <!-- Selected flight -->
    <div class="row justify-content-center mb-5">
      <div class="col-12">
        <div class="card border-0 shadow rounded-4 overflow-hidden">
          <div class="row g-0">
            <!-- Destination image - left side -->
            <div class="col-12 col-lg-5">
              <div class="h-100 position-relative">
                <img
                  :src="details.imgUrl"
                  :alt="details.destination"
                  class="w-100 h-100"
                  style="min-height: 420px; object-fit: cover"
                />

                <!-- Image overlay -->
                <div
                  class="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style="
                    background: linear-gradient(
                      transparent,
                      rgba(0, 0, 0, 0.7)
                    );
                  "
                >
                  <span
                    class="badge bg-white text-primary rounded-pill px-3 py-2 mb-2"
                  >
                    <i class="bi bi-airplane me-1"></i>
                    Informacije o letu
                  </span>

                  <h2 class="fw-bold mb-1">
                    {{ details.destination }}
                  </h2>

                  <div class="small opacity-75">
                    Broj leta: {{ details.flightNumber }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Flight details - right side -->
            <div class="col-12 col-lg-7">
              <div class="card-body p-4 p-xl-5">
                <div class="mb-4">
                  <span
                    class="badge text-bg-primary rounded-pill px-3 py-2 mb-3"
                  >
                    Izabrani let
                  </span>

                  <h3 class="fw-bold mb-2">Detalji putovanja</h3>

                  <p class="text-secondary mb-0">
                    Informacije o planiranom i procenjenom polasku.
                  </p>
                </div>

                <hr class="text-secondary opacity-25 my-4" />

                <!-- Scheduled departure -->
                <div class="bg-light rounded-4 p-4 mb-3">
                  <div class="d-flex align-items-start gap-3">
                    <div class="rounded-3 bg-white shadow-sm p-3 text-primary">
                      <i class="bi bi-calendar3 fs-4"></i>
                    </div>

                    <div class="flex-grow-1">
                      <div class="text-secondary small mb-2">
                        Planirani polazak
                      </div>

                      <div class="fs-5 fw-bold">
                        {{ formatDate(details.scheduledAt) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Estimated departure -->
                <div class="bg-light rounded-4 p-4">
                  <div class="d-flex align-items-start gap-3">
                    <div class="rounded-3 bg-white shadow-sm p-3 text-primary">
                      <i class="bi bi-clock-history fs-4"></i>
                    </div>

                    <div class="flex-grow-1">
                      <div class="text-secondary small mb-2">
                        Procenjeno vreme polaska
                      </div>

                      <div class="fs-5 fw-bold">
                        {{
                          details.estimatedAt
                            ? formatDate(details.estimatedAt)
                            : "Još nije dostupno"
                        }}
                      </div>

                      <div class="text-secondary small mt-2">
                        <i class="bi bi-arrow-repeat me-1"></i>
                        Ažurirano prema dostupnim podacima
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div
                  class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 pt-3 border-top"
                >
                  <span class="text-secondary small">
                    <i class="bi bi-hash me-1"></i>
                    ID leta: {{ details.id }}
                  </span>

                  <RouterLink
                    to="/"
                    class="btn btn-primary rounded-pill px-4 py-2"
                  >
                    <i class="bi bi-arrow-left me-2"></i>
                    Nazad na letove
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other flights to the same destination -->
    <section v-if="details.other?.length">
      <div
        class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4"
      >
        <div>
          <h2 class="h3 fw-bold mb-2">
            Više letova za {{ details.destination }}
          </h2>

          <p class="text-secondary mb-0">
            Uporedi ostale dostupne polaske ka istoj destinaciji.
          </p>
        </div>

        <span class="badge text-bg-light border rounded-pill px-3 py-2">
          {{ brojPreostalihLetova }} ostalih letova
        </span>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4">
        <div v-for="flight in details.other" :key="flight.id" class="col">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              :src="details.imgUrl"
              :alt="details.destination"
              class="card-img-top"
              style="height: 150px; object-fit: cover"
            />

            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-start gap-2 mb-3"
              >
                <span class="badge text-bg-light border">
                  {{ flight.flightNumber }}
                </span>

                <span class="badge text-bg-primary bg-opacity-10 text-primary">
                  Polazak
                </span>
              </div>

              <h3 class="h5 fw-bold mb-3">
                {{ details.destination }}
              </h3>

              <div class="d-flex align-items-start gap-3 mb-3">
                <i class="bi bi-calendar3 text-primary fs-5"></i>

                <div>
                  <div class="small text-secondary">Datum polaska</div>

                  <div class="fw-semibold">
                    {{ formatDate(flight.scheduledAt) }}
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-start gap-3">
                <i class="bi bi-clock text-primary fs-5"></i>

                <div>
                  <div class="small text-secondary">Vreme polaska</div>

                  <div class="fw-semibold">
                    {{ formatDate(flight.scheduledAt) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer bg-white border-0 px-4 pb-4 pt-0">
              <RouterLink
                :to="`/details/${flight.id}`"
                @click="vratiNaPocetak()"
                class="btn btn-outline-primary w-100 rounded-pill"
              >
                Detalji leta
                <i class="bi bi-arrow-right ms-2"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- No other flights -->
    <div v-else class="text-center py-5">
      <i class="bi bi-airplane display-4 text-secondary"></i>

      <h2 class="h4 fw-bold mt-3">Nema drugih dostupnih letova</h2>

      <p class="text-secondary mb-0">
        Trenutno nema drugih polazaka za ovu destinaciju.
      </p>
    </div>
  </div>
</template>
