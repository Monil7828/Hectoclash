import React, { useState } from "react";

const SignIn = ({ onClose, onSwitchToSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-8 rounded-2xl w-[400px] shadow-xl border border-primary/20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-white">Sign In</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-primary transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1e293b] text-white py-2.5 px-4 rounded-xl mb-4 border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e293b] text-white py-2.5 px-4 rounded-xl border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button className="w-full bg-primary hover:bg-primary/70 active:bg-primary/80 text-white py-2.5 rounded-xl mb-4 transition-colors font-medium">
          SIGN IN
        </button>

        <p className="text-center text-sm text-gray-400">
          New user?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="text-primary hover:text-primary/90 hover:underline transition-colors"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
