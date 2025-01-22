"use client";

import React, { useEffect, useState } from "react";

import { fetchPropertyById } from "@/api/imovelService";
import { Property } from "@/interfaces/propertyTypes";

import ImageFundo from "@/components/layout/imageFundo";
import Galery from "@/components/layout/imovelPage/galery";
import MenuImovel from "@/components/layout/imovelPage/MenuImovel";
import VisaoGeral from "@/components/layout/imovelPage/VisaoGeral";
import Informacoes from "@/components/layout/imovelPage/Informacoes";
import Acessibilidade from "@/components/layout/imovelPage/acessibilidade";
import PoliticasTaxasReservas from "@/components/layout/imovelPage/politicas";

import LoadingSpinner from "@/components/layout/LoadingSpinner";

interface ImovelPageProps {
  params: {
    imovelId: string;
  };
}

const ImovelPage: React.FC<ImovelPageProps> = ({ params }) => {
  const [imovel, setImovel] = useState<Property | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const minLoadingTime = 500; // Tempo mínimo de carregamento (ms)

    const loadData = fetchPropertyById(params.imovelId)
      .then(setImovel)
      .catch((err) => {
        setError("Falha ao carregar os dados do imóvel.");
        console.error(err);
      });

    const loadingDelay = new Promise<void>((resolve) =>
      setTimeout(resolve, minLoadingTime)
    );

    Promise.all([loadData, loadingDelay]).finally(() => {
      setLoading(false);
    });
  }, [params.imovelId]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded shadow">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleFullScreenChange = (isFullScreen: boolean) => {
    setIsFullScreen(isFullScreen);
  };

  return (
    <div className="relative">
      <ImageFundo params={imovel?.images[0]?.url || "/img/default-property.jpg"} />
      <div className="relative z-10 p-0 mt-[-18%] xt:mt-[-18%] sm:mt-[-13%] md:mt-[-8%] w-full overflow-x-hidden">
        <aside className="w-full z-10 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white font-sans text-shadow mx-8 mb-10">
          {imovel?.name || "Imóvel sem nome"}
        </aside>
        <Galery images={imovel?.images || []} onFullScreenChange={handleFullScreenChange} />
      </div>
      {!isFullScreen && <MenuImovel ownerPhone={imovel?.proprietary.number} />}
      <hr className="border-t border-gray-300 w-full my-2" />
      <VisaoGeral imovel={imovel!} />
      <Informacoes imovel={imovel!} />
      <Acessibilidade />
      <PoliticasTaxasReservas />
    </div>
  );
};

export default ImovelPage;
