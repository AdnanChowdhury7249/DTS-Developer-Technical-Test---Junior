

const Banner = () => {
  return (
    <div className="relative w-full h-[100px]">

      <div className="absolute inset-0 bg-white"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center  text-center px-4">
        <h1 className="text-3xl md:text-5xl ">HMCTS Task Manager</h1>
        <h3 className="mt-4 text-lg md:text-2xl ">
          Caseworker Task Creation System
        </h3>
      </div>
    </div>
  );
};

export default Banner;
