import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"
import bcrypt from "bcryptjs"
import { createClient } from "@supabase/supabase-js"
import { PrismaClient } from "../src/generated/prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function createAuthUser(email: string, password: string, meta: Record<string, unknown>) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: meta,
  })
  if (error || !data.user) throw new Error(`Error creating auth user ${email}: ${error?.message}`)
  return data.user.id
}

async function main() {
  console.log("Seeding database...")

  // Roles
  await prisma.roles.upsert({
    where: { id_rol: 1 },
    update: { nombre_rol: "Admin" },
    create: { id_rol: 1, nombre_rol: "Admin" },
  })
  await prisma.roles.upsert({
    where: { id_rol: 2 },
    update: { nombre_rol: "Empleado" },
    create: { id_rol: 2, nombre_rol: "Empleado" },
  })

  // Empleados
  const empAdmin = await prisma.empleados.upsert({
    where: { id_empleado: 1 },
    update: { nombres: "Admin", apellidos: "Sistema", email: "admin@lypharma.com" },
    create: { id_empleado: 1, nombres: "Admin", apellidos: "Sistema", email: "admin@lypharma.com" },
  })

  const empEmpleado = await prisma.empleados.upsert({
    where: { id_empleado: 2 },
    update: { nombres: "Empleado", apellidos: "Sistema", email: "empleado@lypharma.com" },
    create: { id_empleado: 2, nombres: "Empleado", apellidos: "Sistema", email: "empleado@lypharma.com" },
  })

  const empLucia = await prisma.empleados.upsert({
    where: { id_empleado: 3 },
    update: { nombres: "Lucía", apellidos: "Fernández" },
    create: { id_empleado: 3, nombres: "Lucía", apellidos: "Fernández" },
  })

  const empAna = await prisma.empleados.upsert({
    where: { id_empleado: 4 },
    update: { nombres: "Ana", apellidos: "Martínez" },
    create: { id_empleado: 4, nombres: "Ana", apellidos: "Martínez" },
  })

  // Auth users + usuarios
  const users = [
    { username: "admin", password: "123456", id_empleado: empAdmin.id_empleado, id_rol: 1, id_usuario: 1 },
    { username: "empleado", password: "123456", id_empleado: empEmpleado.id_empleado, id_rol: 2, id_usuario: 2 },
    { username: "lucia_f", password: "lucia123", id_empleado: empLucia.id_empleado, id_rol: 2, id_usuario: 6 },
    { username: "ana_m", password: "ana123", id_empleado: empAna.id_empleado, id_rol: 2, id_usuario: 7 },
  ]

  for (const u of users) {
    const existing = await prisma.usuarios.findUnique({ where: { id_usuario: u.id_usuario } })

    let authId = existing?.auth_id
    if (!authId) {
      authId = await createAuthUser(`${u.username}@lypharma.com`, u.password, {
        id_usuario: u.id_usuario,
        username: u.username,
      })
    }

    await prisma.usuarios.upsert({
      where: { id_usuario: u.id_usuario },
      update: { password_hash: await bcrypt.hash(u.password, 10), auth_id: authId },
      create: {
        id_usuario: u.id_usuario,
        id_empleado: u.id_empleado,
        username: u.username,
        password_hash: await bcrypt.hash(u.password, 10),
        id_rol: u.id_rol,
        auth_id: authId,
      },
    })

    console.log(`✓ ${u.username}`)
  }

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
