import { NextRequest, NextResponse } from 'next/server';
import { htmlToText } from 'html-to-text';
import { prisma } from '@/lib/prisma';


// Point de terminaison pour la méthode POST
export async function POST(req: NextRequest) {
  try {
    // Récupération des données du corps de la requête
    const body = await req.json();
    const { title, description, category, price, domicile, image, dureeRDV } = body;

    console.log('Données reçues:', body);

    // Vérification des champs obligatoires
    if (!title || !description || !category || !price || dureeRDV === undefined) {
      console.error('Champs requis manquants');
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    // Conversion du HTML en texte brut
    const descriptionWithoutHtml = htmlToText(description);

    // Création du service dans la base de données avec Prisma
    const service = await prisma.service.create({
      
      data: {
        title,
        description: descriptionWithoutHtml,
        category,
        price,
        domicile,
        image,
        dureeRDV,
      },
    });

    console.log('Service créé:', service);

    // Réponse avec le service créé
    return NextResponse.json(service, { status: 200 });
 
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du service.' }, { status: 500 });
  }
}

