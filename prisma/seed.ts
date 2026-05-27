import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
})

async function main() {
    await prisma.tipos_medicamento.createMany({
        data: [
            { nombre: "Antipirético", descripcion: "Medicamentos para reducir la fiebre" }
        ],
    })

    console.log("Datos de tipos_medicamento insertados correctamente")
}

main()
    .catch((e) => {
        console.error("Error al sembrar datos:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

