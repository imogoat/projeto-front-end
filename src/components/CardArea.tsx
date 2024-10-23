import Card from "./Card"

const CardArea = () => {
    return (
        <div className="flex justify-center w-full px-2 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 5 }, (_, index) => (
                    <Card key={index} />
                ))}
                <div className="xl:w-[310px] lg:w-[260px] md:w-[185px] sm:w-[250px] xt:w-[175px] xs:w-[160px] h-auto bg-gray-500 rounded-xl">
                    Anuncio
                </div>
            </div>
        </div>
    )
}

export default CardArea