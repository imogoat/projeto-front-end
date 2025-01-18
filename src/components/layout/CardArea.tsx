"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import Card from "./Card";
import CardLoadingSkeleton from "./CardLoadingSkeleton";

import apiClient from "@/api/apiClient";
import { getFavorites } from "@/api/favoriteServices";
import { ScoredProperty } from "@/interfaces/propertyTypes";
import { calculateScore } from "@/utils/calculateScore";

interface CardAreaProps {
  limit?: number; // Pode ser indefinido ou um número
  properties?: ScoredProperty[]; // Lista de propriedades opcional
}

const CardArea: React.FC<CardAreaProps> = ({ limit, properties }) => {
  const [imoveis, setImoveis] = useState<ScoredProperty[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]); // IDs dos imóveis favoritos
  const [favoriteMapping, setFavoriteMapping] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        setLoading(true);

        let fetchedProperties: ScoredProperty[];

        if (properties) {
          // Se os imóveis forem passados, calcula o score e ordena
          fetchedProperties = properties.map((imovel) => ({
            ...imovel,
            score: calculateScore(imovel),
          }));
          fetchedProperties.sort((a, b) => b.score - a.score);
        } else {
          // Caso contrário, busca os imóveis da API, calcula o score e ordena
          const response = await apiClient.get("/immobile");
          const data: ScoredProperty[] = response.data;
          fetchedProperties = data.map((imovel) => ({
            ...imovel,
            score: calculateScore(imovel),
          }));
          fetchedProperties.sort((a, b) => b.score - a.score);
        }

        setImoveis(limit ? fetchedProperties.slice(0, limit) : fetchedProperties);

        // Verifica favoritos do usuário
        if (user?.id && token) {
          const favoritesResponse = await getFavorites(user.id, token);
          const favoriteIds = favoritesResponse.map((favorite) => favorite.immobileId);
          const mapping = favoritesResponse.reduce((acc, favorite) => {
            acc[favorite.immobileId] = favorite.id;
            return acc;
          }, {} as { [key: number]: number });

          setFavorites(favoriteIds);
          setFavoriteMapping(mapping);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar imóveis ou favoritos:", error);
        setLoading(false);
      }
    };

    fetchImoveis();
  }, [properties, limit, user?.id, token]);

  if (loading) {
    return (
      <div className="flex justify-center w-full px-2 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Renderizando skeletons durante o carregamento */}
          {Array.from({ length: 6 }).map((_, index) => (
            <CardLoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full px-2 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imoveis.map((imovel) => (
          <Card
            key={imovel.id}
            property={imovel}
            isFavorited={favorites.includes(imovel.id)} // Verifica se é favorito
            favoriteIdMapping={favoriteMapping} // Passa o mapeamento de IDs favoritos
          />
        ))}
        <div className="xl:w-[310px] lg:w-[260px] md:w-[185px] sm:w-[250px] xt:w-[175px] xs:w-[160px] h-auto bg-gray-500 rounded-xl">
          Anúncio
        </div>
      </div>
    </div>
  );
};

export default CardArea;
