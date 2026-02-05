const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dyqkzeoutxutryjrasoe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5cWt6ZW91dHh1dHJ5anJhc29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDExNTUsImV4cCI6MjA4NTgxNzE1NX0.zKfLFENpljoAqYXeQh9bccAR9iWPbMi5x746AYD0Xe4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    const { data, error } = await supabase.auth.signUp({
        email: 'admin@rollon-rolloff.com',
        password: 'password123',
    });

    if (error) {
        console.error('Error creating user:', error.message);
    } else {
        console.log('User created:', data.user?.email);
        console.log('Log in at /login with: admin@rollon-rolloff.com / password123');
    }
}

createAdmin();
