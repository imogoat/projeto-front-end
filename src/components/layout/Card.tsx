"use client";

import Image from 'next/image';
import HomeIcon from "@mui/icons-material/Home"
import { Favorite } from '@mui/icons-material';
import { useState } from 'react';

const Card = () => {
    const [isFavorited, setIsFavorited] = useState(false); // Estado para controlar se foi favoritado

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited); // Alterna o estado de favorito
    };

    return (
        <>
            <div className="xl:w-[310px] lg:w-[260px] md:w-[185px] sm:w-[250px] xt:w-[175px] xs:w-[160px] h-auto bg-[--white] rounded-xl">
                <Image 
                    src="/img/img-ap.png"
                    alt="img-imovel"
                    width={160} // Ajuste conforme necessário
                    height={80} // Ajuste conforme necessário
                    layout="responsive"
                    className='cursor-pointer'
                />
                <div className='h-auto mx-3'>
                    <div className='flex flex-row items-start justify-between'>
                        <h1 className='font-semibold sm:text-2xl xt:text-xl cursor-pointer'>
                            Nome
                        </h1>
                        <Favorite 
                            onClick={toggleFavorite} // Adicionando evento de clique
                            style={{ color: isFavorited ? "red" : "white" }} // Cor baseada no estado
                            sx={{
                                fontSize: 30, // Tamanho do ícone
                                '& path': {
                                    fill: 'currentcolor', // Preenchimento com a cor atual
                                    stroke: '#000', // Contorno preto
                                    strokeWidth: 1 // Espessura do contorno
                                }
                            }}
                            className='cursor-pointer'
                        />
                    </div>
                    <p className='flex flex-row items-center sm:text-sm xt:text-xs text-xs'>
                        <HomeIcon 
                            style={{ color: "white" }} 
                            sx={{
                                fontSize: 20, // Corresponde a 'opsz'
                                color: 'rgba(0, 0, 0, 0)', // Corresponde a 'FILL' 0
                                '& path': {
                                    fill: 'currentcolor', // Garante que o preenchimento usa a cor do ícone
                                    stroke: '#000', // Corresponde a aplicar uma cor de 'stroke'
                                    strokeWidth: 1 // Pode simular 'wght'
                                }
                            }}
                            className="mr-1"
                        />
                        Tipo
                    </p>
                        
                </div>
            </div>
        </>
    )
}

export default Card