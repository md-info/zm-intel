const { supabase } = require('../lib/supabase');

async function getCompany(id) {
  const { data, error } = await supabase
    .from('companies')
    .select('*, company_types(type_name), property_company_relationships(relationship_id, verified, relationship_types(relationship_type_name), properties(property_id, property_name, municipality))')
    .eq('company_id', id)
    .single();
  if (error) throw error;
  return data;
}

module.exports = { getCompany };
