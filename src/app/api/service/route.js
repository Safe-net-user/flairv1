import { prisma } from "@prisma/client";

export async function GET(req, res) {
  try {
    const services = await prisma.service.findMany({
      select: {
        title: true,
        description: true,
        category: true,
        price: true,
        domicile: true,
        image: true,
        dureeRDV: true,
      },
    });

    console.log('Services récupérés depuis la base de données:', JSON.stringify(services, null, 2));

    return new Response(JSON.stringify(services), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des services' }), { status: 500 });
  }
}