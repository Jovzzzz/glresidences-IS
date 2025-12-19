import React from "react";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: "👤",
      title: "Owner",
      value: "GL Residences Management",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Brgy. Say-Oan, Bacnotan, La Union, Near DMMMSU-NLUC",
    },
    {
      icon: "📞",
      title: "Contact Number",
      value: "+63 917 115 3313",
    },
    {
      icon: "🌐",
      title: "Facebook",
      value: "GL Residences Facebook Page",
      link: "https://www.facebook.com/gl.residences.2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-10">
      <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-12 animate-bounce-in">
        📬 Contact GL Residences
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {contactInfo.map((info) => (
          <div
            key={info.title}
            className="bg-white rounded-3xl shadow-2xl p-8 flex items-start space-x-6 hover:shadow-3xl transition-all duration-300 animate-fade-in"
          >
            <span className="text-4xl">{info.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{info.title}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-lg hover:underline"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-gray-600 text-lg">{info.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-lg">
          For inquiries, please contact us via phone, visit our office, or check our Facebook page.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
