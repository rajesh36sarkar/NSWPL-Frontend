import React from "react";
import "../styles/team.css";

// ✅ Correct image imports
import adhir from "../assets/images/A.K.Saha.jpg.jpeg";
import kk from "../assets/images/K.K.Saha.png.jpeg";
import ayan from "../assets/images/Ayan saha.jpeg";
import lion from "../assets/images/Lion Saha.jpeg";
import noone from "../assets/images/No one dp.jpg";

const Team = () => {

 const teamMembers = [
  {
    id: 1,
    name: "Adhir Kumar Saha",
    role: "Managing Director (MD)",
    image: adhir,
  },
  {
    id: 2,
    name: "Kamal Kumar Saha",
    role: "Chief Executive Officer (CEO)",
    image: kk,
  },
  {
    id: 3,
    name: "Kanan Bala Saha",
    role: "Director",
    image: noone,
  },
  {
    id: 4,
    name: "Antara Saha",
    role: "Director",
    image: noone,
  },
  {
    id: 5,
    name: "Chirenjit Dey",
    role: "Manager",
    image: noone,
  },
  {
    id: 6,
    name: "Bappaditya Maity",
    role: "Accountant",
    image: noone,
  },
  {
    id: 7,
    name: "Ayan Saha",
    role: "Accountant",
    image: ayan,
  },
  {
    id: 8,
    name: "Subhrajoti Saha",
    role: "Digital Support",
    image: lion,
  },
  {
    id: 9,
    name: "MD Halim",
    role: "Worker",
    image: noone,
  },
  {
    id: 10,
    name: "Raju Gazi",
    role: "Worker",
    image: noone,
  },
  {
    id: 11,
    name: "Safik Gazi",
    role: "Worker",
    image: noone,
  },
  {
    id: 12,
    name: "MD Parwez",
    role: "Worker",
    image: noone,
  },
];

  return (
    <div className="team-container">

      <div className="team-header">
        <h1>Meet Our Team</h1>
        <p>The people behind Netai Stationery Works</p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.id}>

            <div className="member-image-wrapper">
              <img src={member.image} alt={member.name} />

              <div className="member-overlay">
                <div className="social-icons">
                  <span className="social-icon">F</span>
                  <span className="social-icon">L</span>
                  <span className="social-icon">T</span>
                </div>
              </div>
            </div>

            <div className="member-info">
              <h3>{member.name}</h3>
              <span className="member-role">{member.role}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Team;