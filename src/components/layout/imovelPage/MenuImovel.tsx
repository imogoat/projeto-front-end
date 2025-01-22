import OptionsMenu from "./OptionMenu";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface MenuImovelProps {
  ownerPhone: string | undefined; // Número de telefone do proprietário
}

const MenuImovel: React.FC<MenuImovelProps> = ({ ownerPhone }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = () => {
    const sections = [
      "visao-geral",
      "comodidades",
      "informacoes",
      "acessibilidade",
      "politicas-taxas-reservas",
    ];

    let foundSection = "";
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const { top } = element.getBoundingClientRect();
        if (top <= 120 && top >= -200) {
          foundSection = sectionId;
        }
      }
    });

    setActiveSection(foundSection);
  };

  const openWhatsApp = () => {
    if (!ownerPhone) {
      alert("O número do proprietário não está disponível.");
      return;
    }

    const message = "Olá! Tenho interesse neste imóvel.";
    const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex items-center justify-between overflow-x-auto scrollbar-hide space-x-4 mt-3 px-4 py-2 bg-gray-100 rounded-lg shadow-md sticky top-0 z-50">
      <div className="flex space-x-4">
        <OptionsMenu
          text="Visão Geral"
          scrollToId="visao-geral"
          isActive={activeSection === "visao-geral"}
        />
        <OptionsMenu
          text="Comodidades"
          scrollToId="comodidades"
          isActive={activeSection === "comodidades"}
        />
        <OptionsMenu
          text="Informações"
          scrollToId="informacoes"
          isActive={activeSection === "informacoes"}
        />
        <OptionsMenu
          text="Acessibilidade"
          scrollToId="acessibilidade"
          isActive={activeSection === "acessibilidade"}
        />
        <OptionsMenu
          text="Políticas"
          scrollToId="politicas-taxas-reservas"
          isActive={activeSection === "politicas-taxas-reservas"}
        />
      </div>
      <button
        onClick={openWhatsApp}
        className="flex items-center space-x-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#1EBF57] focus:outline-none shadow-md"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
};

export default MenuImovel;
