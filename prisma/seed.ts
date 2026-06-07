import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"
import bcrypt from "bcryptjs"
import { PrismaClient } from "../src/generated/prisma/client"


/*
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  const passwordHash = await bcrypt.hash("123456", 10)

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

  const adminEmpleado = await prisma.empleados.upsert({
    where: { id_empleado: 1 },
    update: { nombres: "Admin", apellidos: "Sistema", email: "admin@lypharma.com" },
    create: { id_empleado: 1, nombres: "Admin", apellidos: "Sistema", email: "admin@lypharma.com" },
  })

  const empleadoEmpleado = await prisma.empleados.upsert({
    where: { id_empleado: 2 },
    update: { nombres: "Empleado", apellidos: "Sistema", email: "empleado@lypharma.com" },
    create: { id_empleado: 2, nombres: "Empleado", apellidos: "Sistema", email: "empleado@lypharma.com" },
  })

  await prisma.usuarios.upsert({
    where: { id_usuario: 1 },
    update: { password_hash: passwordHash },
    create: {
      id_usuario: 1,
      id_empleado: adminEmpleado.id_empleado,
      username: "admin",
      password_hash: passwordHash,
      id_rol: 1,
    },
  })

  await prisma.usuarios.upsert({
    where: { id_usuario: 2 },
    update: { password_hash: passwordHash },
    create: {
      id_usuario: 2,
      id_empleado: empleadoEmpleado.id_empleado,
      username: "empleado",
      password_hash: passwordHash,
      id_rol: 2,
    },
  })

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
*/