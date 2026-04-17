# Database Startup Guide

## Prerequisites

- **Docker**
- **Node.js**
- **NPM**

## Dependencies

`npm install` - Install Next.js and Supabase client dependencies.

`npm install save-dev supabase` - Install supabase CLI

## Starting the Database

`create .env.local file at root` - This is only needed to be done once and will contain 3 variables: 

- NEXT_PUBLIC_SUPABASE_URL

- NEXT_PUBLIC_SUPABASE_ANON_KEY

- SUPABASE_SERVICE_ROLE_KEY

`npx supabase start` - Start the database services (this may take a minute at first). After starting it will give you a bunch of keys and urls.

`edit your .env.local file` - Variable values are:

- NEXT_PUBLIC_SUPABASE_URL = Project url in 'APIs'.

- NEXT_PUBLIC_SUPABASE_ANON_KEY = The publishable key in 'Authorization Keys'.
 
- SUPABASE_SERVICE_ROLE_KEY = The secret key in 'Authorization Keys'.

`npm run db:seed` - Fills database with the JSON data (This may take a minute).

## Restarting the Database

`npxsupabase db reset` - Restarts the database.

## Stopping the Database

`npx supabase stop` - Stops the container and the database.
