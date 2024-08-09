import { Loader } from '@googlemaps/js-api-loader';
const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_G2U_GOOGLE_MAP_KEY,
    version: 'weekly',
    libraries: ['places'],
  });export default loader;