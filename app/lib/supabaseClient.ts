import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mfebnkzulyewloxutxk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZWJua3p1bHlld2xveHVpdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjMzMjgsImV4cCI6MjA0OTEzOTMyOH0.we2mNrz7T6EsCSKLd6IrjDiy6pMVA3qIO3B5Ai-5n-M'

const supabase = createClient(supabaseUrl, supabaseKey)

// Add this to verify client is working
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event)
  console.log('Session:', session)
})

export { supabase }