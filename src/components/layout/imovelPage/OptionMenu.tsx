interface OptionsMenuProps {
    text: string;
    scrollToId?: string;
    isActive?: boolean;
  }
  
  const OptionsMenu: React.FC<OptionsMenuProps> = ({ text, scrollToId, isActive }) => {
    const handleClick = () => {
      if (scrollToId) {
        const element = document.getElementById(scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
  
    return (
      <p
        className={`whitespace-nowrap font-semibold cursor-pointer px-2 py-1 ${
          isActive
            ? "text-[--green-light] border-b-2 border-[--green-light]"
            : "text-gray-700"
        }`}
        onClick={handleClick}
      >
        {text}
      </p>
    );
  };
  
  export default OptionsMenu;
  