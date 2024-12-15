"use client";

import React, { useRef, useState, useEffect } from 'react';
import CardBairro from "./CardBairro";

const CardBairroArea = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    useEffect(() => {
        const container = scrollRef.current;  // Captura a referência atual para uso consistente
        const checkScrollButtons = () => {
            if (container) {
                const { scrollLeft, scrollWidth, clientWidth } = container;
                setShowLeftButton(scrollLeft > 0);  // Se houver conteúdo à esquerda, mostrar botão esquerdo
                setShowRightButton(scrollLeft < scrollWidth - clientWidth);  // Se houver conteúdo à direita, mostrar botão direito
            }
        };

        checkScrollButtons();  // Verificar na montagem
        container?.addEventListener('scroll', checkScrollButtons);  // Adicionar ouvinte de evento de rolagem

        return () => {
            container?.removeEventListener('scroll', checkScrollButtons);  // Limpar ouvinte na desmontagem
        };
    }, []);

    const handleNavigation = (direction: 'left' | 'right', event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (scrollRef.current) {
            const container = scrollRef.current;
            const items = Array.from(container.children as HTMLCollectionOf<HTMLElement>);

            let targetItem = null;

            if (direction === 'right') {
                const currentRightEdge = container.scrollLeft + container.clientWidth;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].offsetLeft + items[i].offsetWidth > currentRightEdge) {
                        targetItem = items[i];
                        break;
                    }
                }
            } else {
                const currentLeftEdge = container.scrollLeft;
                for (let i = items.length - 1; i >= 0; i--) {
                    if (items[i].offsetLeft < currentLeftEdge) {
                        targetItem = items[i];
                        break;
                    }
                }
            }

            if (targetItem) {
                container.scrollTo({
                    left: direction === 'right' ? targetItem.offsetLeft - container.offsetLeft : targetItem.offsetLeft - container.offsetLeft - container.clientWidth + targetItem.offsetWidth,
                    behavior: 'smooth'
                });
            }
        }
    };

    const cards = [
        { img: "/img/img-ap.png", bairro: "Junco", city: "Picos", nomeSecundario: "Junco Norte" },
        { img: "/img/img-ap.png", bairro: "Centro", city: "Picos", nomeSecundario: "Centro Sul" },
        { img: "/img/img-ap.png", bairro: "Boa Vista", city: "Picos", nomeSecundario: "Vista Leste" },
        { img: "/img/img-ap.png", bairro: "Junco", city: "Picos", nomeSecundario: "Junco Norte" },
        { img: "/img/img-ap.png", bairro: "Centro", city: "Picos", nomeSecundario: "Centro Sul" },
        { img: "/img/img-ap.png", bairro: "Boa Vista", city: "Picos", nomeSecundario: "Vista Leste" },
        { img: "/img/img-ap.png", bairro: "Junco", city: "Picos", nomeSecundario: "Junco Norte" },
        { img: "/img/img-ap.png", bairro: "Centro", city: "Picos", nomeSecundario: "Centro Sul" },
        { img: "/img/img-ap.png", bairro: "Boa Vista", city: "Picos", nomeSecundario: "Vista Leste" },
        { img: "/img/img-ap.png", bairro: "Junco", city: "Picos", nomeSecundario: "Junco Norte" },
        { img: "/img/img-ap.png", bairro: "Centro", city: "Picos", nomeSecundario: "Centro Sul" },
        { img: "/img/img-ap.png", bairro: "Boa Vista", city: "Picos", nomeSecundario: "Vista Leste" },
    ]; // seus cards aqui

    return (
        <div className="relative w-full sm:[90%] md:w-4/5 overflow-hidden py-4 mx-auto">
            <h3 className='font-bold text-base sm:text-xl mb-3'>
                Explore opções de imóveis nos melhores locais
            </h3>
            <style>
            {`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;  // IE and Edge
                    scrollbar-width: none;  // Firefox
                }
            `}
            </style>
            {showLeftButton && (
                <button
                    aria-label="Scroll Left"
                    onClick={(e) => handleNavigation('left', e)}
                    className="absolute left-0 top-1/2 z-50 h-full cursor-pointer text-white text-2xl transform -translate-y-1/2"
                >
                    &#9664;
                </button>
            )}
            <div ref={scrollRef} className="flex flex-nowrap space-x-4 overflow-x-auto px-4 scrollbar-hide">
                {cards.map((card, index) => (
                    <div key={index} className="min-w-max">
                        <CardBairro img={card.img} bairro={card.bairro} city={card.city} />
                    </div>
                ))}
            </div>
            {showRightButton && (
                <button
                    aria-label="Scroll Right"
                    onClick={(e) => handleNavigation('right', e)}
                    className="absolute right-0 top-1/2 z-50 h-full cursor-pointer text-white text-2xl transform -translate-y-1/2"
                >
                    &#9654;
                </button>
            )}
        </div>
    );
};

export default CardBairroArea;
