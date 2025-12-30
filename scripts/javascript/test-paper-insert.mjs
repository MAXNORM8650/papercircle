// Test script to verify paper insertion works
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPaperInsert() {
  console.log('Testing paper insertion...\n');

  const testPaper = {
    title: 'Test Paper - Chemotactic motility-induced phase separation',
    authors: ['John Doe', 'Jane Smith'],
    abstract: 'This is a test abstract',
    arxiv_id: '2301.12345',
    pdf_url: 'https://arxiv.org/pdf/2301.12345.pdf',
    year: 2023,
  };

  console.log('Inserting paper with data:');
  console.log(JSON.stringify(testPaper, null, 2));
  console.log('');

  const { data, error } = await supabase
    .from('papers')
    .insert(testPaper)
    .select()
    .single();

  if (error) {
    console.error('❌ Insert failed:');
    console.error(JSON.stringify(error, null, 2));
    process.exit(1);
  }

  console.log('✅ Insert succeeded!');
  console.log('Paper ID:', data.id);
  console.log('\nCleaning up test paper...');

  // Clean up
  const { error: deleteError } = await supabase
    .from('papers')
    .delete()
    .eq('id', data.id);

  if (deleteError) {
    console.error('Warning: Could not delete test paper:', deleteError);
  } else {
    console.log('✅ Test paper deleted');
  }
}

testPaperInsert().catch(console.error);
