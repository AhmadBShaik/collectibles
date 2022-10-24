// import Car from '../../public/landing-page-image.jpg'

const LandingPage = () => {
  return (
    <div
      className="absolute top-16 right-0 bottom-16 left-0"
      style={{
        backgroundImage: `url(${"/landing-page-image.jpg"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className=" p-5 absolute top-20 md:left-20 left-10 right-10 md:right-auto text-2xl md:text-3xl lg:text-4xl text-collectible-100 bg-collectible-500 bg-opacity-60 rounded font-bold">
        Ultimate Place To Manage All Your Collectibles
      </div>
    </div>
  );
};

export default LandingPage;
