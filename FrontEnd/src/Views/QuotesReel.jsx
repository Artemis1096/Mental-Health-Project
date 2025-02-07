import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { 
    text: "Life is what happens while you're busy making other plans.", 
    author: "John Lennon", 
    image: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=" 
  },
  { 
    text: "The only way to do great work is to love what you do.", 
    author: "Steve Jobs", 
    image: "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=" 
  },
  { 
    text: "Be the change you wish to see in the world.", 
    author: "Mahatma Gandhi", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWDdX4zyRAIoiiq1zPn51YvMIYst5Z-5MlVQ&s" 
  },
  { 
    text: "In the middle of difficulty lies opportunity.", 
    author: "Albert Einstein", 
    image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg" 
  }
];

const QuoteReel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextQuote = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') prevQuote();
      else if (event.key === 'ArrowDown') nextQuote();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-8 flex flex-col items-center gap-4">
      <button 
        onClick={prevQuote}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Previous quote"
      >
        <ChevronUp size={24} />
      </button>

      <div className="w-full bg-white rounded-lg shadow-lg p-6 overflow-hidden relative h-80 flex justify-center items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            className="absolute flex flex-col items-center text-center"
            initial={{ opacity: 0, y: direction * 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -direction * 40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img 
              src={quotes[currentIndex].image} 
              alt="Quote visual" 
              className="w-64 h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-black text-xl mb-2">{quotes[currentIndex].text}</p>
            <p className="text-black font-semibold">- {quotes[currentIndex].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={nextQuote}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Next quote"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
};

export default QuoteReel;
