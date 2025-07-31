import React from 'react';

export default function ServicesPage() {
  const services = [
    {
      icon: "🌟",
      title: "Experience Services",
      description: "UX/UI design, customer experience, brand, campaigns"
    },
    {
      icon: "🔧",
      title: "Advanced Engineering",
      description: "Cloud-native apps, DevSecOps, digital product engineering"
    },
    {
      icon: "🧠",
      title: "Data & AI Services",
      description: "Data pipelines, AI/ML, analytics, automation"
    },
    {
      icon: "📱",
      title: "Application Services",
      description: "App management, testing, Oracle/SAP/Salesforce"
    },
    {
      icon: "🛡️",
      title: "Foundation Services",
      description: "Cloud infrastructure, workplace support, operations, cybersecurity"
    },
    {
    icon: "💻",
    title: "Development",
    description: "Full-stack development, web apps, mobile apps, microservices"
    },
    {
    icon: "🧪",
    title: "Testing",
    description: "Manual & automated testing, QA strategy, performance testing"
    }
  ];

  return (
    <div className="container mt-5 ">
      <h2 className="text-center mb-4 text-primary">Our Services</h2>
      <div className="row g-4 ">
        {services.map((service, index) => (
          <div className="col-md-6 col-lg-4  border border-dark p-3  " style={{"background-color": "#d03410ff"}} key={index}>
            <div className="card h-100 shadow-sm bg-transparent text-black  " >
              <div className="card-body text-center text-black">
                <div style={{ fontSize: '2rem' }}>{service.icon}</div>
                <h5 className="card-title mt-2">{service.title}</h5>
                <p className="card-text text-mute ">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
