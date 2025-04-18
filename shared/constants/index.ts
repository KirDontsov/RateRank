export const FETCH_LIMIT = 10;

export const BACKEND_USER_ACTIONS_URL = process.env.PRODUCTION
  ? 'https://xn--90ab9accji9e.xn--p1ai'
  : 'http://localhost:8080';
export const BACKEND_PORT = 'http://localhost:8080';

export const DEFAULT_PHOTOS_ENDPOINT = 'https://xn--n1aalg.xn--90ab9accji9e.xn--p1ai';
export const DEFAULT_PHOTOS_EXT = 'webp';

export const HeroBackground = {
  '3ebc7206-6fed-4ea7-a000-27a74e867c9a': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/restaurants_placeholder.${DEFAULT_PHOTOS_EXT}`,
  '565ad1cb-b891-4185-ac75-24ab3898cf22': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/car_services_placeholder.${DEFAULT_PHOTOS_EXT}`,
  '79280a00-9199-41db-9e75-c6db4c7d4b24': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/headlights_placeholder.${DEFAULT_PHOTOS_EXT}`,
  'cc1492f6-a484-4c5f-b570-9bd3ec793613': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/clubs_placeholder.${DEFAULT_PHOTOS_EXT}`,
  '36a42fa3-c65f-4f4c-852a-e119859b7f71': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/beauty_salon_placeholder.${DEFAULT_PHOTOS_EXT}`,
  '3bcf1b3a-ecb7-43a5-b5ac-75bc0ff51748': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/cinemas_placeholder.${DEFAULT_PHOTOS_EXT}`,
  '6fc6a115-aaf4-4590-87bf-d0cd2ce482be': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/schools_placeholder.${DEFAULT_PHOTOS_EXT}`,
  'fd0fa4b7-3483-495e-8b41-9796abeb0493': `${DEFAULT_PHOTOS_ENDPOINT}/placeholders/flowers_placeholder.${DEFAULT_PHOTOS_EXT}`,
};

export const COMMON_TITLE = 'Топ выбор';
export const COMMON_DOMAIN = 'Топвыбор.рф';
export const COMMON_HOST = 'https://топвыбор.рф';
