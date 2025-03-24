import { defineEventHandler, setHeader } from 'h3';

export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=86400, must-revalidate');
}); 