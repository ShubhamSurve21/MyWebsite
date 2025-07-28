import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          layoutId={`project-card-${project.id}`}
          className="bg-gray-800/50 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-violet-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white"
            >
              <FiX size={24} />
            </motion.button>
          </div>

          <div className="p-8">
            <h2 className="text-4xl font-bold mb-2 text-white">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">{project.longDescription}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Key Features</h3>
                <ul className="space-y-2 text-gray-400">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">Project Links</h3>
                  <div className="flex gap-4">
                    <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                      <FiGithub />
                      <span>GitHub</span>
                    </motion.a>
                    <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                      <FiExternalLink />
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;