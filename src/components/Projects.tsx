"use client";

import { motion, Variants } from "framer-motion";

const projects = [
  {
    title: "MediMitra",
    subtitle: "Secure Healthcare App",
    description:
      "Full-stack healthcare management mobile app with secure medical record storage, appointment booking, and real-time data sync via MongoDB Atlas. Implemented 4-layer security including JWT and RBAC.",
    tech: ["Flutter", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Kapish-0x/Medimitra",
    demo: "https://drive.google.com/file/d/15gGdjlgMZlmrMq-eaJ63ctbqSI0eBzcy/view",
  },
  {
    title: "UniBook",
    subtitle: "Digital Library and Marketplace",
    description:
      "Campus book marketplace enabling university students to browse library catalogs and trade second-hand books. Features JWT authentication, role-based listing system, and INR pricing.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Vite"],
    github: "https://github.com/Kapish-0x/UniBook",
  },
  {
    title: "Annadatha",
    subtitle: "Farmer Support App",
    description:
      "Farmer-assistance mobile application providing real-time crop recommendations, weather updates, and market price predictions using ML. Incorporates pest detection powered by TensorFlow Lite.",
    tech: ["Flutter", "Supabase", "TensorFlow", "Python"],
    github: "https://github.com/Kapish-0x/Annadatha",
    demo: "https://drive.google.com/file/d/1GiWB_ebbdoxGe85092ocHZpVjMMz6_PT/view",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section className="min-h-screen bg-black py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Work</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
              
              <div className="h-full bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/5 flex flex-col">
                <h3 className="text-2xl font-semibold text-white mb-1">{project.title}</h3>
                <p className="text-sm font-medium text-blue-400 mb-4">{project.subtitle}</p>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white hover:text-purple-400 transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-32 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Technical Arsenal</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["C", "Java", "JavaScript", "Dart", "React", "Next.js", "Express", "MongoDB", "MySQL"].map((skill, index) => (
              <span key={index} className="px-4 py-2 text-sm font-medium bg-white/5 text-gray-200 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
