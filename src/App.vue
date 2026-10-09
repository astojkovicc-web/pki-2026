<script setup lang="ts"></script>

<template>
  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
    <div class="container py-2">
      <!-- BRAND -->
      <RouterLink
        to="/"
        class="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary fs-4"
      >
        <span class="fs-3">✈️</span>
        <span>BelgradeFlights</span>
      </RouterLink>
      <!-- /BRAND -->

      <!-- MOBILE MENU -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- /MOBILE MENU -->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- LINKS -->
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active fw-semibold px-3">
              Flights
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/about" class="nav-link px-3"> About </RouterLink>
          </li>
        </ul>
        <!-- /LINKS -->

        <!-- SEARCH -->
        <form class="d-flex me-lg-3 mb-3 mb-lg-0">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search flights"
            aria-label="Search flights"
          />

          <button class="btn btn-primary px-4" type="submit">Search</button>
        </form>
        <!-- /SEARCH -->

        <!-- BOOK FLIGHT -->
        <RouterLink to="/" class="btn btn-outline-primary px-4">
          ✈️ Book a flight
        </RouterLink>
        <!-- /BOOK FLIGHT -->
      </div>
    </div>
  </nav>
  <!-- /NAVBAR -->

  <!-- PAGE CONTENT -->
  <div class="container">
    <div class="row">
      <RouterView />
    </div>
  </div>
  <!-- /PAGE CONTENT -->
</template>
