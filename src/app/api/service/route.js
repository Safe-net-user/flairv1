const { prisma } = require("@/lib/prisma");

// Point de terminaison pour la méthode GET
export async function GET(req, res) {
  try {
    // Récupération des services depuis la base de données avec Prisma
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

    console.log('Services récupérés depuis la base de données:', services);

    // Réponse avec les services récupérés
    return new Response(JSON.stringify(services), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des services' }), { status: 500 });
  }
}