<script setup lang="ts">
import { QuestionService } from "@/services/question.service.ts";
import { ref } from "vue";

const questions = ref<any[]>();

QuestionService.getAll().then((rsp) => (questions.value = rsp.data));
</script>

<template>
  <ul>
    <h3>ID : PITANJE</h3>
    <li
      v-for="q in questions"
      :class="q.questionId % 2 === 0 ? 'zolto' : 'gomnjivo'"
    >
      {{ q.questionId }} : {{ q.text }}
    </li>
  </ul>
  <pre>{{ questions }}</pre>
</template>

<style>
.zolto {
  color: yellow;
}
.gomnjivo {
  color: brown;
}
</style>
