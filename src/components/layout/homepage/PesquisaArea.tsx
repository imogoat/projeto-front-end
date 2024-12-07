import Input from "./Input"
import Button from "./Button"

const PesquisaArea = () => {
    return (
        <div className="flex items-center justify-center">
            <div className=" w-[80%] h-auto bg-[--white] px-9 py-5 rounded-xl">
                <div className="mb-6">
                    <Button text="apartamento" flag='ap' />
                    <Button text="casa" flag="cs" />
                    <Button text="Quitinete" flag="qt" />
                </div>
                <div className="">
                    <Input text="teste de testo (mudar)" />
                </div>
            </div>
        </div>
    )
}

export default PesquisaArea