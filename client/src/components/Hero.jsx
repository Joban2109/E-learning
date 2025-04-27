import { Award, Search, User } from 'lucide-react'
import React, { useState } from 'react'
import HeroImg from '../assets/HeroImg.jpg'
import CountUp from 'react-countup'
import HeroModel3D from './HeroModel3D'
import AnimatedBackground from './AnimatedBackground'
import { motion } from 'framer-motion'

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className='bg-slate-800 pt-14 relative overflow-hidden'>
      <AnimatedBackground />
      
      <motion.div 
        className='lg:h-[700px] max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center relative z-10'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* text section */}
        <motion.div className='space-y-7 px-4 md:px-0' variants={itemVariants}>
          <motion.h1 
            className='text-4xl mt-10 md:mt-0 md:text-6xl font-extrabold text-gray-200'
            variants={itemVariants}
          >
            "Unlock Your <span className='text-violet-500'>Potential</span>,
            <br/> One Course at a Time."
          </motion.h1>
          
          <motion.p 
            className='text-gray-400 text-lg'
            variants={itemVariants}
          >
            We make Learning simple, smart, and something you'll actually look forward to.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex space-x-4"
          >
            <motion.button 
              className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-lg hover:bg-violet-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            
            <motion.button 
              className="px-6 py-3 border border-violet-400 text-violet-400 font-semibold rounded-lg hover:bg-violet-900/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Courses
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Model and image section */}
        <motion.div 
          className='flex flex-col md:h-[500px] items-center relative px-4 md:px-0'
          variants={itemVariants}
        >
          <div className="hidden md:block">
            <HeroModel3D />
          </div>
          
          <motion.div 
            className="relative mt-4 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isImageLoaded ? 1 : 0, 
              scale: isImageLoaded ? 1 : 0.8 
            }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={HeroImg} 
              alt="Learning platform" 
              className='w-[420px] rounded-xl shadow-violet-200 drop-shadow-lg'
              onLoad={() => setIsImageLoaded(true)}
            />
            
            <motion.div 
              className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[15%] right-10 px-4 py-2 shadow-lg'
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            >
              <div className='rounded-full bg-violet-500 p-2 text-white'>
                <User/>
              </div>
              <div>
                <h2 className='font-bold text-2xl'><CountUp end={150} duration={2.5} />+</h2>
                <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
              </div>
            </motion.div> 

            <motion.div 
              className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[1%] left-5 px-4 py-2 shadow-lg'
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
            >
              <div className='rounded-full bg-violet-500 p-2 text-white'>
                <Award/>
              </div>
              <div>
                <h2 className='font-bold text-2xl'><CountUp end={25} duration={2} />+</h2>
                <p className='italic text-sm text-gray-600 leading-none'>Certified Courses</p>
              </div>
            </motion.div> 
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Feature highlights with animation */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[
          { title: "Expert Instructors", description: "Learn from industry professionals and academics" },
          { title: "Interactive Learning", description: "Engage with hands-on exercises and quizzes" },
          { title: "Flexible Schedule", description: "Study at your own pace, anytime, anywhere" }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl border border-violet-500/30"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)" }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-bold text-violet-400 mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Hero