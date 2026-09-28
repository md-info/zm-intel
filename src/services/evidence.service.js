const { supabase } = require('../lib/supabase');

async function getEvidenceForEntity(entityType, entityId) {
  const { data, error } = await supabase
    .from('evidence')
    .select('evidence_id, field_name, evidence_text, verified_by, verified_at, confidence_score, sources(source_id, source_name, document_title, url, publication_date, accessed_at, reliability_level, notes, source_types(type_name))')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('verified_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { getEvidenceForEntity };
