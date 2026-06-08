import { createClient } from "@supabase/supabase-js"
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
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

async function main() {
    const usuarios = await prisma.usuarios.findMany({
        where: { auth_id: null },
        include: { empleado: true },
    })

    if (usuarios.length === 0) {
        console.log("Todos los usuarios ya tienen auth_id.")
        return
    }

    console.log(`Migrando ${usuarios.length} usuarios...`)

    for (const u of usuarios) {
        const email = `${u.username}@lypharma.com`

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password: `temp-${u.username}-2026`,
            email_confirm: true,
            user_metadata: {
                id_usuario: u.id_usuario,
                id_empleado: u.id_empleado,
                username: u.username,
            },
        })

        if (error || !data.user) {
            console.error(`Error creando ${u.username}:`, error?.message ?? "unknown")
            continue
        }

        await prisma.$executeRawUnsafe(
            `UPDATE auth.users SET encrypted_password = $1 WHERE id = $2`,
            u.password_hash,
            data.user.id,
        )

        await prisma.usuarios.update({
            where: { id_usuario: u.id_usuario },
            data: { auth_id: data.user.id },
        })

        console.log(`✓ ${u.username} → ${data.user.id}`)
    }

    console.log("Migración completada.")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
