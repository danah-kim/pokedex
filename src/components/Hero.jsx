const Hero = () => {
  return (
    <section className="relative bg-gray-50 max-w-[256px] max-h-[173px] rounded-xl overflow-scroll select-none">
      <div className="mx-auto pt-7 pb-20 text-center">
        <div className="px-4 px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 text-5xl">
            <span className="block">Data to enrich your</span>
            <span className="block text-indigo-600">online business</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 text-xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div className="mt-10 flex justify-center gap-3 mx-3">
            <div className="rounded-md shadow mt-0">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get started
              </a>
            </div>
            <div className="rounded-md shadow mt-0">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
              >
                Live demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
