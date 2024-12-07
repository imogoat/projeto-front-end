import Input from "./Input"
import Button from "./Button"

const PesquisaArea = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-[97%] sm:w-[93%] md:w-[90%] lg:w-[85%] h-auto bg-[--white] 
            px-2 md:px-8 py-2 md:py-5 rounded-md md:rounded-xl">
                <div className="mb-6 xs:ml-2">
                    <Button text="apartamento" />
                    <Button text="casa" />
                    <Button text="Quitinete" />
                </div>
                <div className="">
                    <Input text="Bairro de interesse" />
                </div>
            </div>
        </div>
    )
}

export default PesquisaArea