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
    imageSrc: 'https://media.licdn.com/dms/image/D4E03AQFwfLn82NOUDQ/profile-displayphoto-shrink_200_200/0/1693873401935?e=1699488000&v=beta&t=JJGmlUqmhyUwujXk13MFmVVeWS9XNq9B8T9WaxJjY80', 
  },
  {
    name: 'Douglas Rondon',
    jobTitle: 'Full Stack Developer',
    linkedinURL: 'https://www.linkedin.com/in/douglasgrl27/',
    imageSrc: 'https://scontent.flim19-1.fna.fbcdn.net/v/t1.6435-9/209611463_2049590621847184_7110462507625155206_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGBAW_InZdWe3HJcu3d8nS_l6k-wiIIs9uXqT7CIgiz28roNMvKhVMA2OpZ_fepCrI&_nc_ohc=0Knzbhm_agUAX8Oo07Y&_nc_ht=scontent.flim19-1.fna&oh=00_AfAcqsR9WMG-dHQdOJc0Ak3xW7hmZKE7b89DoZxAIxJyWA&oe=6521A1F4',
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
    imageSrc: 'https://media.licdn.com/dms/image/D4E03AQFapThV-Z6Kvg/profile-displayphoto-shrink_200_200/0/1691524369673?e=1699488000&v=beta&t=y9bBisNk1mmvx5wHd-aXQ_i3NYEBbPPduKW7zJMsAVY',
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
    <div className='flex flex-col items-center justify-center min-h-screen mt-16 mb-10 text-black pt-5'>
      <h2 className='text-3xl mt-3 mb-2 px-2 font-bold p-2'>About us</h2>
      <p className='text-1xl font-medium text-center p-2'>
        We&apos;re a team of seven fullstack developers finishing the challenging Henry coding bootcamp. Our project, Hyper Events, is a testament to our coding skills and collaborative spirit.
        <br /><br />
        We&apos;ve honed our abilities through intensive training and are excited to showcase our innovation.
        <br /><br />
        Hyper Events is more than just a project; it&apos;s a reflection of our shared vision to revolutionize event experiences in the digital age. Join us on this exciting journey as we turn lines of code into groundbreaking solutions. Thank you for being a part of our adventure!
      </p>
      <h2 className="text-2xl mt-3 mb-2 px-2 font-bold	">Meet the team</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-5'>
        {teamMembers.map((member, index) => (
          <div key={index} className='p-4'>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-purpleOscuro'>
              <div className='w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-purpleOscuro'>
                <img src={member.imageSrc} alt={`Profile of ${member.name}`} />
              </div>
              <h3 className='text-xl font-semibold mt-4 text-center'>{member.name}</h3>
              <p className='text-gray-600 text-sm text-center'>{member.jobTitle}</p>
              <a href={member.linkedinURL} target='_blank' rel='noopener noreferrer' className=' flex justify-center mt-2 text-purpleOscuro hover:text-purpleOscuroHover'>
                <img className=' rounded-full w-20' src="https://img.freepik.com/vector-premium/icono-linkedin_488108-5.jpg" alt="linkedin"/>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}