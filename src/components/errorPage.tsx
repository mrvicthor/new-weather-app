import Header from "./header";

const ErrorPage = () => {
  const handleRetry = () => {
    window.location.reload();
  };
  return (
    <section className="fixed inset-0 bg-[#02012C] z-50">
      <Header />

      <div className="containe mx-auto flex flex-col items-center justify-center text-white space-y-6 mt-16 py-10">
        <img src="/assets/images/icon-error.svg" alt="error" />
        <h1 className="font-Bricolage text-[3.25rem] font-bold text-center">
          Something went wrong
        </h1>
        <p className="font-sans text-[1.25rem] text-center text-[#D4D3D9]">
          We couldn't connect to the server (API error). Please try <br />
          again in a few moments
        </p>
        <button
          onClick={handleRetry}
          className="px-4 py-3 bg-[#262540] text-white rounded-lg flex items-center gap-2 font-medium"
        >
          <img src="/assets/images/icon-retry.svg" alt="retry" />
          Try again
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
