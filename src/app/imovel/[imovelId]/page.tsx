"use client";


import React, { useEffect, useState } from 'react';

import { fetchPropertyById } from "@/api/imovelService"
import { Property } from '@/interfaces/propertyTypes';

import ImageFundo from '@/components/layout/imageFundo';
import Galery from '@/components/layout/imovelPage/galery';


interface ImovelPageProps {
    params: {
        imovelId: string;
    };
}

const ImovelPage: React.FC<ImovelPageProps> = ({ params }) => {
    const [imovel, setImovel] = useState<Property | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchPropertyById(params.imovelId)
            .then(setImovel)
            .catch(err => {
                setError('Falha ao carregar os dados do imóvel.');
                console.error(err);
            });
    }, [params.imovelId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!imovel) {
        return <div>Carregando...</div>;
    }

    return (
        <div className='relative'>
            <ImageFundo params={imovel.images[0].url} />
            <div className='relative z-10 p-0 mt-[-18%] xt:mt-[-18%] sm:mt-[-13%] md:mt-[-8%] w-full overflow-x-hidden'> {/* div que envolve o conteudo */}
                <aside className=" w-full z-10 text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
                font-bold text-white font-sans text-shadow mx-8 mb-10">
                    {imovel.name}
                </aside>
            <Galery images={imovel.images} />
            </div>
            <p>{JSON.stringify(imovel, null, 2)}</p>
            {/* Renderize mais informações do imóvel conforme necessário */}
        </div>
    );
};

export default ImovelPage