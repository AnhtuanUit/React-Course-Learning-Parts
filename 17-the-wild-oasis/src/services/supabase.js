/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqhwslzqmjbcshtxfxxn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaHdzbHpxbWpiY3NodHhmeHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzODYzMzYsImV4cCI6MjAyNzk2MjMzNn0.m30XZQOj7kX40tI2pCQxOFHGnGV8G2b5M6O1vaeq0cE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
