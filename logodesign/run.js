import React, { useState, useRef } from 'react';
import { Download, RefreshCw, Layout, Palette, Settings, Sparkles, MessageSquare } from 'lucide-react';

const LogoGenerator = () => {
  // State for customization
  const [paperCount, setPaperCount] = useState(8);
  const [spiralOffset, setSpiralOffset] = useState(40);
  const [paperWidth, setPaperWidth] = useState(60);
  const [paperHeight, setPaperHeight] = useState(85);
  const [foldSize, setFoldSize] = useState(15);
  const [rotationOffset, setRotationOffset] = useState(0);
  
  // Colors
  const [paperColor, setPaperColor] = useState('#f8fafc'); // Slate-50
  const [foldColor, setFoldColor] = useState('#cbd5e1');   // Slate-300
  const [accentColor, setAccentColor] = useState('#3b82f6'); // Blue-500
  const [textColor, setTextColor] = useState('#94a3b8');   // Slate-400
  const [bgColor, setBgColor] = useState('#ffffff');       // Background for preview

  // AI State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrand, setGeneratedBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('layout'); // 'layout', 'dimensions', 'colors', 'ai'

  const svgRef = useRef(null);
  const apiKey = ""; // System will provide the key

  // --- Gemini API Logic ---

  const callGemini = async (systemPrompt, userPrompt) => {
    setIsGenerating(true);
    setGeneratedBrand(null);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          }),
        }
      );

      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      return result;

    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Something went wrong with the AI generation. Please try again.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMagicDesign = async () => {
    if (!prompt) return;

    const systemPrompt = `
      You are an expert graphic designer. You control a logo generator that creates circular logos made of folded research papers.
      User will describe a brand or a vibe. You must return a JSON object with specific parameters to match that vibe.
      
      Parameters you control:
      - paperCount (integer 3-24): Low for simple/bold, High for complex/detailed.
      - spiralOffset (integer 0-100): 0 is a tight pile, 100 is a large ring.
      - rotationOffset (0-360): Orientation.
      - paperWidth (30-100) & paperHeight (40-120): Aspect ratio of papers.
      - foldSize (0-40): Size of the dog-ear fold.
      - paperColor (hex): Base color of the paper.
      - foldColor (hex): Shadow color of the fold (usually darker version of paperColor).
      - accentColor (hex): Main brand color for highlights.
      - textColor (hex): Color of the text lines on the paper.

      Example: "Marine Biology" -> Blue tones, fluid spiral.
      Example: "Old History Archive" -> Beige/Yellow tones, tight stack.
    `;

    const result = await callGemini(systemPrompt, `Generate logo settings for: ${prompt}`);
    
    if (result) {
      if (result.paperCount) setPaperCount(result.paperCount);
      if (result.spiralOffset) setSpiralOffset(result.spiralOffset);
      if (result.rotationOffset) setRotationOffset(result.rotationOffset);
      if (result.paperWidth) setPaperWidth(result.paperWidth);
      if (result.paperHeight) setPaperHeight(result.paperHeight);
      if (result.foldSize) setFoldSize(result.foldSize);
      if (result.paperColor) setPaperColor(result.paperColor);
      if (result.foldColor) setFoldColor(result.foldColor);
      if (result.accentColor) setAccentColor(result.accentColor);
      if (result.textColor) setTextColor(result.textColor);
    }
  };

  const handleGenerateBrand = async () => {
    const currentState = {
      paperCount, spiralOffset, paperWidth, paperHeight, 
      colors: { paperColor, accentColor, textColor }
    };

    const systemPrompt = `
      You are a branding expert. Analyze the visual parameters of a logo and invent a fictional Research Institute name and slogan that fits the visual style.
      
      Visuals:
      - High paper count + tight spiral = Complex, Data-heavy, Hive mind.
      - Low paper count + wide spiral = Open, Airy, Innovative.
      - Blue colors = Medical, Tech, Trust.
      - Earth tones = History, Archaeology, Nature.
      - Bright colors = Creative, Design, Arts.

      Return JSON: { "name": "Institute Name", "slogan": "Short punchy slogan" }
    `;

    const result = await callGemini(systemPrompt, `Analyze these logo settings: ${JSON.stringify(currentState)}`);
    
    if (result) {
      setGeneratedBrand(result);
    }
  };

  // --- Utility Functions ---

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const scale = 4;
    canvas.width = 500 * scale;
    canvas.height = 500 * scale;
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "research-paper-logo.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const getPaperPath = (w, h, f) => `M 0 0 L ${w - f} 0 L ${w} ${f} L ${w} ${h} L 0 ${h} Z`;
  const getFoldPath = (w, h, f) => `M ${w - f} 0 L ${w - f} ${f} L ${w} ${f} Z`;

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
             <Layout className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Research Logo Studio</h1>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          <Download size={16} />
          Download PNG
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Controls Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl z-0">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            {[
              { id: 'ai', icon: Sparkles, label: 'AI Studio' },
              { id: 'layout', icon: Settings, label: 'Layout' },
              { id: 'colors', icon: Palette, label: 'Colors' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            
            {/* TAB: AI STUDIO */}
            {activeTab === 'ai' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                
                {/* Feature 1: Magic Design */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-sm">
                    <Sparkles size={16} />
                    Magic Design
                  </div>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Describe your organization or vibe, and we'll generate the perfect logo settings for you.
                  </p>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. A futuristic quantum computing lab with neon colors..."
                    className="w-full p-3 text-sm border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white mb-3 h-24 resize-none"
                  />
                  <button
                    onClick={handleMagicDesign}
                    disabled={isGenerating || !prompt}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2 rounded-lg font-medium text-sm transition-colors flex justify-center items-center gap-2"
                  >
                    {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'Generate Logo ✨'}
                  </button>
                </div>

                {/* Feature 2: Brand ID */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2 mb-2 text-slate-700 font-bold text-sm">
                    <MessageSquare size={16} />
                    Brand Identity
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Based on your current design, let AI suggest a fitting name and slogan.
                  </p>
                  <button
                    onClick={handleGenerateBrand}
                    disabled={isGenerating}
                    className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg font-medium text-sm transition-colors flex justify-center items-center gap-2 mb-4"
                  >
                    {isGenerating ? 'Thinking...' : 'Invent Brand Identity ✨'}
                  </button>

                  {generatedBrand && (
                    <div className="bg-slate-800 text-white p-4 rounded-xl shadow-lg animate-in zoom-in-95 duration-300">
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Suggested Name</div>
                      <div className="font-bold text-lg mb-2">{generatedBrand.name}</div>
                      <div className="h-px bg-slate-700 my-2" />
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Slogan</div>
                      <div className="italic text-slate-300 font-light">"{generatedBrand.slogan}"</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: LAYOUT */}
            {activeTab === 'layout' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Paper Count</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{paperCount}</span>
                  </div>
                  <input 
                    type="range" min="3" max="24" step="1" 
                    value={paperCount} onChange={(e) => setPaperCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Spiral Offset</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{spiralOffset}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={spiralOffset} onChange={(e) => setSpiralOffset(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Rotation</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{rotationOffset}°</span>
                  </div>
                  <input 
                    type="range" min="0" max="360" 
                    value={rotationOffset} onChange={(e) => setRotationOffset(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="text-xs uppercase font-bold text-slate-400 mb-4 tracking-wider">Dimensions</div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Width</label>
                      <input 
                        type="range" min="30" max="100" 
                        value={paperWidth} onChange={(e) => setPaperWidth(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg accent-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Height</label>
                      <input 
                        type="range" min="40" max="120" 
                        value={paperHeight} onChange={(e) => setPaperHeight(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg accent-blue-600"
                      />
                    </div>
                  </div>
                   <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Fold Size</label>
                      <input 
                        type="range" min="0" max="40" 
                        value={foldSize} onChange={(e) => setFoldSize(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg accent-blue-600"
                      />
                    </div>
                </div>
              </div>
            )}

            {/* TAB: COLORS */}
            {activeTab === 'colors' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                {[
                  { label: 'Paper Base', val: paperColor, set: setPaperColor },
                  { label: 'Fold Corner', val: foldColor, set: setFoldColor },
                  { label: 'Brand Accent', val: accentColor, set: setAccentColor },
                  { label: 'Text Lines', val: textColor, set: setTextColor },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <label className="text-sm font-medium text-slate-700">{c.label}</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase">{c.val}</span>
                      <input 
                        type="color" value={c.val} onChange={(e) => c.set(e.target.value)}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer overflow-hidden p-0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-100/50 relative">
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => {
                setPaperCount(8);
                setSpiralOffset(40);
                setPaperWidth(60);
                setPaperHeight(85);
                setRotationOffset(0);
                setPaperColor('#f8fafc');
                setAccentColor('#3b82f6');
                setGeneratedBrand(null);
                setPrompt('');
              }}
              className="bg-white p-2 rounded-lg shadow-sm hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
              title="Reset Defaults"
            >
              <RefreshCw size={18} />
            </button>
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-xs font-mono text-slate-400 border border-slate-100">
              500 x 500 px
            </div>
          </div>

          <div 
            className="bg-white shadow-2xl rounded-2xl p-1 transition-all duration-500 ease-in-out"
            style={{ backgroundColor: bgColor === '#ffffff' ? 'transparent' : bgColor }}
          >
            {/* The SVG to be exported */}
            <svg 
              ref={svgRef}
              width="500" 
              height="500" 
              viewBox="-250 -250 500 500"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full max-h-[75vh] w-auto h-auto transition-all duration-500"
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="1" dy="1" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>

              <g transform={`rotate(${rotationOffset})`}>
                {Array.from({ length: paperCount }).map((_, i) => {
                  const angle = (i * 360) / paperCount;
                  return (
                    <g 
                      key={i} 
                      transform={`rotate(${angle}) translate(0, -${spiralOffset})`}
                    >
                      <g transform="translate(0, 0)"> 
                        <g transform={`translate(-${paperWidth/2}, -${paperHeight/2})`} filter="url(#shadow)">
                          <path 
                            d={getPaperPath(paperWidth, paperHeight, foldSize)} 
                            fill={paperColor} 
                            stroke={foldColor}
                            strokeWidth="0.5"
                          />
                          <path 
                            d={getFoldPath(paperWidth, paperHeight, foldSize)} 
                            fill={foldColor} 
                            opacity="0.8"
                          />
                          <rect x={paperWidth * 0.15} y={paperHeight * 0.25} width={paperWidth * 0.5} height={paperHeight * 0.04} rx="1" fill={accentColor} opacity="0.8" />
                          <rect x={paperWidth * 0.15} y={paperHeight * 0.35} width={paperWidth * 0.7} height={paperHeight * 0.03} rx="1" fill={textColor} />
                          <rect x={paperWidth * 0.15} y={paperHeight * 0.42} width={paperWidth * 0.7} height={paperHeight * 0.03} rx="1" fill={textColor} />
                          <rect x={paperWidth * 0.15} y={paperHeight * 0.49} width={paperWidth * 0.7} height={paperHeight * 0.03} rx="1" fill={textColor} />
                          <rect x={paperWidth * 0.15} y={paperHeight * 0.56} width={paperWidth * 0.4} height={paperHeight * 0.03} rx="1" fill={textColor} />
                          
                          <rect x={paperWidth * 0.15} y={paperHeight * 0.7} width={paperWidth * 0.3} height={paperWidth * 0.3} rx="2" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.5" />
                          <path d={`M ${paperWidth * 0.15} ${paperHeight * 0.85} L ${paperWidth * 0.25} ${paperHeight * 0.75} L ${paperWidth * 0.35} ${paperHeight * 0.8} L ${paperWidth * 0.45} ${paperHeight * 0.72}`} fill="none" stroke={accentColor} strokeWidth="1" strokeLinecap="round" />
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
          
          <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm">
             {generatedBrand ? (
               <span className="font-medium text-slate-600">Showing logo for: {generatedBrand.name}</span>
             ) : (
               <span>Design your academic legacy</span>
             )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LogoGenerator;