"use client";

import { useState, useEffect } from "react";
import { apiUrl } from "@/app/lib/api";
import { useAuth } from "@/app/lib/useAuth";
import AuthOnly from "@/app/components/AuthOnly";

const UserTestimonial = () => {
  const { user } = useAuth();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(apiUrl(`/api/profiles/${encodeURIComponent(user.email)}`));
        const data = await res.json();
        if (data && data.email) {
          setFullname(data.name || `${user.given_name || ""} ${user.family_name || ""}`.trim());
          setPicture(data.avatar || user.picture || "/user.svg");
          setEmail(data.email);
        } else {
          setPicture(user.picture || "/user.svg");
          if (user.given_name || user.family_name) {
            setFullname(`${user.given_name || ""} ${user.family_name || ""}`.trim());
          }
          setEmail(user.email);
        }
      } catch (err) {
        console.error("Error fetching profile", err);
        setPicture(user.picture || "/user.svg");
        if (user.given_name || user.family_name) {
          setFullname(`${user.given_name || ""} ${user.family_name || ""}`.trim());
        }
        setEmail(user.email);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError([]);

    try {
      const res = await fetch(apiUrl('/api/testimonials'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          message,
          picture,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      const { message: msg, success: isSuccess } = data;
      
      setError([msg]);
      setSuccess(isSuccess);

      if (isSuccess) {
        setFullname("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      setError([err.message || "Failed to submit testimonial. Please try again."]);
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthOnly>
      <div className="w-full min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto mt-16 md:mt-24 academic-pattern flex items-center justify-center">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-12 shadow-sm hover:shadow-[0px_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
          
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-on-surface font-bold mb-3 tracking-tight">
              Share Your Experience
            </h1>
            <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-md mx-auto">
              Your feedback helps us build a better academic library for everyone.
            </p>
          </header>

          {/* Success State Banner */}
          {success && error.length > 0 && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-3 animate-fadeIn">
              <span className="material-symbols-outlined text-emerald-600 mt-0.5">check_circle</span>
              <div>
                <h3 className="font-sans text-sm font-semibold text-emerald-950 mb-0.5">Thank you!</h3>
                <p className="font-sans text-sm text-emerald-850">
                  {error[0] || "Your testimonial has been submitted successfully and is pending review."}
                </p>
              </div>
            </div>
          )}

          {/* Error State Banner */}
          {!success && error.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 animate-fadeIn">
              <span className="material-symbols-outlined text-red-600 mt-0.5">error</span>
              <div>
                <h3 className="font-sans text-sm font-semibold text-red-950 mb-0.5">Submission Failed</h3>
                <p className="font-sans text-sm text-red-850">
                  {error.join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Testimonial Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-sm font-semibold text-on-surface" htmlFor="fullname">
                  Full Name
                </label>
                <input
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  type="text"
                  id="fullname"
                  placeholder="Jane Doe"
                  required
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-sans text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-sm font-semibold text-on-surface" htmlFor="email">
                  Academic Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  placeholder="jane.doe@nitjsr.ac.in"
                  required
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-sans text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-sm font-semibold text-on-surface" htmlFor="message">
                Your Message
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                id="message"
                rows="5"
                placeholder="How has NoteShaala helped your studies?"
                required
                className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-sans text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y placeholder:text-gray-400 min-h-[120px]"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full md:w-auto font-sans font-semibold text-sm bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-8 py-3 rounded-lg transition-all duration-200 flex justify-center items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit Testimonial"}</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthOnly>
  );
};

export default UserTestimonial;
