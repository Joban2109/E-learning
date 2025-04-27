import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseCard from "@/components/CourseCard";
import { Loader2, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from '@/lib/axiosConfig';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  useEffect(() => {
    // Set the selected category from URL parameter if available
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    fetchPublishedCourses();
  }, [categoryParam]);
  
  const fetchPublishedCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/course/published-courses');
      
      if (response.data.success) {
        setCourses(response.data.courses);
        
        // Extract unique categories for filter dropdown
        const uniqueCategories = [...new Set(response.data.courses.map(course => course.category))];
        setCategories(uniqueCategories.filter(Boolean)); // Remove empty categories
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
  
  function filterCourses() {
    return courses.filter((course) => {
      const titleMatch = course.courseTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const subTitleMatch = course.subTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = course.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryMatch = selectedCategory === "all" || selectedCategory === "" || course.category === selectedCategory;

      return (titleMatch || subTitleMatch || descriptionMatch) && categoryMatch;
    });
  }

  return (
    <div className="py-20 px- sm:px-6 lg:px-8 max-w-7xl mx-auto ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Explore Our Courses
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discover a wide range of courses designed to help you acquire new skills and knowledge
      </p>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <Loader2 className='h-10 w-10 animate-spin text-violet-500' />
        </div>
      ) : error ? (
        <div className='text-center py-10 text-red-500'>
          {error}
        </div>
      ) : filterCourses().length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-600 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory 
              ? "Try adjusting your search or filter criteria."
              : "Check back later for new courses."}
          </p>
          {(searchTerm || selectedCategory) && (
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCourses().map((course) => (
            <CourseCard key={course._id} course={formatCourseForCard(course)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;