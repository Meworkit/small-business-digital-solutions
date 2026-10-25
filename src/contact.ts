// The existing owner's Google Form is the only inquiry destination.
export const GOOGLE_FORM_URL = 'https://forms.gle/CxbGiYCK3sH1PK7D9';
const GOOGLE_FORM_PREFILL_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf5P8cilV3Vev8BBeQKPK06qCS5fwQBCBg_acqBdIpF5PCczg/viewform';
// Observed in the form's visible save-progress link and verified by prefilling
// the public request-description field. Update if the owner replaces that field.
const SERVICE_FIELD = 'entry.1091074207';
export function getInquiryUrl(service: string): string {
  const url = new URL(GOOGLE_FORM_PREFILL_URL);
  url.searchParams.set('usp', 'pp_url');
  url.searchParams.set(SERVICE_FIELD, `${service}\n\n`);
  return url.toString();
}
