type CardProps = {
  title: string;
};

const CardSkeleton = ({ title }: CardProps) => {
  return (
    <div className="bg-[#262540] p-5 rounded-xl animate-pulse flex flex-col space-y-4 justify-center">
      <p className="text-[#D4D3D9] font-sans text-lg font-medium capitalize">
        {title}
      </p>
      <p className="text-white">-</p>
    </div>
  );
};

export default CardSkeleton;
