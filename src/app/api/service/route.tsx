import Link from 'next/link';
import React from 'react';

interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  dureeRDV: string;
  domicile: boolean;
  image: string;
}
 
interface AllServicesProps {
  services: Service[];
}

const AllServices: React.FC<AllServicesProps> = ({ services }) => {
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

export default AllServices;