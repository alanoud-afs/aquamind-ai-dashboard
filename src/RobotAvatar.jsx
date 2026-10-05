import React from 'react';

const RobotAvatar = ({ size = 72 }) => {
  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={size * 1.2}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glossy gradient for main body */}
        <linearGradient id="glossyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#f0f4ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#e8ecff" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#d0d8ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1a2b6b" stopOpacity="0.9" />
        </linearGradient>

        {/* Navy gradient for accent areas */}
        <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2b6b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0f1a3f" stopOpacity="0.9" />
        </linearGradient>

        {/* Glowing cyan for eyes */}
        <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="1" />
          <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0084ff" stopOpacity="0.3" />
        </radialGradient>

        {/* Water drop gradient */}
        <radialGradient id="waterGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0084ff" stopOpacity="0" />
        </radialGradient>

        {/* Metallic shine */}
        <linearGradient id="shine" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow filters */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="eyeGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="waterGlowFilter">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dark Navy Background */}
      <rect width="200" height="240" fill="#0d1829" rx="20" />

      {/* Main Robot Head - Smooth rounded shape */}
      <ellipse cx="100" cy="90" rx="65" ry="75" fill="url(#glossyGradient)" stroke="#1a2b6b" strokeWidth="1" />

      {/* Head accent - Navy band on bottom */}
      <ellipse cx="100" cy="130" rx="60" ry="35" fill="url(#navyGradient)" opacity="0.7" />

      {/* Forehead accent */}
      <path
        d="M 50 60 Q 100 35 150 60 Q 120 65 100 68 Q 80 65 50 60"
        fill="#ffffff"
        opacity="0.4"
      />

      {/* Left Eye - Glowing Cyan */}
      <g filter="url(#eyeGlow)">
        <circle cx="75" cy="80" r="12" fill="url(#cyanGlow)" />
        <circle cx="75" cy="80" r="12" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
        <circle cx="76" cy="78" r="4" fill="#ffffff" opacity="0.8" />
      </g>

      {/* Right Eye - Glowing Cyan */}
      <g filter="url(#eyeGlow)">
        <circle cx="125" cy="80" r="12" fill="url(#cyanGlow)" />
        <circle cx="125" cy="80" r="12" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
        <circle cx="126" cy="78" r="4" fill="#ffffff" opacity="0.8" />
      </g>

      {/* Friendly mouth - curved smile */}
      <path
        d="M 80 110 Q 100 125 120 110"
        stroke="#1a2b6b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Mouth accent line */}
      <path
        d="M 85 112 Q 100 120 115 112"
        stroke="#00f0ff"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Chest Section */}
      <rect x="60" y="155" width="80" height="60" fill="url(#navyGradient)" rx="10" stroke="#1a2b6b" strokeWidth="1" />

      {/* Water Drop Symbol on Chest */}
      <g filter="url(#waterGlowFilter)">
        {/* Drop shape */}
        <path
          d="M 100 170 C 95 175 92 182 92 187 C 92 194 95.8 200 100 200 C 104.2 200 108 194 108 187 C 108 182 105 175 100 170 Z"
          fill="url(#waterGlow)"
          stroke="#00f0ff"
          strokeWidth="0.5"
          opacity="0.8"
        />
        {/* Inner glow */}
        <path
          d="M 100 170 C 95 175 92 182 92 187 C 92 194 95.8 200 100 200 C 104.2 200 108 194 108 187 C 108 182 105 175 100 170 Z"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="1"
          opacity="0.4"
        />
      </g>

      {/* Metallic shine overlay on head */}
      <ellipse cx="100" cy="70" rx="40" ry="50" fill="url(#shine)" />

      {/* Additional studio lighting - right side highlight */}
      <ellipse cx="140" cy="85" rx="25" ry="40" fill="#ffffff" opacity="0.15" />

      {/* Additional studio lighting - left side shadow */}
      <ellipse cx="60" cy="100" rx="20" ry="45" fill="#0f1a3f" opacity="0.2" />

      {/* Subtle antenna accent */}
      <rect x="48" y="35" width="3" height="15" fill="#1a2b6b" rx="1.5" />
      <rect x="149" y="35" width="3" height="15" fill="#1a2b6b" rx="1.5" />
      <circle cx="49.5" cy="33" r="2" fill="#00f0ff" opacity="0.6" />
      <circle cx="150.5" cy="33" r="2" fill="#00f0ff" opacity="0.6" />
    </svg>
  );
};

export default RobotAvatar;
