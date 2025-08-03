import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce website solution with payment and inventory features.',
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_kkflmtur.json' // shopping cart animation
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative app for managing tasks and teams.',
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json' // checklist/tasks animation
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather app with forecasts and maps.',
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_jtbfg2nb.json' // weather animation
    },
    {
      id: 4,
      title: 'API Gateway Service',
      description: 'A gateway for microservices with authentication and monitoring.',
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json' // server/cloud animation
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'A dashboard to manage and analyze social media accounts.',
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_2ks3pjua.json' // social media animation
    }
  ];

  return (
    <section id="projects" className="section-padding bg-gray-900">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-2 items-center">
              {project.lottieUrl && (
                <Player
                  autoplay
                  loop
                  src={project.lottieUrl}
                  style={{ height: '120px', width: '120px', marginBottom: '8px' }}
                />
              )}
              <h3 className="text-xl font-semibold text-white mb-1 text-center">{project.title}</h3>
              <p className="text-gray-300 text-sm text-center">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;