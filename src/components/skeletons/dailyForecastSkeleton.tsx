const DailyForecastSkeleton = () => {
  return (
    <div className="mt-5">
      <ul className="grid grid-cols-3  md:grid-cols-7 grid-rows-[10.3125rem] gap-4">
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
        <li className="p-4 bg-[#262540] rounded-xl animate-pulse"></li>
      </ul>
    </div>
  );
};

export default DailyForecastSkeleton;
