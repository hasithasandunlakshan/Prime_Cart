"use client"; // Add this line to make it a Client Component

import React, { useState } from "react";
import './fnq.css'; // Import regular CSS file

const ChatBox: React.FC = () => {
  // Sample Q&A data
  const qnaList = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by entering your order ID in the 'Track Order' section of our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards and cash on delivery.",
    },
    {
      question: "What is your return policy?",
      answer: "You can return items within 30 days of purchase, provided they are in original condition.",
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically takes 5 days to main cities and 7 days to other areas.",
    },
    {
      question: "Can I modify my order after placing it?",
      answer: "You can modify your order within a short window after placing it. Contact customer support for assistance.",
    },
    {
      question: "What should I do if I receive a damaged item?",
      answer: "If you receive a damaged item, please contact our support team within 48 hours to initiate a return or exchange.",
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes, we offer gift cards that can be purchased on our website.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support via email or through the contact form on our website.",
    },
    {
      question: "Is there a loyalty program?",
      answer: "Yes, we have a loyalty program that rewards frequent shoppers with discounts and exclusive offers.",
    },
    {
      question: "Can I shop as a guest?",
      answer: "Yes, you can browse and shop as a guest without creating an account.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Function to toggle visibility of answers
  const toggleAnswer = (qnaIndex: number) => {
    setActiveIndex(activeIndex === qnaIndex ? null : qnaIndex);
  };

  return (
    <div className="chatBox">
      <h3>Need Help? Check Out Our FAQs!</h3>
      <div className="qnaContainer">
        {qnaList.map((qna, qnaIndex) => (
          <div key={qnaIndex} className="qnaItem">
            <button
              className="question"
              onClick={() => toggleAnswer(qnaIndex)}
            >
              {qna.question}
              <span className="arrow">
                {activeIndex === qnaIndex ? '▼' : '▶'}
              </span>
              <i className="fas fa-chevron-right icon"></i> {/* Icon added */}
            </button>
            {activeIndex === qnaIndex && (
              <div className="answer">{qna.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
