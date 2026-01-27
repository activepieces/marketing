<script setup></script>

<template>
  <div class="relative">
    <!-- Top gradient fade -->
    <div
      class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"
    ></div>

    <!-- AI Agents Showcase (Full Width) -->
    <PagesIndexAiAgentsShowcase />

    <!-- Curved separator between AI Agents and AI Adoption sections -->
    <SectionSeparator
      top-color="red"
      bottom-color="green"
      stroke1-color="rgba(0, 0, 255, 0.2)"
      stroke2-color="rgba(0, 0, 255, 0.4)"
      stroke3-color="rgba(0, 0, 255, 0.6)"
      stroke4-color="rgba(0, 0, 255, 0.8)"
      shadow-color="yellow"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
    />

    <!-- AI Adoption Showcase (Full Width Playing Cards) -->
    <PagesIndexAiAdoptionShowcase />

    <!-- Governance & Control Showcase -->
    <PagesIndexGovernanceShowcase />

    <!-- Deployment & Cost Showcase -->
    <PagesIndexDeploymentShowcase />
  </div>
</template>
