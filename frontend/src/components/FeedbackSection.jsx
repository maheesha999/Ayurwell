import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeedbackSection = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('http://localhost:5555/feedbacks');
        setFeedbackList(res.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const total = feedbackList.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (total === 0) return;
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [currentIndex, total]);

  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const renderStars = (count = 0) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`text-base ${i < count ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));

  const getRelativeIndex = (i) => {
    const half = Math.floor(total / 2);
    const diff = (i - currentIndex + total) % total;
    return diff > half ? diff - total : diff;
  };

  const getStyle = (i) => {
    const offset = getRelativeIndex(i);
    const abs = Math.abs(offset);
    const scale = 1 - abs * 0.06;
    const x = offset * 130;
    const opacity = abs > 3 ? 0 : 1 - abs * 0.2;
    const zIndex = 10 - abs;

    return {
      x,
      scale,
      opacity,
      zIndex,
    };
  };

  return (
    <section className="bg-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">💬 What our users say</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse text-base">Loading feedback...</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-center text-gray-500 text-base">No feedback available.</p>
      ) : (
        <div className="relative h-[15rem] max-w-6xl mx-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            {feedbackList.map((fb, i) => {
              const style = getStyle(i);

              return (
                <motion.div
                  key={fb._id}
                  className="absolute w-64 md:w-72 min-h-[12rem] bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center"
                  style={{ zIndex: style.zIndex }}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={{ duration: 0.7 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -100) handleNext();
                    else if (info.offset.x > 100) handlePrev();
                  }}
                >
                  <p className="text-lg font-medium text-gray-700 italic mb-3 leading-relaxed">
                    "{fb.message}"
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{fb.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-center mt-2">{renderStars(fb.rating)}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeedbackSection;
