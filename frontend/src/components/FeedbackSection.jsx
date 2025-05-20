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
        <section className="bg-white py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    What Our Users Say
                </h2>
                {feedbackList.length === 0 ? (
                    <p className="text-center text-gray-500">No feedback available.</p>
                ) : (
                    <div className="space-y-5">
                        {feedbackList.map((fb) => (
                            <div
                                key={fb._id}
                                className="bg-gray-50 border border-gray-200 p-5 rounded-lg shadow-sm"
                            >
                                <p className="text-gray-700 text-base">{fb.message}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Posted on: {new Date(fb.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeedbackSection;
