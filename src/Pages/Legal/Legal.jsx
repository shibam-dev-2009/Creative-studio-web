// pages/Legal.jsx
import { useParams } from "react-router-dom";

const content = {
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Introduction",
        text: "We respect your privacy and are committed to protecting your personal information."
      },
      {
        heading: "Information We Collect",
        text: "We may collect your name, email address, and usage data to improve our services."
      },
      {
        heading: "How We Use Information",
        text: "Your information is used to provide, maintain, and improve our services."
      },
      {
        heading: "Contact Us",
        text: "If you have questions, contact us at support@example.com."
      }
    ]
  },

  "terms-and-conditions": {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "Acceptance of Terms",
        text: "By using our service, you agree to these terms and conditions."
      },
      {
        heading: "User Responsibilities",
        text: "You agree not to misuse the service or violate any laws."
      },
      {
        heading: "Limitation of Liability",
        text: "We are not responsible for damages arising from the use of our service."
      }
    ]
  }
};

function Legal() {
  const { page } = useParams();
  const data = content[page];

  if (!data) {
    return (
      <div className="legal-page">
        <h1>Legal page not found</h1>
        <p>The requested legal document does not exist.</p>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <h1>{data.title}</h1>

      {data.sections.map((section, index) => (
        <div key={index} className="legal-section">
          <h2>{section.heading}</h2>
          <p>{section.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Legal;
