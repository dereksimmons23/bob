import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vvroarbpvfsoiznkbfvt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2cm9hcmJwdmZzb2l6bmtiZnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxOTgzMDQsImV4cCI6MjA4MTc3NDMwNH0.nI9kUemYIkVaAULWs3piPVfQeCoUqZ8CYGX8MwNn0Wk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
