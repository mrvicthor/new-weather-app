import Header from "./header";
import SearchBar from "./searchbar";
import CardSkeleton from "./skeletons/card-skeleton";

const Loading = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto relative px-4 md:px-6 pb-12 lg:pb-[5rem]">
        <h1 className="text-center text-white text-[3.25rem] font-bold font-Bricolage">
          How’s the sky looking today?
        </h1>

        <SearchBar />
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
            </div>
          </div>
          <div className="h-[17.875rem] rounded-[1.25rem] bg-gray-800 animate-pulse"></div>
        </section>
      </main>
    </>
  );
};

export default Loading;
