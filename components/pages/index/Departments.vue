<script setup>
// import { onMounted } from "vue";
// import { initAccordions } from "flowbite";

// onMounted(() => {
//   initAccordions();
// });
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20 sm:text-center">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We didn't reinvent the wheel</h2>
      <p class="font-light text-gray-500 sm:text-lg md:px-20 lg:px-38 xl:px-48 dark:text-gray-400">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
    
      <div class="flex flex-col gap-4 mt-8 sm:mt-12">
        <div class="flex gap-x-4">
            <!-- First row: first div takes up the space of exactly two normal divs including the gap -->
            <div class="flex-grow border" style="flex-basis: calc(66.666% - 8px);">Long div spanning two columns</div>
            <div class="flex-1 border">Normal div</div>
        </div>
        
        <div class="flex gap-x-4">
            <!-- Second row: three equal divs -->
            <div class="flex-1 border">Div 1</div>
            <div class="flex-1 border">Div 2</div>
            <div class="flex-1 border">Div 3</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
