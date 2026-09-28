// Explicit public field lists prevent future/private database columns leaking.
const developmentFields = [
  ['Application number','application_number'], ['Proposed units','proposed_units'],
  ['Proposed storeys','proposed_storeys'], ['Proposed height (m)','proposed_height_m'],
  ['Proposed gross floor area (sq ft)','proposed_gfa_sqft'],
  ['Proposed gross floor area (m²)','proposed_gfa_sqm'],
  ['Residential floor area (m²)','residential_gfa_sqm'], ['Non-residential floor area (m²)','non_residential_gfa_sqm'],
  ['Proposed parking spaces','proposed_parking_spaces'], ['Proposed bicycle spaces','proposed_bicycle_spaces'],
  ['Application date','application_date'], ['Approval date','approval_date'],
  ['Expected construction start','expected_start_date'], ['Expected completion','expected_completion_date'],
  ['Construction start','construction_start_date'], ['Construction completion','construction_completion_date'],
  ['Last verified','last_verified_at'], ['Record updated','updated_at']
];
function present(value) { return value !== null && value !== undefined && value !== ''; }
function format(value, key = '') {
  if (!present(value)) return 'Not recorded';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (/(?:_date|_at)$/.test(key) && /^\d{4}-\d{2}-\d{2}/.test(String(value))) {
    return new Date(String(value).slice(0,10) + 'T12:00:00Z').toLocaleDateString('en-CA',{ timeZone:'UTC', year:'numeric',month:'short',day:'numeric' });
  }
  if (typeof value === 'number') return value.toLocaleString('en-CA');
  return String(value);
}
function safeUrl(value) {
  try { const url = new URL(value); return ['https:','http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
module.exports = { developmentFields, present, format, safeUrl };
