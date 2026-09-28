const { supabase } = require('../lib/supabase');
const { getEvidenceForEntity } = require('./evidence.service');

async function getDevelopment(id) {
  const [developmentResult, evidence, timelineResult, developmentMediaResult] = await Promise.all([
    supabase
      .from('developments')
      .select('*, properties(property_id, property_name, address_line_1, municipality, province), development_types(type_name), development_statuses(status_name)')
      .eq('development_id', id)
      .single(),
    getEvidenceForEntity('development', id),
    supabase
      .from('development_timeline_events')
      .select('event_id, event_date, event_type, event_status, title, description, verified, sort_order, sources(source_name, document_title, url)')
      .eq('development_id', id)
      .order('event_date', { ascending: true })
      .order('sort_order', { ascending: true }),
    supabase
      .from('development_media')
      .select('media_id, media_type, image_url, alt_text, source_name, source_url, captured_at, display_order, is_primary')
      .eq('development_id', id)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ]);
  if (developmentResult.error) throw developmentResult.error;
  if (timelineResult.error) throw timelineResult.error;
  if (developmentMediaResult.error) throw developmentMediaResult.error;
  return { ...developmentResult.data, evidence, timelineEvents: timelineResult.data, developmentMedia: developmentMediaResult.data };
}

async function getPipeline() {
  const { data, error } = await supabase
    .from('developments')
    .select('development_id, project_name, application_number, proposed_units, proposed_storeys, development_statuses(status_name), properties(property_id, property_name, municipality)')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data.reduce((groups, development) => {
    const status = development.development_statuses?.status_name || 'Unspecified';
    (groups[status] ||= []).push(development);
    return groups;
  }, {});
}

module.exports = { getDevelopment, getPipeline };
