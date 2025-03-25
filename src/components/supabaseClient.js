import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xyfvnuseelbsfmgroqrn.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5ZnZudXNlZWxic2ZtZ3JvcXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMTA3NjgsImV4cCI6MjA1NTg4Njc2OH0.E5NW1w88SfMq_VKHrV84SNeomcG3uZFrsJ-CQgmVnYk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
