import Header from "./header";
import SearchBar from "./searchbar";
import CardSkeleton from "./skeletons/card-skeleton";
import DailyForecastSkeleton from "./skeletons/dailyForecastSkeleton";
import HourlyForecastsSkeleton from "./skeletons/hourlyForecastSkeleton";

const Loading = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto relative px-4 md:px-6 pb-12 lg:pb-[5rem]">
        <h1 className="text-center text-white text-[3.25rem] font-bold font-Bricolage">
          How’s the sky looking today?
        </h1>
        <section className="relative flex flex-col items-center justify-center lg:mt-16 mt-12">
          <SearchBar />
        </section>
        <section className="grid lg:grid-cols-3 md:grid-rows-[43.3125rem] mt-8 lg:mt-12 gap-8">
          <div className="lg:col-span-2">
            <div className="h-[17.875rem] rounded-[1.25rem] bg-[#262540] animate-pulse flex items-center justify-center">
              <img
                src="/assets/images/loading-container.svg"
                alt="loading"
                className="w-[4.9375rem] h-[3.25rem]"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 mt-5 lg:mt-8 gap-6 grid-row-[7.375rem]">
              <CardSkeleton title="feels like" />
              <CardSkeleton title="humidity" />
              <CardSkeleton title="wind" />
              <CardSkeleton title="precipitation" />
            </div>
            <div className="mt-8 lg:mt-12">
              <p className="text-white text-[1.25rem] font-semibold">
                Daily forecast
              </p>
              <DailyForecastSkeleton />
            </div>
          </div>
          <div className="rounded-[1.25rem] bg-[#262540] px-6 py-6 ">
            <div className="flex justify-between items-center">
              <p className="text-[1.25rem] font-semibold text-white">
                Hourly forecast
              </p>
              <button className="py-1 px-4 bg-[#3C3B5E] flex items-center gap-1 justify-between rounded-lg capitalize text-white cursor-pointer">
                -
                <img src="/assets/images/icon-dropdown.svg" />
              </button>
            </div>
            <HourlyForecastsSkeleton />
          </div>
        </section>
      </main>
    </>
  );
};

export default Loading;
