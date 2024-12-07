import React from 'react';

// Definindo a interface para as props
interface ButtonProps {
    text: string;
    flag: string;
}


const Button: React.FC<ButtonProps> = ({ text, flag }) => {
    return (
        <button className="text-xs uppercase tracking-wider inline-block text-center 
        font-bold py-3 px-[2vw] border-4 border-[--green-light] rounded-md relative shadow-lg 
        text-[--green-light] transition-all duration-300 ease-in-out z-10 mx-[1vw] mr-[2vw] 
        hover:text-[--white] focus:text-[--white] hover:bg-[--green-light] focus:bg-[--green-light]">
            {text}
        </button>
    );
}

export default Button