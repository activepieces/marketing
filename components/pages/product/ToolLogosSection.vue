<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const { piecesCount } = usePiecesCount();

const columns = reactive([
  [
    "slack.png",
    "google-sheets.png",
    "notion.png",
    "hubspot.png",
    "openai.png",
    "airtable.png",
  ],
  [
    "gmail.png",
    "discord.png",
    "stripe.png",
    "clickup.png",
    "claude.png",
    "supabase.png",
  ],
  [
    "salesforce.png",
    "shopify.png",
    "mailchimp.png",
    "linear.png",
    "todoist.png",
    "google-drive.png",
  ],
  [
    "github.png",
    "trello.png",
    "dropbox.png",
    "asana.png",
    "typeform.png",
    "google-calendar.png",
  ],
  [
    "zoom.png",
    "twilio.png",
    "zendesk.png",
    "figma.png",
    "webflow.png",
    "whatsapp.png",
  ],
  [
    "intercom.png",
    "monday.png",
    "freshdesk.png",
    "pipedrive.png",
    "youtube.png",
    "linkedin.png",
  ],
  [
    "reddit.png",
    "wordpress.png",
    "woocommerce.png",
    "sendgrid.png",
    "convertkit.png",
    "calendly.png",
  ],
  [
    "lemlist.png",
    "microsoft-teams.png",
    "google-docs.png",
    "google-forms.png",
    "deepseek.png",
    "groq.png",
  ],
]);

const activeCol = ref(-1);
let timerId = null;
let reduceMotion = false;

function rotateColumn(colIdx) {
  const col = columns[colIdx];
  const first = col.shift();
  col.push(first);
}

function animateNext(colIdx) {
  if (reduceMotion) return;

  activeCol.value = colIdx;

  timerId = setTimeout(() => {
    rotateColumn(colIdx);
    activeCol.value = -1;

    const nextCol = (colIdx + 1) % columns.length;
    timerId = setTimeout(() => {
      animateNext(nextCol);
    }, 300);
  }, 500);
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    timerId = setTimeout(() => {
      animateNext(0);
    }, 1500);
  }
});

onBeforeUnmount(() => {
  if (timerId) clearTimeout(timerId);
});
</script>

<template>
  <div class="flex flex-col items-center pt-8 pb-12 px-4">
    <!-- Logo Grid -->
    <div class="logo-grid-mask flex justify-center gap-1.5">
      <div
        v-for="(col, colIdx) in columns"
        :key="colIdx"
        class="column-wrapper overflow-hidden"
        :class="{
          'hidden md:block': colIdx >= 4 && colIdx < 6,
          'hidden lg:block': colIdx >= 6,
        }"
      >
        <div
          class="column-track flex flex-col gap-1.5"
          :class="{ 'is-sliding': activeCol === colIdx }"
        >
          <div
            v-for="(logo, logoIdx) in col"
            :key="logo + logoIdx"
            class="logo-card w-[70px] h-[70px] md:w-[78px] md:h-[78px] lg:w-[86px] lg:h-[86px] bg-white rounded-lg border border-[rgba(49,43,96,0.1)] p-2 flex items-center justify-center shrink-0"
          >
            <img
              :src="`/pieces-logos/${logo}`"
              :alt="logo.replace(/\.\w+$/, '')"
              class="w-full h-full object-contain rounded-[10px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Title + Subtitle -->
    <div class="text-center -mt-6 relative z-10 max-w-3xl">
      <h2
        class="text-white text-3xl md:text-4xl lg:text-5xl font-sentient font-bold leading-tight text-balance"
      >
        Agents work across every tool you use
      </h2>
      <p
        class="text-white/80 text-base md:text-lg mt-4 max-w-2xl mx-auto text-balance"
      >
        We're a connectivity platform first. With
        {{ piecesCount }}+ apps and growing, your agents can work with any tool
        your team already uses.
      </p>
    </div>
  </div>
</template>

<style scoped>
.column-wrapper {
  height: calc(3 * 70px + 2 * 6px);
}

@media (min-width: 768px) {
  .column-wrapper {
    height: calc(3 * 78px + 2 * 6px);
  }
}

@media (min-width: 1024px) {
  .column-wrapper {
    height: calc(3 * 86px + 2 * 6px);
  }
}

.logo-grid-mask {
  mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 55%,
    transparent 100%
  );
}

.column-track.is-sliding {
  transition: transform 500ms ease-in-out;
  transform: translateY(calc(-70px - 6px));
}

@media (min-width: 768px) {
  .column-track.is-sliding {
    transform: translateY(calc(-78px - 6px));
  }
}

@media (min-width: 1024px) {
  .column-track.is-sliding {
    transform: translateY(calc(-86px - 6px));
  }
}

@media (prefers-reduced-motion: reduce) {
  .column-track.is-sliding {
    transition: none;
  }
}
</style>
