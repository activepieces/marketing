<template>
  <section
    id="enable-building"
    class="py-24 bg-[#350e3a] relative overflow-hidden z-10 bg-dotted-light"
  >
    <div class="max-w-4xl mx-auto px-4 flex flex-col items-center">
      <!-- Section title -->
      <h2
        class="font-sentient font-bold text-3xl md:text-5xl text-white text-center leading-[1.2] max-w-[560px]"
      >
        Clear path forward. Built-in guidance.
      </h2>

      <!-- Subsection rows -->
      <div class="flex flex-col gap-16 md:gap-[120px] mt-[60px] w-full">
        <!-- 1: Pick a template — text LEFT, visual RIGHT -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full">
          <div class="flex flex-col gap-3 flex-1">
            <div class="self-start">
              <span
                class="inline-flex items-center justify-center bg-white rounded-full px-4 py-0.5 font-sentient font-bold text-[19px] text-[#350e3a]"
              >
                1
              </span>
            </div>
            <h3
              class="font-sentient font-bold text-xl md:text-[28px] text-white leading-[1.2]"
            >
              Pick a template
            </h3>
            <p class="text-base text-white/80 leading-[1.4]">
              Stop waiting for teams to "figure out" AI. Our curated template
              library gives HR, Finance, Marketing, Sales, and Operations
              concrete automations to build—from simple everyday tasks to
              advanced multi-step workflows.
            </p>
          </div>
          <div class="w-full md:w-[400px] md:shrink-0">
            <PagesProductAdoptionGuidanceTemplateStack />
          </div>
        </div>

        <!-- 2: Get personal onboarding — visual LEFT, text RIGHT -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full">
          <div class="w-full md:w-[400px] md:shrink-0">
            <PagesProductAdoptionGuidanceSteps />
          </div>
          <div class="flex flex-col gap-3 flex-1">
            <div class="self-start">
              <span
                class="inline-flex items-center justify-center bg-white rounded-full px-4 py-0.5 font-sentient font-bold text-[19px] text-[#350e3a]"
              >
                2
              </span>
            </div>
            <h3
              class="font-sentient font-bold text-xl md:text-[28px] text-white leading-[1.2]"
            >
              Get personal onboarding
            </h3>
            <p class="text-base text-white/80 leading-[1.4]">
              Generic training doesn't work. Our platform learns each user's
              role, skill level, and past activity to deliver personalized
              automation ideas, targeted resources, and timely nudges that keep
              momentum going.
            </p>
          </div>
        </div>

        <!-- 3: Schedule a call — text LEFT, visual RIGHT -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full">
          <div class="flex flex-col gap-3 flex-1">
            <div class="self-start">
              <span
                class="inline-flex items-center justify-center bg-white rounded-full px-4 py-0.5 font-sentient font-bold text-[19px] text-[#350e3a]"
              >
                3
              </span>
            </div>
            <h3
              class="font-sentient font-bold text-xl md:text-[28px] text-white leading-[1.2]"
            >
              Schedule a call with AI experts when needed
            </h3>
            <p class="text-base text-white/80 leading-[1.4]">
              When your users get stuck, they don't need to come to you. Our AI
              Automation Specialists are available directly inside the
              platform—your teams can book calls, get help, and keep building
              without burdening your IT or support teams.
            </p>
          </div>
          <div class="w-full md:w-[400px] md:shrink-0">
            <PagesProductAdoptionGuidanceExpertCard />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
