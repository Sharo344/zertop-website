// Reusable animation variants for Framer Motion

export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInDown = {
  initial: { 
    opacity: 0, 
    y: -60 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeIn = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const slideInLeft = {
  initial: { 
    opacity: 0, 
    x: -100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const slideInRight = {
  initial: { 
    opacity: 0, 
    x: 100 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Hover animations
export const hoverLift = {
  scale: 1.03,
  y: -8,
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3
  }
};

export const hoverRotate = {
  rotate: 2,
  scale: 1.02,
  transition: {
    duration: 0.3
  }
};

// Property card specific animations
export const cardHover = {
  y: -12,
  boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)",
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

// Page transition animations
export const pageTransition = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Modal animations
export const modalBackdrop = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export const modalContent = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

// Sidebar animations
export const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  closed: {
    x: "-100%",
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Loading spinner
export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Pulse animation
export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};