import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
})

async function main() {
    // Roles
    await prisma.roles.createMany({
        data: [
            { nombre_rol: "Administrador" },
            { nombre_rol: "Vendedor" },
            { nombre_rol: "Almacenero" },
        ],
    })

    // Empleados
    await prisma.empleados.createMany({
        data: [
            { nombres: "Admin", apellidos: "Principal", email: "admin@lypharma.com" },
            { nombres: "Juan", apellidos: "Pérez", email: "juan@lypharma.com" },
            { nombres: "María", apellidos: "García", email: "maria@lypharma.com" },
        ],
    })

    // Tipos de medicamento
    await prisma.tipos_medicamento.createMany({
        data: [
            { nombre: "Tabletas", descripcion: "Medicamentos en presentación de tabletas" },
            { nombre: "Capsulas", descripcion: "Medicamentos en cápsulas" },
            { nombre: "Inhalador", descripcion: "Medicamentos inhalables" },
            { nombre: "Crema", descripcion: "Medicamentos tópicos en crema" },
        ],
    })

    // Categorías
    await prisma.categorias.createMany({
        data: [
            { nombre: "Antibiotico", descripcion: "Medicamentos antibióticos" },
            { nombre: "Analgesico", descripcion: "Medicamentos analgésicos" },
            { nombre: "Antihistaminico", descripcion: "Medicamentos antihistamínicos" },
            { nombre: "Antiinflamatorio", descripcion: "Medicamentos antiinflamatorios" },
            { nombre: "Gastrointestinal", descripcion: "Medicamentos para el sistema gastrointestinal" },
            { nombre: "Antidiabetico", descripcion: "Medicamentos antidiabéticos" },
            { nombre: "Cardivascular", descripcion: "Medicamentos cardiovasculares" },
            { nombre: "Respiratorio", descripcion: "Medicamentos respiratorios" },
            { nombre: "Neurologico", descripcion: "Medicamentos neurológicos" },
            { nombre: "Dermatologico", descripcion: "Medicamentos dermatológicos" },
            { nombre: "Suplemento", descripcion: "Suplementos vitamínicos" },
        ],
    })

    // Proveedores
    await prisma.proveedores.createMany({
        data: [
            { nombre_empresa: "Distribuidora Farmacéutica SAC", direccion: "Av. Principal 123" },
            { nombre_empresa: "MediCorp Perú", direccion: "Jr. Las Flores 456" },
            { nombre_empresa: "Farmashopping EIRL", direccion: "Calle Los Olivos 789" },
        ],
    })

    // Clientes
    await prisma.clientes.createMany({
        data: [
            { nombres: "Carlos", apellidos: "López", dni: "12345678" },
            { nombres: "Ana", apellidos: "Martínez", dni: "87654321" },
            { nombres: "Pedro", apellidos: "Ramírez", dni: "45678912" },
        ],
    })

    console.log("Datos insertados correctamente")
}

main()
    .catch((e) => {
        console.error("Error al sembrar datos:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
