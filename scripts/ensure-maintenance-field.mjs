import { EmDashClient } from 'emdash/client';

const baseUrl = process.env.EMDASH_URL || 'https://promind.thesantoso.workers.dev';
const token = process.env.EMDASH_TOKEN;

if (!token) {
  throw new Error('EMDASH_TOKEN is required to update the Company Info schema.');
}

const client = new EmDashClient({ baseUrl, token });
const collections = await client.collections();
const companyInfo = collections.find(({ slug }) => slug === 'company_info' || slug === 'company-info');

if (!companyInfo) {
  throw new Error('Company Info collection was not found in EmDash.');
}

const collection = await client.collection(companyInfo.slug);
if (collection.fields.some(({ slug }) => slug === 'maintenance_estimate')) {
  process.stdout.write('Company Info already has maintenance_estimate.\n');
} else {
  await client.createField(companyInfo.slug, {
    slug: 'maintenance_estimate',
    label: 'Estimasi Perbaikan',
    type: 'string',
    required: false,
    validation: null,
  });
  process.stdout.write('Added Estimasi Perbaikan to Company Info.\n');
}
