import React from "react";
const teamMembers = [
  {
    name: 'Alexis Fajian',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/alexis-fajian-7a7114276/',
    imageSrc: 'https://pps.whatsapp.net/v/t61.24694-24/295862940_606148144256741_9085867396735584824_n.jpg?ccb=11-4&oh=01_AdRDYaaugNzLufApIzEMISwxmFpVGqxlaWOl0kEAPHix6Q&oe=6505E062&_nc_sid=000000&_nc_cat=100',
  },
  {
    name: 'Andrés Farias',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/andres-javier-farias-benitez-43890313a/',
    imageSrc: 'https://media.licdn.com/dms/image/D4E35AQGto6aCzWjzWg/profile-framedphoto-shrink_200_200/0/1693873402759?e=1694642400&v=beta&t=oQdL0thvbr92JtC0UpeufgI4WVg-FH9RhkKFaikPAds', 
  },
  {
    name: 'Douglas Rondon',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/douglasgrl27/',
    imageSrc: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Franco Carreira',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/franco-carreira-243b6523b/',
    imageSrc: 'https://pps.whatsapp.net/v/t61.24694-24/226022859_3136599009915160_8097059567192061934_n.jpg?ccb=11-4&oh=01_AdTdYuUAguIHft_gU0XrYmvyfCY4fvGlJ5RlJalzGc68ng&oe=6505F3D7&_nc_sid=000000&_nc_cat=106',
  },
  {
    name: 'Yaneth Orduz',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/yaneth-orduz/',
    imageSrc: 'https://media.licdn.com/dms/image/D4E35AQH6wxuP2n5z8g/profile-framedphoto-shrink_200_200/0/1692758737331?e=1694642400&v=beta&t=xR7-ljogN3GeOO4jdtQpk_dcymzWy2aIn-npAUJzsw4',
  },
  {
    name: 'Jose Dirazar',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/jose-dirazar-a6b927236/',
    imageSrc: 'https://media.licdn.com/dms/image/D4D03AQHpbaU6r2CeMQ/profile-displayphoto-shrink_800_800/0/1675031869452?e=1699488000&v=beta&t=Ll5bGOOvAoGV0CkkJsUmcCO6B6QUgEa_of1KQaHB7J0',
  },
  {
    name: 'Tomás García del Rio',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/tgarciadelrio/',
    imageSrc: 'https://media.licdn.com/dms/image/C4D03AQFm0YOahqSozw/profile-displayphoto-shrink_200_200/0/1652906637365?e=1699488000&v=beta&t=9DZfaK6RWfcbgzN-F7Sg2i5V75YVmlYxoOVrYbKwEdg',
  },
];

export default function About() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mt-16 ml-8'>
      <h2 className='text-5xl mt-3 mb-2 ml-4 px-2 font-bold'>About us</h2>
      <p className='text-3xl font-medium text-center'>
        We're a team of seven fullstack developers finishing the challenging Henry coding bootcamp. Our project, Hyper Events, is a testament to our coding skills and collaborative spirit.
        <br /><br />
        We've honed our abilities through intensive training and are excited to showcase our innovation.
        <br /><br />
        Hyper Events is more than just a project; it's a reflection of our shared vision to revolutionize event experiences in the digital age. Join us on this exciting journey as we turn lines of code into groundbreaking solutions. Thank you for being a part of our adventure!
      </p>
      <h2 className="text-4xl mt-3 mb-2 ml-4 px-2 font-bold	">Meet the team</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-5'>
        {teamMembers.map((member, index) => (
          <div key={index} className='p-4'>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-purpleOscuro'>
              <div className='w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-purpleOscuro'>
                <img src={member.imageSrc} alt={`Profile of ${member.name}`} />
              </div>
              <h3 className='text-xl font-semibold mt-4 text-center'>{member.name}</h3>
              <p className='text-gray-600 text-sm text-center'>{member.jobTitle}</p>
              <a href={member.linkedinURL} target='_blank' rel='noopener noreferrer' className='flex justify-center mt-2 text-purpleOscuro hover:text-purpleOscuroHover'>
                <img className='w-20' src="https://img.freepik.com/vector-premium/icono-linkedin_488108-5.jpg" alt="linkedin"/>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}