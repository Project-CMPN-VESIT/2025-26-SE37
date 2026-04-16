import React, { useState } from "react";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    idType: "",
    idNumber: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
    helpText: "",
    availability: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
      };

      const response = await fetch("http://localhost:5000/api/volunteers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        alert("Application submitted successfully! We will contact you soon.");
        setFormData({
          name: "",
          gender: "",
          age: "",
          idType: "",
          idNumber: "",
          profession: "",
          phone: "",
          email: "",
          address: "",
          helpText: "",
          availability: "",
        });
      } else {
        console.error("Backend Error:", data);
        alert(data.message || "Failed to submit. Please check missing fields.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Background Soft Blurs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-emerald-100/30 dark:bg-emerald-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Join as a Volunteer
          </h1>
          <p className="text-indigo-600 font-bold text-xl mb-4 italic">
            स्वयंसेवक म्हणून सहभागी व्हा
          </p>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Your time and skills can change someone's life forever.
            <br />
            <span className="text-sm italic block mt-1 font-medium">
              (तुमचा वेळ आणि कौशल्ये कोणाचे तरी आयुष्य कायमचे बदलू शकतात.)
            </span>
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Details */}
            <div className="bg-indigo-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-indigo-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-400 mb-6 uppercase tracking-wider">
                Personal Details / वैयक्तिक माहिती
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name / पूर्ण नाव *
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Age / वय *
                  </label>
                  <input
                    required
                    name="age"
                    type="number"
                    min="18"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Gender / लिंग *
                  </label>
                  <select
                    required
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male / पुरुष</option>
                    <option value="Female">Female / स्त्री</option>
                    <option value="Other">Other / इतर</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: ID & Professional Details */}
            <div className="bg-indigo-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-indigo-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-400 mb-6 uppercase tracking-wider">
                ID & Profession / ओळख आणि व्यवसाय
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    ID Type / ओळखपत्राचा प्रकार *
                  </label>
                  <select
                    required
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  >
                    <option value="">Select ID</option>
                    <option value="Aadhar Card">
                      Aadhar Card / आधार कार्ड
                    </option>
                    <option value="Pan Card">Pan Card / पॅन कार्ड</option>
                    <option value="Voter ID">Voter ID / मतदान कार्ड</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    ID Number / ओळखपत्र क्रमांक *
                  </label>
                  <input
                    required
                    name="idNumber"
                    type="text"
                    placeholder="Enter ID number"
                    value={formData.idNumber}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Profession / व्यवसाय *
                  </label>
                  <input
                    required
                    name="profession"
                    type="text"
                    placeholder="e.g. Student, Doctor, Teacher, IT Professional"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Contact Details */}
            <div className="bg-indigo-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-indigo-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-400 mb-6 uppercase tracking-wider">
                Contact Details / संपर्क माहिती
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number / फोन नंबर *
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="10 digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address / ईमेल *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Permanent Address / कायमचा पत्ता *
                  </label>
                  <textarea
                    required
                    name="address"
                    rows="2"
                    placeholder="Enter your full residential address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 4: Contribution Details */}
            <div className="bg-indigo-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-indigo-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-400 mb-6 uppercase tracking-wider">
                Your Contribution / तुमचे योगदान
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Availability / उपलब्ध वेळ *
                  </label>
                  <input
                    required
                    name="availability"
                    type="text"
                    placeholder="e.g. Weekends (10 AM - 2 PM), 4 hours a week"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    How can you help? / आपण कशी मदत करू शकता? *
                  </label>
                  <textarea
                    required
                    name="helpText"
                    rows="3"
                    placeholder="e.g. Rescue operations, medical help, teaching, tech support..."
                    value={formData.helpText}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-white dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-500/30 dark:shadow-indigo-900/40 disabled:opacity-50 text-xl tracking-wide uppercase mt-8 transform hover:-translate-y-1"
            >
              {isSubmitting
                ? "Submitting... / अर्ज पाठवत आहे..."
                : "Submit Application / अर्ज सादर करा"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
