import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import logo from  '../assets/logo.jpg';
import { setUser } from "@/redux/authSlice";
import { endSession } from "@/redux/screenTimeSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add scroll event listener with throttling for performance
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null));
        dispatch(endSession());
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const linkVariants = {
    hover: { scale: 1.1, color: "#a78bfa", transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  const staggerMenuItems = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Determine if a link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.div 
      className={`${isScrolled 
        ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' 
        : 'bg-gray-900'} 
        z-50 w-full py-3 fixed top-0 transition-all duration-300`}
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      style={{
        boxShadow: isScrolled 
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' 
          : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between px-4 md:px-6">
        {/* logo section */}
        <Link to="/">
          <motion.div 
            className="flex gap-1 items-center"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <motion.img 
              src={logo} 
              className="text-gray-300 w-10 h-10 rounded-full" 
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                boxShadow: [
                  '0 0 0 rgba(167, 139, 250, 0)',
                  '0 0 20px rgba(167, 139, 250, 0.5)',
                  '0 0 0 rgba(167, 139, 250, 0)'
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            <motion.h1 
              className="text-gray-300 text-3xl font-bold"
              animate={{ 
                color: ["#d1d5db", "#8b5cf6", "#d1d5db"],
                textShadow: [
                  '0 0 0px rgba(139, 92, 246, 0)', 
                  '0 0 10px rgba(139, 92, 246, 0.5)', 
                  '0 0 0px rgba(139, 92, 246, 0)'
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              NeoLearn
            </motion.h1>
          </motion.div>
        </Link>

        {/* Mobile menu button - visible on small screens */}
        <motion.div 
          className="md:hidden flex items-center"
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <motion.div
              className="w-6 h-0.5 bg-white mb-1.5"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white mb-1.5"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            />
          </button>
        </motion.div>

        {/* Desktop menu */}
        <motion.nav 
          className="hidden md:block"
          variants={staggerMenuItems} 
          initial="initial" 
          animate="animate"
        >
          <motion.ul className="flex gap-7 text-xl items-center font-semibold text-white">
            <Link to="/">
              <motion.li 
                className={`cursor-pointer ${isLinkActive('/') ? 'text-violet-400' : 'text-white'}`}
                variants={menuItemVariants}
                whileHover={linkVariants.hover}
              > 
                <div className="relative">
                  Home
                  {isLinkActive('/') && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                      layoutId="underline"
                    />
                  )}
                </div>
              </motion.li>
            </Link>
            <Link to="/courses">
              <motion.li 
                className={`cursor-pointer ${isLinkActive('/courses') ? 'text-violet-400' : 'text-white'}`}
                variants={menuItemVariants}
                whileHover={linkVariants.hover}
              > 
                <div className="relative">
                  Courses
                  {isLinkActive('/courses') && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                      layoutId="underline"
                    />
                  )}
                </div>
              </motion.li>
            </Link>

            {!user ? (
              <motion.div 
                className="flex gap-3"
                variants={menuItemVariants}
              >
                <Link to="/login">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button className="bg-violet-500 hover:bg-violet-600 transition-all">
                      Login
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/signup">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button className="bg-gray-700 hover:bg-blue-800 transition-all">
                      Signup
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center gap-7"
                variants={menuItemVariants}
              >
                {
                  user.role ==="instructor" && 
                  <Link to="/admin/dashboard">
                    <motion.li 
                      className={`cursor-pointer ${isLinkActive('/admin/dashboard') ? 'text-violet-400' : 'text-white'}`}
                      whileHover={linkVariants.hover}
                    > 
                      <div className="relative">
                        Admin
                        {isLinkActive('/admin/dashboard') && (
                          <motion.div 
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                            layoutId="underline"
                          />
                        )}
                      </div>
                    </motion.li>
                  </Link>
                }
                {
                  user.role ==="student" && 
                  <Link to="/dashboard">
                    <motion.li 
                      className={`cursor-pointer ${isLinkActive('/dashboard') ? 'text-violet-400' : 'text-white'}`}
                      whileHover={linkVariants.hover}
                    > 
                      <div className="relative">
                        dashboard
                        {isLinkActive('/dashboard') && (
                          <motion.div 
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                            layoutId="underline"
                          />
                        )}
                      </div>
                    </motion.li>
                  </Link>
                }
                <Link to="/profile">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user.photoUrl}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>
                        {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    {isLinkActive('/profile') && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                        layoutId="underline"
                      />
                    )}
                  </motion.div>
                </Link>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={logoutHandler}
                    className="bg-blue-500 hover:bg-blue-600 transition-all"
                  >
                    Logout
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.ul>
        </motion.nav>
      </div>

      {/* Mobile menu - slides in from the top */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-5 space-y-3">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <motion.div 
                  className={`text-lg font-semibold ${isLinkActive('/') ? 'text-violet-400' : 'text-white'}`}
                  whileHover={{ x: 5 }}
                >
                  Home
                </motion.div>
              </Link>
              <Link to="/courses" onClick={() => setMenuOpen(false)}>
                <motion.div 
                  className={`text-lg font-semibold ${isLinkActive('/courses') ? 'text-violet-400' : 'text-white'}`}
                  whileHover={{ x: 5 }}
                >
                  Courses
                </motion.div>
              </Link>
              
              {user && user.role === "instructor" && (
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                  <motion.div 
                    className={`text-lg font-semibold ${isLinkActive('/admin/dashboard') ? 'text-violet-400' : 'text-white'}`}
                    whileHover={{ x: 5 }}
                  >
                    Admin
                  </motion.div>
                </Link>
              )}
              
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <motion.div 
                      className={`text-lg font-semibold ${isLinkActive('/profile') ? 'text-violet-400' : 'text-white'}`}
                      whileHover={{ x: 5 }}
                    >
                      Profile
                    </motion.div>
                  </Link>
                  <motion.button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
                    onClick={() => {
                      logoutHandler();
                      setMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-md font-semibold"
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      className="w-full bg-gray-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold"
                      whileTap={{ scale: 0.95 }}
                    >
                      Signup
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
