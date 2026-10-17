<script setup lang="ts">
import { ref } from "vue";

const email = ref<string>("");
const password = ref<string>("");

function login(e: SubmitEvent) {
  alert(e);
  console.log(e);
}
</script>

<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <!-- Leva strana: fotografija aerodroma -->
      <div
        class="col-lg-7 d-none d-lg-flex flex-column justify-content-center p-5 text-white"
        style="
          background:
            linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.05)),
            url(&quot;https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85&quot;)
              center / cover no-repeat;
          min-height: 100vh;
        "
      >
        <h1 class="display-4 fw-bold">Your journey starts here.</h1>
        <p class="fs-5 mb-0">
          Discover new destinations and make every journey count.
        </p>
        <p class="small mt-4 mb-0 opacity-75">FlightHub — Explore the world.</p>
      </div>

      <!-- Desna strana: forma -->
      <div
        class="col-12 col-lg-5 d-flex align-items-center justify-content-center bg-light p-4 p-md-5"
      >
        <div class="w-100" style="max-width: 420px">
          <div class="mb-5">
            <span class="badge text-bg-primary rounded-pill px-3 py-2 mb-3">
              FLIGHTHUB
            </span>
            <h2 class="fw-bold mb-2">Welcome back</h2>
            <p class="text-secondary">Sign in to continue your journey.</p>
          </div>

          <form @submit.prevent="login">
            <div class="mb-4">
              <label for="email" class="form-label fw-semibold">
                Email address
              </label>
              <input
                type="email"
                class="form-control form-control-lg"
                id="email"
                v-model="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div class="mb-4">
              <div class="d-flex justify-content-between">
                <label for="password" class="form-label fw-semibold">
                  Password
                </label>
                <a href="#" class="small text-decoration-none">
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                class="form-control form-control-lg"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-lg w-100 fw-semibold"
            >
              Sign in
            </button>
          </form>

          <div class="border-top mt-5 pt-4 text-center">
            <p class="text-secondary small mb-0">
              &copy; 2026 FlightHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
