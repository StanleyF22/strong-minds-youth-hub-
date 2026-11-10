import React, { useState } from 'react';

// --- SEED DATA & CONSTANTS ---
const AUSTRALIAN_RESOURCES = [
  { name: 'Lifeline Australia', phone: '13 11 14', desc: '24/7 confidential crisis support.' },
  { name: 'Suicide Call Back Service', phone: '1300 659 467', desc: 'Free national 24/7 phone & online counselling.' },
  { name: 'Beyond Blue', phone: '1300 22 4636', desc: 'Support for anxiety, depression, and suicide prevention.' },
  { name: '13YARN', phone: '13 92 76', desc: '24/7 crisis support for Aboriginal & Torres Strait Islander people.' },
  { name: 'Kids Helpline', phone: '1800 55 1800', desc: 'Free, confidential 24/7 counselling for young people aged 5-25.' },
];

const DBT_SKILLS = [
  { title: 'TIPP: Temperature', text: 'Change your body chemistry quickly. Splash ice-cold water on your face or hold an ice cube to calm your nervous system instantly.' },
  { title: 'TIPP: Intense Exercise', text: 'Engage in short bursts of intense physical activity (jumping jacks, sprinting) to burn off overwhelming emotional energy.' },
  { title: 'STOP Skill', text: 'S: Stop. T: Take a step back. O: Observe your thoughts and feelings neutrally. P: Proceed mindfully.' },
  { title: 'Radical Acceptance', text: 'Completely accept reality as it is in this exact moment, without judging or fighting it. Fighting reality causes prolonged suffering.' },
];

const K10_QUESTIONS = [
  "Feel tired out for no good reason?",
  "Feel nervous?",
  "Feel so nervous that nothing could calm you down?",
  "Feel hopeless?",
  "Feel restless or fidgety?",
  "Feel so restless you could not sit still?",
  "Feel depressed?",
  "Feel that everything was an effort?",
  "Feel so sad that nothing could cheer you up?",
  "Feel worthless?"
];

export default function SafetyPlanApp() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('plan');
  
  // Safety Plan User Inputs
  const [goals, setGoals] = useState(['Complete my current study module', 'Walk by the beach once a week']);
  const [newGoal, setNewGoal] = useState('');
  const [protectiveFactors, setProtectiveFactors] = useState(['My family and my dog', 'Wanting to see the future']);
  const [newFactor, setNewFactor] = useState('');
  const [warningSigns, setWarningSigns] = useState('');
  const [copingStrategies, setCopingStrategies] = useState('');

  // K10 Self-Test State
  const [k10Answers, setK10Answers] = useState(Array(10).fill(1));
  const [k10Result, setK10Result] = useState(null);

  // --- HANDLERS ---
  const addItem = (type) => {
    if (type === 'goal' && newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    } else if (type === 'factor' && newFactor.trim()) {
      setProtectiveFactors([...protectiveFactors, newFactor.trim()]);
      setNewFactor('');
    }
  };

  const calculateK10 = () => {
    const totalScore = k10Answers.reduce((sum, val) => sum + val, 0);
    let interpretation = "";
    if (totalScore >= 10 && totalScore <= 15) interpretation = "Low psychological distress (likely to be well).";
    else if (totalScore <= 21) interpretation = "Moderate psychological distress (mild mental health struggle).";
    else if (totalScore <= 29) interpretation = "High psychological distress (moderate mental health struggle).";
    else interpretation = "Very high psychological distress (severe mental health struggle). Professional guidance strongly advised.";
    
    setK10Result({ score: totalScore, interpretation });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">My Wellbeing & Safety Space</h1>
            <p className="text-teal-100 text-sm mt-1">A structured repository for self-soothing, tracking, and proactive mental health safety planning.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-center transition shadow-sm animate-pulse">
            <a href="tel:000">EMERGENCY: CALL 000</a>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex divide-x divide-slate-100">
          <button onClick={() => setActiveTab('plan')} className={`flex-1 py-4 text-center font-semibold text-sm transition ${activeTab === 'plan' ? 'text-emerald-600 bg-emerald-50/50 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-slate-900'}`}>
            📋 Safety Plan
          </button>
          <button onClick={() => setActiveTab('dbt')} className={`flex-1 py-4 text-center font-semibold text-sm transition ${activeTab === 'dbt' ? 'text-emerald-600 bg-emerald-50/50 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-slate-900'}`}>
            🧠 DBT Skills
          </button>
          <button onClick={() => setActiveTab('k10')} className={`flex-1 py-4 text-center font-semibold text-sm transition ${activeTab === 'k10' ? 'text-emerald-600 bg-emerald-50/50 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-slate-900'}`}>
            📊 K10 Screener
          </button>
          <button onClick={() => setActiveTab('data')} className={`flex-1 py-4 text-center font-semibold text-sm transition ${activeTab === 'data' ? 'text-emerald-600 bg-emerald-50/50 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-slate-900'}`}>
            📈 QLD Insights
          </button>
        </div>
      </nav>

      {/* App Body Content Container */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
        
        {/* TAB 1: SAFETY PLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Crisis Contacts Block */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-amber-800 font-bold text-lg mb-3 flex items-center">🚨 Immediate Support Resources (Australia)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AUSTRALIAN_RESOURCES.map((r, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-amber-100 flex justify-between items-center shadow-xs">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.desc}</p>
                    </div>
                    <a href={`tel:${r.phone.replace(/\s+/g, '')}`} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow-xs transition">
                      {r.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals & Protective Factors Layout Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Goals */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-2">🎯 My Meaningful Goals</h3>
                <ul className="list-disc pl-5 mb-4 text-sm text-slate-600 space-y-1">
                  {goals.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
                <div className="flex gap-2">
                  <input type="text" placeholder="Add a new goal..." value={newGoal} onChange={(e) => setNewGoal(e.target.value)} className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-emerald-600" />
                  <button onClick={() => addItem('goal')} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded text-sm font-semibold transition">Add</button>
                </div>
              </div>

              {/* Protective Factors */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-2">🛡️ My Protective Factors & Strengths</h3>
                <ul className="list-disc pl-5 mb-4 text-sm text-slate-600 space-y-1">
                  {protectiveFactors.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <div className="flex gap-2">
                  <input type="text" placeholder="What keeps you safe?..." value={newFactor} onChange={(e) => setNewFactor(e.target.value)} className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-emerald-600" />
                  <button onClick={() => addItem('factor')} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded text-sm font-semibold transition">Add</button>
                </div>
              </div>
            </div>

            {/* Text Inputs for Clinical Safety Planning */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">⚡ My Personal Warning Signs</label>
                <textarea rows="2" placeholder="e.g., withdrawing from friends, staying up all night, feeling physically heavy..." value={warningSigns} onChange={(e) => setWarningSigns(e.target.value)} className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-emerald-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">🛠️ Internal Coping Strategies</label>
