interface InputProps {
    text: string;
    tipo?: string;
}

const Input = ({ text }: InputProps) => {
    return (
        <div className="flex row">
            <form className="w-[80%]">
                <input id="input-bairro" list="bairros" placeholder={text} 
                className="border-4 border-[--green-light] rounded-lg"></input>
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
            <button>Pesquisar</button>
        </div>
    )
}

export default Input