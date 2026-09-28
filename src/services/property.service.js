const { supabase } = require('../lib/supabase');
const { getEvidenceForEntity } = require('./evidence.service');

async function listProperties(filters = {}) {
  let query = supabase
    .from('properties')
    .select('property_id, property_name, address_line_1, municipality, province, last_verified_at, property_types(type_name), property_statuses(status_name), property_media(media_id, image_url, alt_text, is_primary)')
    .order('updated_at', { ascending: false });

  if (filters.term) {
    const term = filters.term.replaceAll(',', ' ');
    query = query.or(`property_name.ilike.%${term}%,address_line_1.ilike.%${term}%,municipality.ilike.%${term}%`);
  }
  if (filters.municipality) query = query.eq('municipality', filters.municipality);
  if (filters.propertyTypeId) query = query.eq('property_type_id', filters.propertyTypeId);
  if (filters.statusId) query = query.eq('property_status_id', filters.statusId);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function getProperty(id) {
  const [propertyResult, evidence] = await Promise.all([
    supabase
      .from('properties')
      .select('*, property_types(type_name), property_statuses(status_name), developments(development_id, project_name, planning_status_id, proposed_units, proposed_storeys, development_statuses(status_name)), property_media(media_id, media_type, image_url, alt_text, source_name, source_url, captured_at, is_primary)')
      .eq('property_id', id)
      .single(),
    getEvidenceForEntity('property', id),
  ]);
  if (propertyResult.error) throw propertyResult.error;
  return { ...propertyResult.data, evidence };
}

async function getPropertyFilters() {
  const [types, statuses, municipalities] = await Promise.all([
    supabase.from('property_types').select('property_type_id, type_name').order('type_name'),
    supabase.from('property_statuses').select('property_status_id, status_name').order('status_name'),
    supabase.from('properties').select('municipality').not('municipality', 'is', null).order('municipality'),
  ]);
  for (const result of [types, statuses, municipalities]) if (result.error) throw result.error;
  return {
    propertyTypes: types.data,
    propertyStatuses: statuses.data,
    municipalities: [...new Set(municipalities.data.map(({ municipality }) => municipality))],
  };
}

module.exports = { getProperty, getPropertyFilters, listProperties };
