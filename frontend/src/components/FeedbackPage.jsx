import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaEdit, FaTrash, FaRocket } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import feedbackBg from '../assets/feedbackBackground.jpg';
import Header from './headerfooter/Header';
import Footer from './headerfooter/Footer';

const COLORS = ['#FF6666', '#FFBB28', '#00C49F', '#0088FE', '#845EC2'];

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', message: '', rating: '' });
  const [editId, setEditId] = useState(null);
  const API = 'http://localhost:5555/feedbacks';

  const chartRef = useRef(null);
  const reportRef = useRef(null);
  const isInView = useInView(chartRef, { once: true });

  const loadFeedbacks = async () => {
    try {
      const res = await axios.get(API);
      setFeedbacks(res.data);
    } catch (err) {
      alert('Failed to load feedbacks');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.message.trim().length < 5) {
      alert('Feedback must be at least 5 characters long.');
      return;
    }
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API, form);
      }
      setForm({ name: '', message: '', rating: '' });
      loadFeedbacks();
    } catch (err) {
      alert('Submission failed');
    }
  };

  const handleEdit = (feedback) => {
    setEditId(feedback._id);
    setForm({ name: feedback.name, message: feedback.message, rating: feedback.rating });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`${API}/${id}`);
      loadFeedbacks();
    }
  };

  const renderStars = (count) =>
    Array.from({ length: count }, (_, i) => <FaStar key={i} className="text-yellow-500" />);

  const renderRatingStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`cursor-pointer text-2xl ${i < form.rating ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => handleStarClick(i + 1)}
      />
    ));

  const getRatingPercent = (rating) => {
    const total = feedbacks.length;
    const count = feedbacks.filter((f) => f.rating === rating).length;
    const percent = total > 0 ? (count / total) * 100 : 0;
    return percent.toFixed(1);
  };

  const renderDonutChart = (rating, index) => {
    const percent = parseFloat(getRatingPercent(rating));
    const data = [
      { name: 'Selected', value: percent },
      { name: 'Others', value: 100 - percent },
    ];

    return (
      <div key={rating} className="flex flex-col items-center w-1/5">
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={40}
              outerRadius={60}
              paddingAngle={3}
            >
              <Cell fill={COLORS[index]} />
              <Cell fill="#eee" />
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center text-sm font-medium mt-2">{rating} Star</p>
        <p className="text-gray-600 text-sm">{percent}%</p>
      </div>
    );
  };

  const downloadPDF = async () => {
    const input = reportRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('feedback-report.pdf');
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Header />

      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm brightness-75 opacity-10"
        style={{ backgroundImage: `url(${feedbackBg})` }}
      ></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-green-900 to-green-400 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <FaRocket className="inline mr-2" /> Feedback Portal
        </motion.h2>

        <motion.form onSubmit={handleSubmit} className="space-y-4 bg-white/80 shadow-xl rounded-2xl p-6 border border-gray-100 backdrop-blur-md">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={form.message}
            onChange={handleChange}
            required
            className={`w-full border px-4 py-2 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${form.message && form.message.trim().length < 5 ? 'border-red-500' : ''}`}
          />
          <div className="flex justify-between items-center">
            <p className={`text-sm ${form.message.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>{form.message.length}/200 characters</p>
          </div>
          {form.message && form.message.trim().length < 5 && <p className="text-red-500 text-sm">Feedback must be at least 5 characters.</p>}
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Your Rating:</label>
            {renderRatingStars()}
          </div>
          {form.message.trim().length >= 5 && (
            <div className="flex space-x-3">
              <motion.button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition">
                {editId ? 'Update' : 'Submit'}
              </motion.button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setForm({ name: '', message: '', rating: '' }); }} className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500">
                  Cancel
                </button>
              )}
            </div>
          )}
        </motion.form>

        <button onClick={downloadPDF} className="mt-6 bg-green-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md">
          Download Feedback Report
        </button>

        <div ref={reportRef} className="mt-10">
          <h3 className="text-2xl font-semibold mb-6 text-center">Recent Feedback</h3>

          <div className="overflow-x-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 pb-3">
            <div className="flex gap-4 flex-nowrap px-1">
              {feedbacks.map((fb, i) => (
                <motion.div
                  key={fb._id}
                  className="min-w-[24%] max-w-[24%] p-5 border rounded-xl shadow-md bg-white/90 hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg text-gray-800">{fb.name}</h4>
                    <span className="flex gap-1">{renderStars(fb.rating)}</span>
                  </div>
                  <p className="text-gray-600">{fb.message}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-center">Rating Distribution (1–5 Stars)</h3>
          <motion.div
            ref={chartRef}
            className="flex justify-between items-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.9 }}
          >
            {isInView && [1, 2, 3, 4, 5].map((rating, index) => renderDonutChart(rating, index))}
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default FeedbackPage;
