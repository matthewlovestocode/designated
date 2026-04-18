import { createClient } from "@supabase/supabase-js";

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}. Add it to apps/web/.env.local.`);
  }

  return value;
}

function getEmailArg() {
  const email = process.argv[2];

  if (email === "--help" || email === "-h") {
    console.log("Usage: npm run make-admin -- user@example.com");
    console.log(
      "Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in apps/web/.env.local."
    );
    process.exit(0);
  }

  if (!email) {
    throw new Error(
      "Missing email argument. Usage: npm run make-admin -- user@example.com"
    );
  }

  return email;
}

async function findUserByEmail(supabase, email) {
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000
    });

    if (error) {
      throw error;
    }

    const users = data.users ?? [];
    const user = users.find((entry) => entry.email === email);

    if (user) {
      return user;
    }

    if (users.length < 1000) {
      return null;
    }

    page += 1;
  }
}

async function main() {
  const email = getEmailArg();
  const url = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secretKey) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY. Add it to apps/web/.env.local."
    );
  }

  const supabase = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const user = await findUserByEmail(supabase, email);

  if (!user) {
    throw new Error(`No Supabase user found for email: ${email}`);
  }

  const existingRoles = Array.isArray(user.app_metadata?.roles)
    ? user.app_metadata.roles
    : [];

  const roles = Array.from(new Set([...existingRoles, "admin"]));

  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...user.app_metadata,
      role: "admin",
      roles
    }
  });

  if (error) {
    throw error;
  }

  console.log(`Granted admin role to ${email} (${user.id}).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
