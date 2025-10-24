import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { Box, Tab, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Close } from "@mui/icons-material";
import projectsData from "../data/projects.json";
import certificatesData from "../data/certificates.json";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300
      hover:text-white
      text-sm
      font-medium
      transition-all
      duration-300
      ease-in-out
      flex
      items-center
      gap-2
      bg-white/5
      hover:bg-white/10
      rounded-md
      border
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform
          duration-300
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};



const techStacks = [
  { icon: "/html.svg", language: "HTML" },
  { icon: "/css.svg", language: "CSS" },
  { icon: "/javascript.svg", language: "JavaScript" },
  { icon: "/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/reactjs.svg", language: "ReactJS" },
  { icon: "/vite.svg", language: "Vite" },
  { icon: "/nodejs.svg", language: "Node JS" },
  { icon: "/bootstrap.svg", language: "Bootstrap" },
  { icon: "/MUI.svg", language: "Material UI" },
  { icon: "/vercel.svg", language: "Vercel" },
  { icon: "/SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [techStackModalOpen, setTechStackModalOpen] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      // Use local projects data with live links and descriptions
      const projectData = projectsData.map((project) => ({
        id: project.id,
        ...project,
        TechStack: project.TechStack || [],
      }));

      // Use local certificates data
      const certificateData = certificatesData;

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error loading data:", error);
      // Fallback to local data
      const projectData = projectsData.map((project) => ({
        id: project.id,
        ...project,
        TechStack: project.TechStack || [],
      }));
      const certificateData = certificatesData;
      setProjects(projectData);
      setCertificates(certificateData);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const handleCertificateClick = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    setCertificateModalOpen(true);
  }, []);

  const handleTechStackClick = useCallback(() => {
    setTechStackModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setCertificateModalOpen(false);
    setTechStackModalOpen(false);
    setSelectedCertificate(null);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <TabContext value={value.toString()}>
          <Box sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
          >
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              sx={{
                minHeight: "70px",
                "& .MuiTab-root": {
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: "600",
                  color: "#94a3b8",
                  textTransform: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "20px 0",
                  zIndex: 1,
                  margin: "8px",
                  borderRadius: "12px",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    transform: "translateY(-2px)",
                    "& .lucide": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                  "&.Mui-selected": {
                    color: "#fff",
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                    boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                    "& .lucide": {
                      color: "#a78bfa",
                    },
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 0,
                },
                "& .MuiTabs-flexContainer": {
                  gap: "8px",
                },
              }}
            >
              <Tab
                icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
                label="Projects"
                value="0"
              />
              <Tab
                icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
                label="Certificates"
                value="1"
              />
              <Tab
                icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
                label="Tech Stack"
                value="2"
              />
            </TabList>
          </Box>

          <SwipeableViews
            axis="x"
            index={parseInt(value)}
            onChangeIndex={setValue}
          >
            <TabPanel value="0">
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                  {displayedProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        LiveLink={project.LiveLink}
                        id={project.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {projects.length > initialItems && (
                <div className="mt-6 w-full flex justify-start">
                  <ToggleButton
                    onClick={() => toggleShowMore('projects')}
                    isShowingMore={showAllProjects}
                  />
                </div>
              )}
            </TabPanel>

            <TabPanel value="1">
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                  {displayedCertificates.map((certificate, index) => (
                    <div
                      key={index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <Certificate
                        ImgSertif={certificate.Img}
                        title={certificate.title}
                        onClick={() => handleCertificateClick(certificate)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {certificates.length > initialItems && (
                <div className="mt-6 w-full flex justify-start">
                  <ToggleButton
                    onClick={() => toggleShowMore('certificates')}
                    isShowingMore={showAllCertificates}
                  />
                </div>
              )}
            </TabPanel>

            <TabPanel value="2">
              <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                  {techStacks.map((stack, index) => (
                    <div
                      key={index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <TechStackIcon
                        TechStackIcon={stack.icon}
                        Language={stack.language}
                        onClick={handleTechStackClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </SwipeableViews>
        </TabContext>
      </Box>

      {/* Certificate Modal */}
      <Dialog
        open={certificateModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#030014',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
          }}
        >
          {selectedCertificate?.title || 'Certificate'}
          <IconButton
            onClick={handleCloseModal}
            sx={{ color: '#ffffff' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '0 24px 24px 24px' }}>
          {selectedCertificate && (
            <img
              src={selectedCertificate.Img}
              alt={selectedCertificate.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                filter: 'contrast(1.10) brightness(0.9) saturate(1.1)',
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Tech Stack Modal */}
      <Dialog
        open={techStackModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#030014',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
          }}
        >
          All Tech Stacks
          <IconButton
            onClick={handleCloseModal}
            sx={{ color: '#ffffff' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '0 24px 24px 24px' }}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {techStacks.map((stack, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                  <img
                    src={stack.icon}
                    alt={`${stack.language} icon`}
                    className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                  />
                </div>
                <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                  {stack.language}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
