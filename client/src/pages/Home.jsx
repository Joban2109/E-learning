import Hero from "@/components/Hero";
import React, { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import { Loader2, ChevronRight } from "lucide-react";
import api from '@/lib/axiosConfig';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/course/published-courses');
        
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          setError(response.data.message || 'Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        if (error.response) {
          setError(error.response.data?.message || `Error ${error.response.status}: Failed to fetch courses`)
        } else if (error.request) {
          setError('No response from server. Please check if the server is running.')
        } else {
          setError('An unexpected error occurred. Please try again later.')
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedCourses();
  }, []);

  const formatCourseForCard = (course) => {
    return {
      id: course._id,
      title: course.courseTitle,
      description: course.subTitle || course.description?.slice(0, 120) || 'No description available',
      image: course.courseThumbnail || 'https://via.placeholder.com/640x360?text=Course+Thumbnail',
      category: course.category,
      enrolled: course.enrolledStudents?.length || 0,
      lectureCount: course.lectures?.length || 0
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12
      }
    }
  };

  return (
    <div>
      <Hero />
      
      <motion.div 
        className="py-20 max-w-7xl mx-auto px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div 
          className="mb-12 text-center"
          variants={cardVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
              Our Courses
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether You're Just Beginning or Leveling Up your Skills, We've Got You
            Covered with Expert-Led Courses.
          </p>
        </motion.div>
        
        {loading ? (
          <div className='flex justify-center items-center h-40'>
            <Loader2 className='h-10 w-10 animate-spin text-violet-500' />
          </div>
        ) : error ? (
          <div className='text-center py-10 text-red-500 rounded-lg border border-red-200 bg-red-50 p-8'>
            <h3 className="text-lg font-semibold mb-2">Error Loading Courses</h3>
            {error}
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={sectionVariants}
            >
              {courses.slice(0, 6).map((course, index) => (
                <motion.div key={course._id} variants={cardVariants} custom={index}>
                  <CourseCard course={formatCourseForCard(course)} />
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/courses">
                <Button 
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Explore All Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="bg-gray-50 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our community about how NeoLearn has helped them grow professionally and personally.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "UI/UX Designer",
                quote: "The courses on NeoLearn helped me transition from graphic design to UI/UX with confidence. The instructors are top-notch!",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Sophia Chen",
                role: "Full Stack Developer",
                quote: "I went from knowing basic HTML to building full-stack applications in just 3 months. The project-based learning approach really works.",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Marcus Williams",
                role: "Data Scientist",
                quote: "The data science curriculum is comprehensive and up-to-date. I landed a job at a tech startup right after completing the advanced course.",
                image: "https://randomuser.me/api/portraits/men/67.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 border-2 border-violet-200"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
