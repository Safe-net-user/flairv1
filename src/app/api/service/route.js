import { prisma } from "@/lib/prisma";

// Fonction pour afficher tous les services
export default function AllServices({ services }) {
  return (
    <ul>
      {services.map(service => (
        <div key={service.id} style={{ border: 'solid 2px #ECECEC', padding: '25px', marginTop: '5%' }} className="flex justify-between items-start rounded">
          <div className="flex flex-col justify-start items-start" style={{ width: '70%' }}>
            <div className='flex'>
              <button style={{ background: '#ECECEC' }} className="text-lg rounded py-2 px-4">{service.category}</button>
              {service.domicile === true && (
                <button style={{ color: '#2DB742', background: '#ABEAB5' }}>Service à domicile</button>
              )}
            </div>
            <br />
            <h1>{service.title}</h1>
            <br />
            <p>{service.description}</p>
          </div>
          <div className="flex flex-col items-end justify-between p-4">
            <h1 style={{ fontSize: '250%' }} className="font-bold">{service.price} €</h1>
            <span style={{ color: '#EAEAEA' }}>Durée {service.dureeRDV}</span>
            <Link href={'/dashboard_pro/services/modifierService'}>
              <button style={{ width: '150px' }} className="cursor-pointer bg-black text-lg text-white rounded py-3 px-6 mt-4">Modifier</button>
            </Link>
            <br />
            <Link href={'/dashboard_pro/services/modifierService'}>
              <button style={{ background: '#EAEAEA', width: '150px' }} className="cursor-pointer text-lg  text-black rounded py-3 px-6 mt-4">Supprimer</button>
            </Link>
          </div>
        </div>
      ))}
    </ul>
  );
}

// Fonction pour récupérer les services à afficher
export async function getServerSideProps() {
  try {
    // Récupération de tous les services depuis la base de données avec Prisma
    const services = await prisma.service.findMany();

    // Retourner les services en tant que props
    return {
      props: {
        services,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    // Retourner une liste vide en cas d'erreur
    return {
      props: {
        services: [],
      },
    };
  }
}