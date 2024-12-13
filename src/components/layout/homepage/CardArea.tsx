// CardArea.tsx
"use client";

import React, { useState, useEffect } from 'react';

import Card from "../Card" // Certifique-se de que o caminho para o Card está correto
import apiClient from "@/api/apiClient" // Certifique-se de que o caminho para apiClient está correto

import { ScoredProperty } from '@/interfaces/propertyTypes'; // Usando a interface estendida
import { calculateScore } from '@/utils/calculateScore';


interface CardAreaProps {
    limit?: number; // Pode ser indefinido ou um número
}


const CardArea: React.FC<CardAreaProps> = ({ limit }) => {
    const [imoveis, setImoveis] = useState<ScoredProperty[]>([]);

    useEffect(() => {
        const fetchImoveis = async () => {
            try {
                const response = await apiClient.get('/immobile');
                const data: ScoredProperty[] = response.data;
                const scoredImoveis = data.map(imovel => ({
                    ...imovel,
                    score: calculateScore(imovel)
                })) as ScoredProperty[];
                scoredImoveis.sort((a, b) => b.score - a.score);
                setImoveis(limit ? scoredImoveis.slice(0, limit) : scoredImoveis);
            } catch (error) {
                console.error('Failed to fetch imoveis:', error);
            }
        };

        fetchImoveis();
    }, []);

    return (
        <div className="flex justify-center w-full px-2 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imoveis.map(imovel => (
                    <Card key={imovel.id} property={imovel} />  // Renderiza um Card para cada imóvel
                ))}
                <div className="xl:w-[310px] lg:w-[260px] md:w-[185px] sm:w-[250px] xt:w-[175px] xs:w-[160px] h-auto bg-gray-500 rounded-xl">
                    Anúncio
                </div>
            </div>
        </div>
    );
};

export default CardArea;
