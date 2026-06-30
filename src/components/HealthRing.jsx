import React from 'react';

export function HealthRing({ score, grade }){
    const circ = 2 * Math.PI * 18;
    const offset = circ - (score / 100) * circ;
    const color = score >= 80 ? 'var(--green)' : score >= 60 ? 'var(--orange)' : 'var(--red)';
    return (
        <div className="health-ring">
            <svg width="48" height="48">
                <circle cx="24" cy="24" r="18" fill="none" stroke="var(--bg3)" strokeWidth="4" />
                <circle cx="24" cy="24" r="18" fill="none" stroke={color} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="health-ring-value" style={{ color }}>{grade}</div>
        </div>
    );
}
