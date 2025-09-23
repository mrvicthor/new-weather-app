type CardProps = {
  title: string;
  value: number;
  unit: string;
};

const Card = ({ title, value, unit }: CardProps) => {
  return (
    <div className="relative overflow-hidden bg-[#3C3B5E] p-5 rounded-lg flex flex-col gap-2 font-sans group">
      <span className="absolute inset-0 bg-[#2F2E4A] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
      <p className="relative text-lg font-medium text-[#D4D3D9] capitalize z-10">
        {title}
      </p>
      <p className="relative text-white text-[2rem] z-10">
        {value}
        {unit}
      </p>
    </div>
  );
};

export default Card;
