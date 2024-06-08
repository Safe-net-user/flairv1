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

    // Définition de l'en-tête Content-Type
    res.setHeader('Content-Type', 'application/json');

    // Envoi des données JSON
    res.end(JSON.stringify(services));
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    
    // Définition du statut de réponse
    res.statusCode = 500;

    // Envoi des données d'erreur JSON
    res.end(JSON.stringify({ error: 'Erreur lors de la récupération des services' }));
  }
}