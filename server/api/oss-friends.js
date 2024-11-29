export default defineEventHandler(async (event) => {
  const response = await $fetch('https://formbricks.com/api/oss-friends');
  return response;
});