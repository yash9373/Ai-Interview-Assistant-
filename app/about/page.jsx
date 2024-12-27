import React from "react";
import Header from '../dashboard/_components/Header';

function About() {
  const teamMembers = [
    {
      name: "MR. YASHODIP KOLHE",
      linkedin: "https://www.linkedin.com/in/yashodip-kolhe-68732a233/",
    },
    {
      name: "MR. VEDANT GORDE",
      linkedin: "https://www.linkedin.com/in/vedant-gorde/",
    },
    {
      name: "MR. PIYUSH GHANGHAV",
      linkedin: "https://www.linkedin.com/in/piyush-ghanghav/",
    },
    {
      name: "MR. SHREEJIT PANGAVHANE",
      linkedin: "https://www.linkedin.com/in/shreejit-pangavhane-564a98238/",
    },
  ];

  return (
    <div>
    <div>
      <Header />
    </div>
    <div className="p-10 font-sans">
      {/* About Us Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto">
          This is our final year project—a journey of learning, challenges, and triumphs. 
          It’s not the biggest, but it holds immense value for us. Each line of code, each test, 
          and every improvement reflects our dedication and passion. Together, we’ve built something 
          that we’re proud to share.
        </p>
      </section>

      {/* Team Members Section */}
      <section className="py-20 px-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-indigo-600 text-white flex items-center justify-center rounded-full text-2xl font-bold mb-4">
                {member.name[0]} {/* First Letter of Name */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-indigo-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="inline-block"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.026-3.062-1.865-3.062-1.866 0-2.152 1.459-2.152 2.967v5.699h-3v-11h2.881v1.507h.041c.401-.759 1.379-1.557 2.841-1.557 3.037 0 3.6 2 3.6 4.604v6.446z" />
                </svg>{" "}
                LinkedIn Profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}

export default About;
