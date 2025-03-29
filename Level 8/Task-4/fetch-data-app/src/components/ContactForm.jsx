import React, { useState } from 'react';
import axios from 'axios';
import "../styles/App.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({ success: false, error: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: false, error: '' });

        try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
            setStatus({ success: true, error: '' });
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            setStatus({ success: false, error: 'Failed to submit the form. Please try again.' });
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">Contact Us</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    required
                />
                <button type="submit" className="btn">Submit</button>
                {status.success && <div className="success">✅ Message sent successfully!</div>}
                {status.error && <div className="error">❌ {status.error}</div>}
            </form>
        </div>
    );
};

export default ContactForm;