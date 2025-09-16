type CardProps = {
  title: string;
  value: number;
  unit: string;
};

const CardWithSpace = ({ title, value, unit }: CardProps) => {
  return (
    <div className="bg-[#3C3B5E] p-5 rounded-lg flex flex-col gap-2 font-sans">
      <p className="text-lg font-medium text-[#D4D3D9] capitalize">{title}</p>
      <p className="text-white text-[2rem] ">
        <span className="mr-1">{value}</span>
        {unit}
      </p>
    </div>
  );
};

export default CardWithSpace;
