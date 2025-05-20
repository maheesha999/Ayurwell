import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackSection = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/feedback');
                setFeedbackList(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <section className="bg-white py-10 px-4">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">What Our Users Say</h2>
            <div className="max-w-4xl mx-auto space-y-4">
                {feedbackList.length === 0 ? (
                    <p className="text-center text-gray-500">No feedback available.</p>
                ) : (
                    feedbackList.map((fb) => (
                        <div key={fb._id} className="bg-white shadow rounded-md p-4">
                            <p className="text-gray-800">{fb.message}</p>
                            <p className="text-sm text-gray-400 mt-1">Posted on: {new Date(fb.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default FeedbackSection;
