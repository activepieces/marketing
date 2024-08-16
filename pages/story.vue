<script setup>
const pageTitle = "Everyone is an AI builder - Activepieces?";
const metaDesc =
  "Automate your work with AI, LLMs and other tools. Activepieces empowers all your departments to automate their work without relying on IT.";
const metaKeywords =
  "best way to adopt AI, enterprise automation, decentralized automation";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: metaDesc },
    { name: "keywords", content: metaKeywords },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: metaDesc },
  ],
});
</script>

<template>
  <section class="story-section">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
      <div class="flex flex-row items-start relative gap-x-3">
        <div class="w-1/2 max-[700px]:w-2/3 max-[500px]:w-full">
          <p class="text-gray-800 font-bold text-4xl tracking-[2px] mb-2">
            Before November 2022...
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            IT teams were handling all the tech creation. They were the ones
            building new systems and tools, and it was overwhelming. They had
            more tasks than they could ever complete. Companies tried to help by
            bringing in "citizen developers"—basically, less technical people to
            pitch in. But that approach wasn’t cutting it.
          </p>
          <p class="text-gray-800 font-bold text-4xl tracking-[2px] mb-2">
            Then ChatGPT dropped...
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            and everything started to shift. Suddenly, people in all kinds of
            roles started using AI to write, plan, solve problems, and analyze
            data. The tools were no longer just in the hands of IT; everyone was
            starting to build and innovate. It was like a whole new world opened
            up.
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            We saw this change happening and launched Activepieces in early
            2023. Our mission was simple: create an open-source, no-code
            automation tool that anyone could use, regardless of their tech
            skills. We wanted to empower every team to automate tasks and get
            creative without needing to be developers.
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            And guess what? It’s working. We’ve grown to thousands of stars on
            GitHub and around 50,000 users. Technical teams love us because our
            platform is super extensible and secure, with plenty of tools to
            manage their automation projects. But the best part? Even non-tech
            teams are jumping in, thanks to our easy-to-use interface.
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            Now, the role of IT is changing. Instead of doing everything
            themselves, they’re setting up AI automation infrastructure that
            everyone can use. It’s a huge shift, and we’re here to make it as
            smooth as possible. Activepieces is designed for this new era, where
            innovation is a team effort.
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            As we grow, we’re seeing this vision come to life. According to a
            recent survey, over 70% of companies are already using or planning
            to use AI tools across multiple departments. The future is here, and
            it’s collaborative.
          </p>
          <p class="text-gray-800 text-xl mb-8 leading-[35px]">
            We’re thrilled to be part of this journey with you. The landscape is
            changing fast, and we’re excited about what we can build together.
          </p>
          <p class="text-gray-800 text-2xl font-bold mb-6 leading-[35px]">
            Happy automating!
          </p>
          <div class="flex flex-row gap-x-8">
            <div>
              <img
                src="/ash.png"
                alt="Ashraf Samhouri"
                class="w-[150px] h-[150px] object-contain mb-[10px] bg-primary-200 rounded-lg"
              />
              <p class="text-center text-xl font-bold text-gray-800">Ashraf</p>
              <p class="text-center text-lg text-gray-800">CEO</p>
            </div>
            <div>
              <img
                src="/chatgpt-logo.png"
                alt="ChatGPT"
                class="w-[150px] h-[150px] object-contain mb-[10px] bg-primary-200 rounded-lg px-4"
              />
              <p class="text-center text-xl font-bold text-gray-800">ChatGPT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story-section {
  background: linear-gradient(180deg, #fff 4%, #ffeffd9c 50%, #fff 100%);
}
</style>
