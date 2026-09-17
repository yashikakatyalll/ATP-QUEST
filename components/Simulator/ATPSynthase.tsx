import React, { useState, useEffect, useRef } from 'react';

interface ElectronParticle {
  id: number;
  angle: number;
  distance: number;
  speed: number;
}

export const ATPSynthase: React.FC<{ isActive: boolean; protonGradient: number }> = ({ isActive, protonGradient }) => {
  const [electrons, setElectrons] = useState<ElectronParticle[]>([]);
  const [rotation, setRotation] = useState(0);
  const electronIdRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setRotation(prev => prev + 8); // Continuous rotation

      // Spawn electrons periodically
      if (Math.random() < 0.3 && protonGradient > 10) {
        const newElectron: ElectronParticle = {
          id: electronIdRef.current++,
          angle: Math.random() * 360,
          distance: 80,
          speed: 2 + Math.random() * 3
        };
        setElectrons(prev => [...prev.slice(-4), newElectron]); // Keep max 5 electrons
      }

      // Update electron positions
      setElectrons(prev => prev.map(electron => ({
        ...electron,
        distance: electron.distance + electron.speed,
        angle: electron.angle + 2
      })).filter(electron => electron.distance < 200)); // Remove when too far

    }, 50);

    return () => clearInterval(interval);
  }, [isActive, protonGradient]);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer ring */}
      <div className="absolute w-56 h-56 border-4 border-orange-500/30 rounded-full"></div>

      {/* Inner spinning rotor */}
      <div
        className="relative w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-2xl flex items-center justify-center transition-transform"
        style={{
          transform: `rotate(${rotation}deg)`,
          boxShadow: isActive ? '0 0 60px rgba(251, 146, 60, 0.4)' : '0 0 20px rgba(251, 146, 60, 0.2)'
        }}
      >
        {/* Rotor blades */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-16 bg-orange-300 rounded-full origin-bottom"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              opacity: isActive ? 0.9 : 0.5
            }}
          ></div>
        ))}

        {/* Central hub */}
        <div className="w-12 h-12 bg-orange-800 rounded-full flex items-center justify-center border-2 border-orange-300">
          <i className="fas fa-cog text-orange-100 text-lg"></i>
        </div>
      </div>

      {/* ATP molecules being produced */}
      {isActive && protonGradient > 15 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-orange-400 animate-pulse">
            ATP
          </div>
        </div>
      )}

      {/* Electron particles moving outward */}
      {electrons.map(electron => (
        <div
          key={electron.id}
          className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${Math.cos(electron.angle * Math.PI / 180) * electron.distance}px, ${Math.sin(electron.angle * Math.PI / 180) * electron.distance}px)`,
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
          }}
        >
          <div className="w-full h-full bg-red-400 rounded-full animate-ping"></div>
        </div>
      ))}

      {/* Proton flow indicators */}
      {isActive && [...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${i * 60 + rotation}deg) translateY(-100px)`,
            animation: `protonFlow 2s ease-in-out infinite ${i * 0.3}s`
          }}
        ></div>
      ))}

      {/* Energy waves */}
      {isActive && (
        <div className="absolute inset-0 rounded-full border-2 border-orange-400 opacity-20 animate-ping"
             style={{ animationDuration: '1.5s' }}></div>
      )}
    </div>
  );
};