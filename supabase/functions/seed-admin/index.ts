import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Check if admin already exists
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const adminExists = existingUsers?.users?.some(u => u.email === "admin@eduonboard.com");

  if (adminExists) {
    return new Response(JSON.stringify({ message: "Admin already exists" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Create admin user
  const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
    email: "admin@eduonboard.com",
    password: "Admin@123",
    email_confirm: true,
    user_metadata: { full_name: "Admin" },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Update role to admin
  if (newUser.user) {
    await supabaseAdmin
      .from("user_roles")
      .update({ role: "admin" })
      .eq("user_id", newUser.user.id);

    await supabaseAdmin
      .from("profiles")
      .update({ full_name: "Admin" })
      .eq("user_id", newUser.user.id);
  }

  return new Response(JSON.stringify({ message: "Admin created successfully" }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
