import { auth } from "@/lib/auth"

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env")
    process.exit(1)
  }

  console.log(`Creating admin user: ${email}`)

  const result = await auth.api.signUpEmail({
    body: { email, password, name: "Admin" },
  })

  if ("error" in result && result.error) {
    console.error("Failed to create admin:", result.error)
    process.exit(1)
  }

  console.log("Admin user created successfully.")
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
