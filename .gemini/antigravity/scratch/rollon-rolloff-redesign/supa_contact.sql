-- Create a table for contact submissions
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table contact_messages enable row level security;

-- Policy: Allow public to insert (submit form)
create policy "Allow public insert" on contact_messages
  for insert with check (true);

-- Policy: Allow admin (authenticated) to view
create policy "Allow admin select" on contact_messages
  for select using (auth.role() = 'authenticated');
