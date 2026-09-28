const { supabase } = require('../lib/supabase');

async function getArticleBySlug(slug) {
  const { data, error } = await supabase
    .from('research_articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) throw error;
  return data;
}

module.exports = { getArticleBySlug };
