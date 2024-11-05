<script setup>

</script>

<template>
  <section class="py-[10px] dark:bg-gray-900 max-w-[80%] mx-auto rounded-t-[20px]">
    <div class="mx-auto max-w-screen-xl px-4">
      <h2 class="mb-14 text-2xl tracking-tight font-bold text-gray-900 dark:text-white text-center">
        Trusted by companies from startups to Fortune 50
      </h2>
      <div class="grid grid-cols-1 gap-20 gap-y-14 text-gray-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 dark:text-gray-400 opacity-100 brightness-0">
        <!-- List of logos displayed directly -->
        <div class="relative h-6">
          <img src="/logos/posthog.svg" alt="Posthog" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/redbull.svg" alt="Redbull" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/coherent.svg" alt="Coherent" class="m-auto h-6" />
        </div>-->
        <div class="relative h-6">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/gratte.svg" alt="Gratte" class="m-auto h-6" />
        </div>-->
        <div class="relative h-6">
          <img src="/logos/contentful.svg" alt="Contentful" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/formstack.svg" alt="Formstack" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/verloop.svg" alt="Verloop" class="m-auto h-6" />
        </div>-->
        <div class="relative h-6">
          <img src="/logos/roblox.svg" alt="Roblox" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/trc.svg" alt="TRC" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/aeropost.svg" alt="Aeropost" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/ucsd.svg" alt="UCSD" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/ie.svg" alt="IE" class="m-auto h-6" />
        </div>-->
        <div class="relative h-6">
          <img src="/logos/clickup.svg" alt="ClickUp" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/snappy.svg" alt="Snappy" class="m-auto h-6" />
        </div>-->
        <div class="relative h-6">
          <img src="/logos/alan.svg" alt="Alan" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/nedap.svg" alt="Nedap" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/squire.svg" alt="Squire" class="m-auto h-6" />
        </div>-->
        <div class="relative h-6">
          <img src="/logos/docusign.svg" alt="DocuSign" class="m-auto h-6" />
        </div>
        <div class="relative h-6">
          <img src="/logos/pipedrive.svg" alt="Pipedrive" class="m-auto h-6" />
        </div>
        <!--<div class="relative h-6">
          <img src="/logos/k7security.svg" alt="K7Security" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/pagaleve.svg" alt="Pagaleve" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/trustflight.svg" alt="TrustFlight" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/plivo.svg" alt="Plivo" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/kiel.svg" alt="Kiel" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/experience.com.svg" alt="Experience.com" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/vial.svg" alt="Vial" class="m-auto h-6" />
        </div>-->
        <!--<div class="relative h-6">
          <img src="/logos/ipaa.svg" alt="IPAA" class="m-auto h-6" />
        </div>-->
      </div>
    </div>
  </section>
</template>

<style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
