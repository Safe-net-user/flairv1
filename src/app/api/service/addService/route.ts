import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

      console.log('Services récupérés depuis la base de données:', services);

      const servicesArray = services.map(service => ({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        domicile: service.domicile,
        image: service.image,
        dureeRDV: service.dureeRDV,
      }));

      res.status(200).json(servicesArray);
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des services' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, category, price, domicile, image, dureeRDV } = req.body;

      const newService = await prisma.service.create({
        data: {
          title,
          description,
          category,
          price,
          domicile,
          image,
          dureeRDV,
        },
      });

      console.log('Service ajouté à la base de données:', newService);

      // Après avoir ajouté le nouveau service, récupérez tous les services mis à jour
      const updatedServices = await prisma.service.findMany({
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

      const updatedServicesArray = updatedServices.map(service => ({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        domicile: service.domicile,
        image: service.image,
        dureeRDV: service.dureeRDV,
      }));

      res.status(201).json(updatedServicesArray);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du service:', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du service' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
