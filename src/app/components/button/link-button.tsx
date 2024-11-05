type LinkButtonProp = {
  buttonText: string;
  href: string;
};

const LinkButton = ({ buttonText, href }: LinkButtonProp) => {
  return (
    <a
    
      className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-slate-700"
      href={href}
    >
      {buttonText}
    </a>
  );
};

export default LinkButton;
