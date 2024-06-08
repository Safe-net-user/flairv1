'use client'
import { TabsContent } from '@/components/ui/tabs';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
import AllServices from '@/app/api/service/route';


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

export default function ServicesTab() {
  const [sortOption, setSortOption] = useState<string>('');

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
  };
  
  return (
    <TabsContent value="services" className="space-y-4">
      <div className="hidden h-full flex-1 space-y-8 p-8 md:flex items-start justify-between">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        </div>
      </div>
      <div className="flex items-end justify-start space-y-4">
        <div className="flex flex-col justify-start items-start">
          <p style={{ marginRight: '4%' }}>Trier par :</p>
          <br />
          <div style={{ width: '150px' }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trier</InputLabel>
              <Select value={sortOption} label="Trier" onChange={handleSortChange}>
                <MenuItem value={'recent'}>Récent</MenuItem>
                <MenuItem value={'a-z'}>Titre A-Z</MenuItem>
                <MenuItem value={'categorie'}>Categorie</MenuItem>
                <MenuItem value={'prix'}>Prix</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Link className="cursor-pointer" style={{ marginLeft: '20px' }} href={'/dashboard/professional/service/addService'}>
          <button className="bg-black text-white flex items-center rounded text-lg cursor-pointer" style={{ padding: '6px' }}>
            <img className='flex items-center' style={{ marginRight: '10px', marginTop: '-5px', marginBottom: '-5px' }} src="/iconService/plus-2.svg" alt="plus.svg" />Ajouter un service
          </button>
        </Link>
      </div>
      <div>
        <AllServices services={[]} /> 
      </div>
    </TabsContent>
  );
}
