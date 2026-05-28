import Link from "next/link";

const Members = () => {
  const developers = [
    {
      name: "Prem Kumar Tudu",
      role: "UI/UX Designer",
      image: "prem_tudu.jpeg",
      linkedin: "https://www.linkedin.com/in/prem-kumar-tudu-59387727a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Prem Raj Prasad",
      role: "Web Developer",
      image: "/prem_raj.png",
      linkedin: "https://www.linkedin.com/in/prem-raj-a802682a7/"
    },
    {
      name: "Kaushiki Bhattacharya",
      role: "Web Developer",
      image: "/kaushiki.jpg",
      linkedin: "https://www.linkedin.com/in/kaushiki-bhattacharyya-63556524a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Swarnim Kumari",
      role: "Web Developer",
      image: "/swarnim.jpg",
      linkedin: "https://www.linkedin.com/in/swarnim-kumari-6098a6254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Ayush Raj",
      role: "Web Developer",
      image: "/ayush.png",
      linkedin: "https://www.linkedin.com/in/ayush-raj-338407279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Basundhara Singhdeo",
      role: "Web Developer",
      image: "/basundhara_img.jpg",
      linkedin: "https://www.linkedin.com/in/basundhara-singhdeo-b5a74925b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
  ];

  return (
    <div className="w-full pt-16 pb-8 px-4 md:px-8 max-w-7xl mx-auto academic-pattern">
      {/* Hero Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold tracking-tight">
          Designed by
        </h1>
      </div>

      {/* Developers Bento-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto justify-center">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="team-card-gradient border border-outline-variant p-6 rounded-xl flex flex-col items-center justify-between gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-container shadow-inner bg-white">
                <img
                  alt={dev.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={dev.image}
                />
              </div>
              
              <div className="text-center">
                <h3 className="font-serif text-lg font-semibold text-on-surface leading-tight">
                  {dev.name}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant mt-1">
                  {dev.role}
                </p>
              </div>
            </div>

            <Link
              href={dev.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center border border-outline py-2 rounded-lg text-on-surface hover:border-primary hover:text-primary transition-all font-sans font-semibold text-sm"
            >
              LinkedIn
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;