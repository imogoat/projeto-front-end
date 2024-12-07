interface InputProps {
    text: string;
    tipo?: string;
}

const Input = ({ text }: InputProps) => {
    return (
        <div className="flex justify-between mx-2 md:mx-0 my-1">
            <form className="w-full mx-1 md:mx-3">
                <input id="input-bairro" list="bairros" placeholder={text} 
                className="w-full px-2 sm:px-4 py-1 sm:py-3 rounded-lg bg-[--light-gray]
                focus:ring focus:ring-[--green-light] outline-none"></input>
                <datalist id="bairros">
                    <option value="junco"></option>
                    <option value="Parque de Exposição"></option>
                    <option value="Centro"></option>
                    <option value="Boa Vista"></option>
                    <option value="Bairro Bomba"></option>
                    <option value="Ipueiras"></option>
                    <option value="São José"></option>
                </datalist>
            </form>
            <button className="px-4 sm:px-8 py-1 sm:py-3 bg-[--green-light] text-white font-bold text-xs 
            rounded-lg cursor-pointer transition-all duration-300 hover:bg-[--green-medium] 
            focus:bg-[--green-medium]">
                Pesquisar
            </button>
        </div>
    )
}

export default Input