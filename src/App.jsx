import React, { useState } from 'react';
import { 
  Search, Crosshair, BookOpen, MessageSquare, 
  Users, CheckCircle, Calendar, TrendingUp, Plus, 
  ExternalLink, ChevronRight, ChevronLeft, Target, Shield, Zap
} from 'lucide-react';

// --- DATA & CONSTANTS ---
const STAGES = [
  { id: 0, title: "Scouted (Backlog)", desc: "Gathered from platforms" },
  { id: 1, title: "Day 1: Recon", desc: "Read & comment" },
  { id: 2, title: "Day 2-3: Value Add", desc: "Share & engage" },
  { id: 3, title: "Day 4: Direct", desc: "Reply with insight" },
  { id: 4, title: "Day 5: Seeding", desc: "Organic Legion mention" },
  { id: 5, title: "Day 6: The Ask", desc: "Formal invitation" },
  { id: 6, title: "Day 7: Logged", desc: "Handoff & review" },
  { id: 7, title: "Booked 🎉", desc: "Speaker confirmed" }
];

const INITIAL_TARGETS = [
  { id: 1, name: "Dr. Aris Thorne", niche: "Supply Chain Innovator", platform: "Substack", stage: 1, notes: "Wrote about decentralized logistics." },
  { id: 2, name: "Elena Rostova", niche: "Sci-Fi Author", platform: "Goodreads", stage: 4, notes: "New book exploring digital post-scarcity." },
  { id: 3, name: "Marcus Webb", niche: "Productivity Expert", platform: "Twitter", stage: 0, notes: "Found via min_faves:20 query." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [targets, setTargets] = useState(INITIAL_TARGETS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTarget, setNewTarget] = useState({ name: '', niche: '', platform: 'Substack', stage: 0 });
  const [twitterQuery, setTwitterQuery] = useState('("my new book" OR "my new newsletter") filter:links min_faves:20');

  // --- HANDLERS ---
  const advanceStage = (id) => {
    setTargets(targets.map(t => t.id === id && t.stage < 7 ? { ...t, stage: t.stage + 1 } : t));
  };

  const regressStage = (id) => {
    setTargets(targets.map(t => t.id === id && t.stage > 0 ? { ...t, stage: t.stage - 1 } : t));
  };

  const addTarget = (e) => {
    e.preventDefault();
    if (!newTarget.name) return;
    setTargets([...targets, { ...newTarget, id: Date.now() }]);
    setNewTarget({ name: '', niche: '', platform: 'Substack', stage: 0 });
    setShowAddModal(false);
  };

  // --- COMPONENTS ---
  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-500" />
            Legion.cc
          </h1>
          <p className="text-xs text-blue-400 font-medium uppercase tracking-wider mt-1">The Republic Ops</p>
        </div>
        
        <nav className="flex-1 px-4 mt-4">
          <TabButton id="pipeline" icon={Crosshair} label="Hunter Pipeline" />
          <TabButton id="toolkit" icon={Search} label="Scout Toolkit" />
          <TabButton id="scripts" icon={MessageSquare} label="Scripts & Pitch" />
          <TabButton id="team" icon={TrendingUp} label="Team Alignment" />
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3 text-sm">
            <p className="text-slate-400 mb-1">Weekly Goal</p>
            <p className="font-bold text-white text-lg">30 Scouted / 3 Booked</p>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">
              {activeTab === 'pipeline' ? '7-Day Engagement Pipeline' : 
               activeTab === 'toolkit' ? 'Discovery & Scout Toolkit' : 
               activeTab === 'scripts' ? 'Playbooks & Value Propositions' : 'Team Metrics & Sync'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">Execute the Hunter-Gatherer operational model.</p>
          </div>
          {activeTab === 'pipeline' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Target
            </button>
          )}
        </header>

        <main className="p-6">
          
          {/* PIPELINE TAB */}
          {activeTab === 'pipeline' && (
            <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-160px)]">
              {STAGES.map(stage => (
                <div key={stage.id} className="min-w-[320px] bg-slate-900 rounded-xl border border-slate-800 flex flex-col">
                  <div className="p-4 border-b border-slate-800 bg-slate-800/50 rounded-t-xl">
                    <h3 className="font-bold text-white flex items-center justify-between">
                      {stage.title}
                      <span className="bg-slate-700 text-xs py-1 px-2 rounded-full">
                        {targets.filter(t => t.stage === stage.id).length}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{stage.desc}</p>
                  </div>
                  
                  <div className="p-3 flex-1 overflow-y-auto space-y-3">
                    {targets.filter(t => t.stage === stage.id).map(target => (
                      <div key={target.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-blue-100">{target.name}</h4>
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-slate-700 text-slate-300 px-2 py-1 rounded">
                            {target.platform}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{target.niche}</p>
                        {target.notes && (
                          <p className="text-xs text-slate-500 italic mb-4 bg-slate-900/50 p-2 rounded">
                            "{target.notes}"
                          </p>
                        )}
                        
                        <div className="flex justify-between mt-auto pt-2 border-t border-slate-700/50">
                          <button 
                            onClick={() => regressStage(target.id)}
                            disabled={target.stage === 0}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded disabled:opacity-30 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => advanceStage(target.id)}
                            disabled={target.stage === 7}
                            className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded disabled:opacity-30 transition-colors flex items-center text-xs font-medium"
                          >
                            Advance <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {targets.filter(t => t.stage === stage.id).length === 0 && (
                      <div className="text-center py-8 text-slate-600 text-sm border-2 border-dashed border-slate-800 rounded-lg">
                        Empty Stage
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TOOLKIT TAB */}
          {activeTab === 'toolkit' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Twitter / X Operators</h3>
                    <p className="text-sm text-slate-400">Discover creators actively promoting new work.</p>
                  </div>
                </div>
                <textarea 
                  value={twitterQuery}
                  onChange={(e) => setTwitterQuery(e.target.value)}
                  className="w-full bg-slate-950 p-4 rounded-lg font-mono text-sm text-blue-300 mb-4 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y min-h-[80px]"
                />
                <button 
                  onClick={() => window.open(`https://twitter.com/search?q=${encodeURIComponent(twitterQuery)}`, '_blank', 'noopener,noreferrer')}
                  className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> Open Search Query
                </button>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mr-4">
                    <BookOpen className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Substack Discovery</h3>
                    <p className="text-sm text-slate-400">Target deep-tech and culture writers.</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-4 text-sm text-slate-300">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-400" /> Browse "Top Technology" or "Culture" leaderboards.</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-400" /> Look for mid-sized followings active in "Notes".</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-400" /> Subscribe to free tiers to enter funnels.</li>
                </ul>
                <button 
                  onClick={() => window.open('https://substack.com/home/explore', '_blank', 'noopener,noreferrer')}
                  className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> Go to Substack Leaderboards
                </button>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Goodreads & LinkedIn</h3>
                    <p className="text-sm text-slate-400">Targeting newly published authors and industry experts.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Goodreads</h4>
                    <p className="text-sm text-slate-300">Search for newly published books in Sci-Fi, Economics, Tech, History. Authors on book tours are highly receptive.</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">LinkedIn Hashtags</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">#Author</span>
                      <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">#TechSpeaker</span>
                      <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">#Innovation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCRIPTS TAB */}
          {activeTab === 'scripts' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Value Propositions */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
                  <h3 className="font-bold text-lg text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" /> The Pitch: Core Value Propositions
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-blue-300 mb-2">1. Meritocracy Engine</h4>
                    <p className="text-sm text-slate-300">Zero bots. Highlight our Legion Score system (on/off-chain data) ensuring they speak to a real, highly-engaged human audience.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-300 mb-2">2. Cross-Pollination</h4>
                    <p className="text-sm text-slate-300">Expand audience reach. Introduce them to a forward-thinking, lucrative Web3 demographic outside Web2 algorithms.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-300 mb-2">3. The "Next Internet"</h4>
                    <p className="text-sm text-slate-300">A safe entry to Web3. Emphasize we are MiCA-compliant and backed by Kraken—a professional environment.</p>
                  </div>
                </div>
              </div>

              {/* Day by Day Scripts */}
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-white mt-8 mb-4">7-Day Engagement Scripts</h3>
                
                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-slate-500">
                  <h4 className="font-bold text-white mb-1">Day 4: Direct Intellectual Engagement</h4>
                  <p className="text-sm text-slate-400 mb-3">Objective: Establish direct communication based on mutual interests.</p>
                  <div className="bg-slate-950 p-4 rounded text-sm text-slate-200 border border-slate-800 font-serif italic">
                    "I loved your recent chapter on [Topic]. Have you ever considered how decentralized networks might impact that specific dynamic?"
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-white mb-1">Day 5: Contextual Seeding</h4>
                  <p className="text-sm text-slate-400 mb-3">Objective: Prime the creator for the Legion community.</p>
                  <div className="bg-slate-950 p-4 rounded text-sm text-slate-200 border border-slate-800 font-serif italic">
                    "We were actually just discussing this exact concept in the Legion.cc community today. A lot of our members are fascinated by your take on [Topic]."
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-white mb-1">Day 6: The Formal Invitation (The Ask)</h4>
                  <p className="text-sm text-slate-400 mb-3">Objective: Execute the speaker pitch.</p>
                  <div className="bg-slate-950 p-4 rounded text-sm text-slate-200 border border-slate-800 font-serif italic">
                    "Hi [Name], I've been a massive fan of your work this week—especially your thoughts on [Topic]. I help run community events over at Legion.cc (we're a compliant, merit-based platform backed by Kraken).<br/><br/>
                    Our members are highly vetted and deeply interested in your field. We would be honored to host you for a 30-minute AMA or guest speaker session. It's a great way to introduce your work to a dedicated, new audience.<br/><br/>
                    Let me know if you'd be open to a quick chat about it!"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEAM ALIGNMENT TAB */}
          {activeTab === 'team' && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <div className="flex items-center mb-6">
                  <Calendar className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold text-white">The Monday Brief</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-2">Current Weekly Goal</label>
                    <p className="text-white font-medium">30 new authors scouted</p>
                    <p className="text-white font-medium">15 invites sent</p>
                    <p className="text-white font-medium">3 speakers booked</p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors">
                    Update Weekly Goals
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-bold text-white">The Friday Review</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg border border-green-500/30">
                    <p className="text-sm text-slate-300">
                      <span className="font-bold text-white">Win of the week:</span> Outreach Specialist Sarah successfully booked a sci-fi author by engaging with their Patreon. 
                    </p>
                    <button className="text-blue-400 text-sm mt-2 font-medium hover:text-blue-300">View Script Used →</button>
                  </div>
                  <button className="w-full border border-slate-700 hover:bg-slate-800 text-white py-2 rounded-lg font-medium transition-colors">
                    Log Weekly Win
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h3 className="font-bold text-white">Add New Target</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">&times;</button>
            </div>
            <form onSubmit={addTarget} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Expert/Author Name</label>
                <input 
                  type="text" required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={newTarget.name} onChange={(e) => setNewTarget({...newTarget, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Niche/Expertise</label>
                <input 
                  type="text" placeholder="e.g. Fintech Researcher" required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={newTarget.niche} onChange={(e) => setNewTarget({...newTarget, niche: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Platform Found</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={newTarget.platform} onChange={(e) => setNewTarget({...newTarget, platform: e.target.value})}
                >
                  <option>Substack</option>
                  <option>Goodreads</option>
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                  <option>Patreon</option>
                  <option>Discord</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Initial Notes (Optional)</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none h-20"
                  value={newTarget.notes || ''} onChange={(e) => setNewTarget({...newTarget, notes: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium">Save Target</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}