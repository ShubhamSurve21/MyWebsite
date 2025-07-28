import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useDarkMode } from './DarkModeContext';

// Create context
export const AIAssistantContext = createContext();

// Custom hook to use the AI Assistant context
export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

// Sample data for demonstration - in a real app, this would come from your backend
const portfolioData = {
  owner: {
    name: 'Shubham',
    email: 'shubham@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    about: 'Full-stack developer with expertise in React, Node.js, and AI integration.',
    resumeUrl: '/resume.pdf',
    calendlyUrl: 'https://calendly.com/shubham/30min',
    whatsapp: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/shubham',
    github: 'https://github.com/shubham',
  },
  skills: [
    { name: 'React', level: 'Expert', years: 4 },
    { name: 'Node.js', level: 'Advanced', years: 3 },
    { name: 'Python', level: 'Advanced', years: 5 },
    { name: 'TensorFlow', level: 'Intermediate', years: 2 },
    { name: 'AWS', level: 'Advanced', years: 3 },
    { name: 'MongoDB', level: 'Advanced', years: 4 },
    { name: 'GraphQL', level: 'Intermediate', years: 2 },
    { name: 'Docker', level: 'Intermediate', years: 3 },
  ],
  projects: [
    {
      id: 1,
      title: 'AI-Powered E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with AI-driven product recommendations and customer support.',
      technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'AWS'],
      demoUrl: 'https://ai-ecommerce.example.com',
      githubUrl: 'https://github.com/shubham/ai-ecommerce',
      image: '/projects/ecommerce.jpg',
    },
    {
      id: 2,
      title: 'Smart Home Automation System',
      description: 'Developed an IoT-based smart home system with voice control and energy optimization.',
      technologies: ['Python', 'TensorFlow', 'React Native', 'AWS IoT', 'MongoDB'],
      demoUrl: 'https://smarthome.example.com',
      githubUrl: 'https://github.com/shubham/smart-home',
      image: '/projects/smarthome.jpg',
    },
    {
      id: 3,
      title: 'Financial Analytics Dashboard',
      description: 'Created a real-time financial analytics dashboard with predictive modeling capabilities.',
      technologies: ['React', 'D3.js', 'Node.js', 'Python', 'PostgreSQL'],
      demoUrl: 'https://finance-analytics.example.com',
      githubUrl: 'https://github.com/shubham/finance-analytics',
      image: '/projects/finance.jpg',
    },
  ],
  services: [
    {
      id: 1,
      title: 'Full-Stack Development',
      description: 'End-to-end web application development with modern technologies.',
      icon: 'code',
    },
    {
      id: 2,
      title: 'AI Integration',
      description: 'Integrate AI capabilities into your existing applications.',
      icon: 'brain',
    },
    {
      id: 3,
      title: 'Cloud Architecture',
      description: 'Design and implement scalable cloud solutions.',
      icon: 'cloud',
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications with React Native.',
      icon: 'mobile',
    },
  ],
};

// Helper function to get current section based on scroll position
const getCurrentSection = () => {
  if (typeof window === 'undefined') return 'hero';
  
  const sections = [
    { id: 'hero', element: document.getElementById('hero') },
    { id: 'about', element: document.getElementById('about') },
    { id: 'services', element: document.getElementById('services') },
    { id: 'projects', element: document.getElementById('projects') },
    { id: 'testimonials', element: document.getElementById('testimonials') },
    { id: 'contact', element: document.getElementById('contact') },
  ].filter(section => section.element);
  
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (!section.element) continue;
    
    const offsetTop = section.element.offsetTop;
    if (scrollPosition >= offsetTop) {
      return section.id;
    }
  }
  
  return sections[0]?.id || 'hero';
};

// Provider component
export const AIAssistantProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [conversationContext, setConversationContext] = useState({
    recentTopics: [],
    userPreferences: {},
    interactionCount: 0,
  });
  const { isDarkMode } = useDarkMode();
  const chatContainerRef = useRef(null);
  const messageEndRef = useRef(null);
  
  // Update current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const newSection = getCurrentSection();
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);
  
  // Load conversation from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('aiAssistant_messages');
    const savedContext = localStorage.getItem('aiAssistant_context');
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    } else {
      // Initial welcome message
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([
            {
              id: 1,
              text: "Hi! I'm AIVA — Shubham's smart assistant. Need help exploring his work?",
              sender: 'ai',
              timestamp: new Date().toISOString(),
            }
          ]);
          setIsTyping(false);
        }, 1000);
      }, 500);
    }
    
    if (savedContext) {
      try {
        setConversationContext(JSON.parse(savedContext));
      } catch (error) {
        console.error('Failed to parse saved context:', error);
      }
    }
  }, []);
  
  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('aiAssistant_messages', JSON.stringify(messages));
    }
    
    localStorage.setItem('aiAssistant_context', JSON.stringify(conversationContext));
  }, [messages, conversationContext]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  
  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // If opening the chat and no messages, send welcome message
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([
            {
              id: 1,
              text: "Hi! I'm AIVA — Shubham's smart assistant. Need help exploring his work?",
              sender: 'ai',
              timestamp: new Date().toISOString(),
            }
          ]);
          setIsTyping(false);
        }, 1000);
      }, 500);
    }
  };
  
  // Send message
  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      interactionCount: prev.interactionCount + 1,
      recentTopics: [...prev.recentTopics, text.toLowerCase()].slice(-5),
    }));
    
    // In a real app, you would call an API here
    // For now, we'll simulate a response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(text, currentSection),
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for realism
  };
  
  // Handle voice input
  const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      if (!listening) {
        recognition.start();
        setListening(true);
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          sendMessage(transcript);
          setListening(false);
        };
        
        recognition.onerror = () => {
          setListening(false);
        };
        
        recognition.onend = () => {
          setListening(false);
        };
      } else {
        setListening(false);
      }
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };
  
  // Get context-aware suggestions based on current section and conversation history
  const getSuggestions = () => {
    const defaultSuggestions = [
      "Tell me about Shubham's projects",
      "What technologies does Shubham use?",
      "How can I contact Shubham?",
      "Download Shubham's resume"
    ];
    
    // If we have a current section, offer contextual suggestions
    switch (currentSection) {
      case 'hero':
        return [
          "What can you do?",
          "Tell me about Shubham",
          "Show me Shubham's work",
          "What services does Shubham offer?"
        ];
      case 'about':
        return [
          "What are Shubham's skills?",
          "Download Shubham's resume",
          "Where has Shubham worked?",
          "Tell me more about Shubham's experience"
        ];
      case 'services':
        return [
          "Tell me more about AI integration",
          "How does Shubham approach full-stack development?",
          "What cloud platforms does Shubham work with?",
          "Does Shubham build mobile apps?"
        ];
      case 'projects':
        return [
          "Tell me about the AI e-commerce project",
          "Show me Shubham's best work",
          "What technologies were used in these projects?",
          "Are there any live demos I can see?"
        ];
      case 'testimonials':
        return [
          "Who has Shubham worked with?",
          "What do clients say about Shubham?",
          "Does Shubham have any case studies?",
          "How can I provide feedback?"
        ];
      case 'contact':
        return [
          "What's the best way to contact Shubham?",
          "Can I schedule a meeting with Shubham?",
          "What's Shubham's email address?",
          "Is Shubham available for freelance work?"
        ];
      default:
        return defaultSuggestions;
    }
  };
  
  // Enhanced AI response function with context awareness
  const getAIResponse = (text, currentSection) => {
    const lowerText = text.toLowerCase();
    
    // Check for navigation commands
    if (lowerText.includes('scroll to') || lowerText.includes('go to') || lowerText.includes('show me')) {
      const sections = ['about', 'services', 'projects', 'testimonials', 'contact'];
      for (const section of sections) {
        if (lowerText.includes(section)) {
          // In a real implementation, you would scroll to the section here
          setTimeout(() => {
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
          return `I'll take you to the ${section} section right away!`;
        }
      }
    }
    
    // Check for download resume request
    if (lowerText.includes('resume') || lowerText.includes('cv')) {
      // In a real implementation, you would trigger the download here
      return "You can download Shubham's resume using the 'Download Resume' button in the About section, or I can open it for you now. Would you like me to open it?";
    }
    
    // Check for contact requests
    if (lowerText.includes('contact') || lowerText.includes('hire') || lowerText.includes('email')) {
      return `You can contact Shubham through the contact form in the Contact section, or directly via email at ${portfolioData.owner.email}. Would you like me to scroll to the contact section?`;
    }
    
    // Check for scheduling/calendar requests
    if (lowerText.includes('schedule') || lowerText.includes('meeting') || lowerText.includes('call')) {
      return `Shubham uses Calendly for scheduling meetings. I can open his calendar for you to book a time slot. Would you like me to do that?`;
    }
    
    // Check for WhatsApp requests
    if (lowerText.includes('whatsapp') || lowerText.includes('message') || lowerText.includes('chat with')) {
      return `You can chat with Shubham on WhatsApp at ${portfolioData.owner.whatsapp}. Would you like me to open WhatsApp for you?`;
    }
    
    // Project specific responses
    if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio')) {
      // If asking about a specific project
      for (const project of portfolioData.projects) {
        if (lowerText.includes(project.title.toLowerCase())) {
          return `${project.title}: ${project.description} It was built using ${project.technologies.join(', ')}. Would you like to see the demo or the code repository?`;
        }
      }
      
      // General project response
      return `Shubham has worked on several exciting projects including ${portfolioData.projects.map(p => p.title).join(', ')}. Each project showcases different skills and technologies. Which one would you like to know more about?`;
    }
    
    // Skills and tech stack responses
    if (lowerText.includes('tech') || lowerText.includes('stack') || lowerText.includes('technology') || lowerText.includes('skill')) {
      const topSkills = portfolioData.skills.filter(skill => skill.level === 'Expert' || skill.level === 'Advanced').map(skill => skill.name);
      return `Shubham is proficient in ${topSkills.join(', ')}. He specializes in full-stack development with a focus on AI integration. Is there a specific technology you'd like to know more about?`;
    }
    
    // Service specific responses
    if (lowerText.includes('service') || lowerText.includes('offer')) {
      return `Shubham offers services including ${portfolioData.services.map(s => s.title).join(', ')}. Each service is tailored to client needs. Which service are you interested in learning more about?`;
    }
    
    // Context-aware responses based on current section
    switch (currentSection) {
      case 'hero':
        return "Welcome to Shubham's portfolio! I'm AIVA, his AI assistant. I can help you explore his work, skills, and services. What would you like to know about?";
      case 'about':
        return `Shubham is a ${portfolioData.owner.about} Based in ${portfolioData.owner.location}, he's passionate about creating innovative solutions. What specific aspect of his background interests you?`;
      case 'services':
        return "You're currently viewing Shubham's services. He offers expertise in full-stack development, AI integration, cloud architecture, and mobile app development. Which service interests you most?";
      case 'projects':
        return "You're looking at Shubham's project portfolio. Each project demonstrates his technical skills and problem-solving abilities. Would you like details about a specific project?";
      case 'testimonials':
        return "These testimonials reflect the quality of Shubham's work and client satisfaction. His collaborative approach and technical expertise are consistently praised. Would you like to know more about his work process?";
      case 'contact':
        return "Ready to reach out? You can use this contact form, email directly at shubham@example.com, or schedule a call. What's your preferred method of communication?";
      default:
        // General responses for greetings and other queries
        if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
          return "Hello there! I'm AIVA, Shubham's AI assistant. How can I help you today?";
        } else if (lowerText.includes('thank')) {
          return "You're welcome! Is there anything else you'd like to know about Shubham or his work?";
        } else if (lowerText.includes('bye') || lowerText.includes('goodbye')) {
          return "Thanks for chatting! Feel free to reach out if you have more questions about Shubham's work.";
        } else {
          return "I'm here to help you learn more about Shubham and his work. Feel free to ask about his projects, skills, services, or how to get in touch!";
        }
    }
  };
  
  // Function to handle UI actions (like scrolling, opening modals, etc.)
  const handleUIAction = (action, data = {}) => {
    switch (action) {
      case 'scrollTo':
        const element = document.getElementById(data.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      
      case 'openModal':
        // This would trigger a modal to open - implementation depends on your UI library
        // For example, you might have a state in your app context that controls modals
        console.log('Opening modal:', data.modalId);
        return true;
      
      case 'downloadFile':
        // Create a temporary anchor to trigger download
        const link = document.createElement('a');
        link.href = data.fileUrl;
        link.download = data.fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
      
      case 'openExternalLink':
        window.open(data.url, '_blank');
        return true;
      
      default:
        console.warn('Unknown UI action:', action);
        return false;
    }
  };
  
  // Clear conversation history
  const clearConversation = () => {
    setMessages([]);
    setConversationContext({
      recentTopics: [],
      userPreferences: {},
      interactionCount: 0,
    });
    localStorage.removeItem('aiAssistant_messages');
    localStorage.removeItem('aiAssistant_context');
    
    // Send welcome message again
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: "Hi! I'm AIVA — Shubham's smart assistant. Need help exploring his work?",
            sender: 'ai',
            timestamp: new Date().toISOString(),
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }, 500);
  };
  
  // Value object to be provided by the context
  const value = {
    isOpen,
    toggleChat,
    messages,
    isTyping,
    listening,
    currentSection,
    conversationContext,
    sendMessage,
    handleVoiceInput,
    getSuggestions,
    handleUIAction,
    clearConversation,
    chatContainerRef,
    messageEndRef,
  };
  
  return (
    <AIAssistantContext.Provider value={value}>
      {children}
    </AIAssistantContext.Provider>
  );
};