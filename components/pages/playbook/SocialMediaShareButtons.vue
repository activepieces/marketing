<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps({
  hideShareButtons: Function,
  source: String,
  selectedText: String, // To be used in the sharing URLs
});

const shareArticle = (event, platform) => {
  event.preventDefault();

  let shareUrl = "";
  let pageUrl = "https://www.activepieces.com" + route.fullPath;
  let pageTitle = document.title;

  switch (platform) {
    case "facebook":
      shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + pageUrl;
      break;
    case "x":
      shareUrl = "https://twitter.com/intent/tweet?url=" + pageUrl;
      break;
    case "linkedin":
      shareUrl =
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        pageUrl +
        "&title=" +
        pageTitle;
      break;
    case "reddit":
      shareUrl =
        "https://www.reddit.com/submit?url=" + pageUrl + "&title=" + pageTitle;
      break;
  }

  window.open(shareUrl, "_blank");
  if (props.source == "article") props.hideShareButtons();
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-8 h-8 cursor-pointer"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
    @click="shareArticle($event, 'facebook')"
  >
    <path
      fill="#3F51B5"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    ></path>
    <path
      fill="#FFF"
      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
    ></path>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-8 h-8 cursor-pointer"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
    @click="shareArticle($event, 'x')"
  >
    <path
      fill="#212121"
      fill-rule="evenodd"
      d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
      clip-rule="evenodd"
    ></path>
    <path
      fill="#fff"
      d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
    ></path>
    <polygon
      fill="#fff"
      points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
    ></polygon>
    <polygon
      fill="#fff"
      points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
    ></polygon>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-8 h-8 cursor-pointer"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
    @click="shareArticle($event, 'linkedin')"
  >
    <path
      fill="#0288D1"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    ></path>
    <path
      fill="#FFF"
      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
    ></path>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-8 h-8 cursor-pointer"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
    @click="shareArticle($event, 'reddit')"
  >
    <path
      fill="#FFF"
      d="M12.193 19.555c-1.94-1.741-4.79-1.727-6.365.029-1.576 1.756-1.301 5.023.926 6.632L12.193 19.555zM35.807 19.555c1.939-1.741 4.789-1.727 6.365.029 1.575 1.756 1.302 5.023-.927 6.632L35.807 19.555zM38.32 6.975A3.5 3.5 0 1 0 38.32 13.975 3.5 3.5 0 1 0 38.32 6.975z"
    ></path>
    <path
      fill="#FFF"
      d="M24.085 15.665000000000001A18.085 12.946 0 1 0 24.085 41.557A18.085 12.946 0 1 0 24.085 15.665000000000001Z"
    ></path>
    <g>
      <path
        fill="#D84315"
        d="M30.365 23.506A2.884 2.884 0 1 0 30.365 29.274 2.884 2.884 0 1 0 30.365 23.506zM17.635 23.506A2.884 2.884 0 1 0 17.635 29.274 2.884 2.884 0 1 0 17.635 23.506z"
      ></path>
    </g>
    <g>
      <path
        fill="#37474F"
        d="M24.002 34.902c-3.252 0-6.14-.745-8.002-1.902 1.024 2.044 4.196 4 8.002 4 3.802 0 6.976-1.956 7.998-4C30.143 34.157 27.254 34.902 24.002 34.902zM41.83 27.026l-1.17-1.621c.831-.6 1.373-1.556 1.488-2.623.105-.98-.157-1.903-.721-2.531-.571-.637-1.391-.99-2.307-.994-.927.013-1.894.365-2.646 1.041l-1.336-1.488c1.123-1.008 2.545-1.523 3.991-1.553 1.488.007 2.833.596 3.786 1.658.942 1.05 1.387 2.537 1.221 4.081C43.961 24.626 43.121 26.096 41.83 27.026zM6.169 27.026c-1.29-.932-2.131-2.401-2.306-4.031-.166-1.543.279-3.03 1.221-4.079.953-1.062 2.297-1.651 3.785-1.658.009 0 .018 0 .027 0 1.441 0 2.849.551 3.965 1.553l-1.336 1.488c-.753-.676-1.689-1.005-2.646-1.041-.916.004-1.735.357-2.306.994-.563.628-.826 1.55-.721 2.53.115 1.067.657 2.023 1.488 2.624L6.169 27.026zM25 16.84h-2c0-2.885 0-10.548 4.979-10.548 2.154 0 3.193 1.211 3.952 2.096.629.734.961 1.086 1.616 1.086h1.37v2h-1.37c-1.604 0-2.453-.99-3.135-1.785-.67-.781-1.198-1.398-2.434-1.398C25.975 8.292 25 11.088 25 16.84z"
      ></path>
      <path
        fill="#37474F"
        d="M24.085 16.95c9.421 0 17.085 5.231 17.085 11.661 0 6.431-7.664 11.662-17.085 11.662S7 35.042 7 28.611C7 22.181 14.664 16.95 24.085 16.95M24.085 14.95C13.544 14.95 5 21.066 5 28.611c0 7.546 8.545 13.662 19.085 13.662 10.54 0 19.085-6.116 19.085-13.662C43.17 21.066 34.625 14.95 24.085 14.95L24.085 14.95zM38.32 7.975c1.379 0 2.5 1.122 2.5 2.5s-1.121 2.5-2.5 2.5-2.5-1.122-2.5-2.5S36.941 7.975 38.32 7.975M38.32 5.975c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.486 0 4.5-2.015 4.5-4.5S40.807 5.975 38.32 5.975L38.32 5.975z"
      ></path>
    </g>
  </svg>
</template>

<style scoped></style>
