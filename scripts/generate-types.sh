#!/bin/sh

source .env.local

npx supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > src/lib/database.types.ts --debug