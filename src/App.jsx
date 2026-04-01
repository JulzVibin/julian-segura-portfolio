import { useState, useRef, useEffect, useCallback } from "react";

const Icons = {
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevronDown: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  MessageCircle: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Linkedin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  ArrowDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  Trash: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

function SectionHeading({ children }) {
  return (
    <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(24px,3vw,32px)", fontWeight:600, textTransform:"uppercase", position:"relative", display:"inline-block", marginBottom:6 }}>
      {children}
    </h2>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);
  const [h, setH] = useState(defaultOpen ? "auto" : "0px");
  useEffect(() => {
    if (open && ref.current) { setH(ref.current.scrollHeight+"px"); const t = setTimeout(() => setH("auto"), 350); return () => clearTimeout(t); }
    else { if (ref.current) setH(ref.current.scrollHeight+"px"); requestAnimationFrame(() => setH("0px")); }
  }, [open]);
  return (
    <div style={{ borderBottom:"1px solid #eee" }}>
      <button onClick={() => setOpen(!open)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 0", background:"none", border:"none", color:"#111", cursor:"pointer", fontFamily:"var(--f-body)", fontSize:15, fontWeight:500, textAlign:"left" }}>
        {title}
        <span style={{ transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.3s", opacity:0.3 }}><Icons.ChevronDown /></span>
      </button>
      <div ref={ref} style={{ height:h, overflow:"hidden", transition:"height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ paddingBottom:20, color:"#555", fontSize:14, lineHeight:1.7 }}>{children}</div>
      </div>
    </div>
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { const t = setTimeout(() => setShowBubble(true), 2000); return () => clearTimeout(t); }, []);
  const prompts = ["What has Julian built?","How does he think about AI?","What's he looking for next?","Tell me about the Handoff Tool"];
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);
  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    const next = [...msgs, { role:"user", content:text.trim() }];
    setMsgs(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ messages:next.slice(-10).map(m=>({role:m.role,content:m.content})) }) });
      const data = await res.json();
      setMsgs(prev => [...prev, { role:"assistant", content:data.content||"Something went wrong. Contact Julian directly." }]);
    } catch { setMsgs(prev => [...prev, { role:"assistant", content:"Something went wrong. Reach out at julzsegura@gmail.com." }]); }
    finally { setLoading(false); }
  }, [msgs, loading]);

  const openChat = () => { setIsOpen(true); setBubbleDismissed(true); };

  return (
    <>
      <style>{`
        @keyframes chatPulse{0%{transform:scale(1);opacity:0.5}70%{transform:scale(1.8);opacity:0}100%{transform:scale(1.8);opacity:0}}
        @keyframes bubbleIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      {showBubble && !bubbleDismissed && !isOpen && (
        <div onClick={openChat} style={{ position:"fixed",bottom:92,right:28,zIndex:1000,background:"#fff",border:"1px solid #eee",borderRadius:10,padding:"8px 14px",fontSize:13,fontFamily:"var(--f-display)",color:"#333",fontWeight:500,boxShadow:"0 2px 12px rgba(0,0,0,0.08)",cursor:"pointer",animation:"bubbleIn 0.4s ease forwards" }}>
          Questions about my experience? Ask me here!
          <div style={{ position:"absolute",bottom:-6,right:20,width:12,height:12,background:"#fff",border:"1px solid #eee",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)" }} />
        </div>
      )}
      <div style={{ position:"fixed",bottom:28,right:28,zIndex:1000 }}>
        {!isOpen && <span style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",border:"2px solid var(--accent)",animation:"chatPulse 3s ease-in-out infinite",pointerEvents:"none" }} />}
        <button onClick={() => { if (isOpen) setIsOpen(false); else openChat(); }} aria-label={isOpen?"Close":"Chat"} style={{ width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg, var(--accent), #34d399)",border:"none",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(5,150,105,0.25)",transition:"transform 0.2s",position:"relative" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          {isOpen ? <Icons.X /> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>}
        </button>
      </div>
      {isOpen && (
        <div style={{ position:"fixed",bottom:96,right:28,zIndex:999,width:"min(400px,calc(100vw - 32px))",height:"min(520px,calc(100vh - 140px))",background:"#fff",border:"1px solid #e5e5e5",borderRadius:14,display:"flex",flexDirection:"column",boxShadow:"0 16px 48px rgba(0,0,0,0.1)",animation:"slideUp 0.25s cubic-bezier(0.16,1,0.3,1)",overflow:"hidden" }}>
          <div style={{ padding:"18px 20px 14px",borderBottom:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
            <div>
              <div style={{ fontFamily:"var(--f-display)",fontSize:18,color:"#111",marginBottom:2 }}>Ask me anything</div>
              <div style={{ fontSize:12,color:"#aaa",fontFamily:"var(--f-body)" }}>Experience, projects, what I'm looking for.</div>
            </div>
            {msgs.length > 0 && <button onClick={()=>setMsgs([])} style={{ background:"none",border:"none",color:"#ccc",cursor:"pointer",padding:4 }} onMouseEnter={e=>e.currentTarget.style.color="#888"} onMouseLeave={e=>e.currentTarget.style.color="#ccc"}><Icons.Trash /></button>}
          </div>
          <div style={{ flex:1,overflowY:"auto",padding:"14px 18px",display:"flex",flexDirection:"column",gap:10 }}>
            {msgs.length===0 && <div style={{ display:"flex",flexDirection:"column",gap:6,marginTop:4 }}>
              {prompts.map((p,i) => <button key={i} onClick={()=>send(p)} style={{ background:"#fafafa",border:"1px solid #eee",borderRadius:8,padding:"9px 13px",color:"#333",cursor:"pointer",fontSize:13,textAlign:"left",fontFamily:"var(--f-body)",transition:"all 0.15s",lineHeight:1.4 }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(5,150,105,0.05)";e.currentTarget.style.borderColor="rgba(5,150,105,0.2)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#fafafa";e.currentTarget.style.borderColor="#eee";}}>{p}</button>)}
            </div>}
            {msgs.map((m,i) => <div key={i} style={{ alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"82%",padding:"9px 13px",borderRadius:m.role==="user"?"12px 12px 3px 12px":"12px 12px 12px 3px",background:m.role==="user"?"var(--accent)":"#f5f5f5",color:m.role==="user"?"#fff":"#222",fontSize:13.5,lineHeight:1.55,fontFamily:"var(--f-body)",whiteSpace:"pre-wrap" }}>{m.content}</div>)}
            {loading && <div style={{ alignSelf:"flex-start",padding:"9px 13px",borderRadius:"12px 12px 12px 3px",background:"#f5f5f5",display:"flex",gap:5,alignItems:"center" }}>{[0,1,2].map(i=><span key={i} style={{ width:6,height:6,borderRadius:"50%",background:"#bbb",animation:`pulse 1.2s ease-in-out ${i*0.15}s infinite` }} />)}</div>}
            <div ref={endRef} />
          </div>
          <div style={{ padding:"10px 14px 14px",borderTop:"1px solid #f0f0f0",display:"flex",gap:8 }}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send(input)} placeholder="Ask anything..." style={{ flex:1,background:"#fafafa",border:"1px solid #eee",borderRadius:8,padding:"9px 13px",color:"#111",fontSize:13.5,fontFamily:"var(--f-body)",outline:"none",transition:"border-color 0.2s" }}
              onFocus={e=>e.target.style.borderColor="rgba(5,150,105,0.4)"} onBlur={e=>e.target.style.borderColor="#eee"} />
            <button onClick={()=>send(input)} disabled={!input.trim()||loading} style={{ background:input.trim()?"var(--accent)":"#f5f5f5",border:"none",borderRadius:8,padding:"0 13px",color:input.trim()?"#fff":"#ccc",cursor:input.trim()?"pointer":"default",transition:"all 0.15s",display:"flex",alignItems:"center" }}><Icons.Send /></button>
          </div>
        </div>
      )}
    </>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function App() {
  const [mobileNav, setMobileNav] = useState(false);
  const [resumeTab, setResumeTab] = useState(0);
  const [philTab, setPhilTab] = useState(0);
  const philItems = [
    {l:"AI",t:"When you have a hammer, everything looks like a nail — that's exactly the trap I avoid. You can build AI solutions or you can use AI to build solutions. The discernment to know when both of those concepts should exist together or in parallel are what separates impactful implementation from hype. LLMs themselves are incredible, but when combined with systems, they become transformative."},
    {l:"Process Design",t:"I start by asking: how do my internal processes actually align with my GTM initiatives? The obvious bottlenecks are easy to spot. The real insight comes from looking at handoff points—where information gets lost, where work duplicates, where manual processes should be systematized. That's where I find leverage. Process design isn't about eliminating friction everywhere. It's about identifying which friction actually matters to your growth."},
    {l:"We Are All Builders",t:"With agentic coding and LLMs as thinking partners, the technical barrier to building is gone. You can bring ideas to life in days, not months. But this doesn't scare me—it excites me. The real bottleneck isn't technical anymore. It's identifying the densest areas of opportunity, finding product-market fit, and driving adoption. The builders who will win are the ones who solve real problems people actually need, not the ones who build the fanciest tech. That's where differentiation lives. And that's where truly powerful solutions will emerge."},
  ];
  const [projectTab, setProjectTab] = useState(0);
  const projectItems = [
    { tab:"Sales Handoff Tool", title:"Sales-to-Onboarding Handoff Tool", desc:"Sales-to-implementation handoffs lose critical context everywhere. I built a voice-first AI intake system that interviews reps and generates structured briefs — giving implementation teams the full picture before their first call.", loom:"https://www.loom.com/embed/fa76ee30f1f745f68a55964d10ff1952" },
    { tab:"Data Migration Suite", title:"Data Migration Suite", desc:"Data migration was our biggest onboarding bottleneck. I built a platform that lets non-technical consultants migrate client data in minutes instead of hours—uploading raw exports, reviewing AI recommendations, exporting clean files. The result: faster go-lives, happier clients, better metrics. Showed that tooling can eliminate friction at scale." },
    { tab:"Spreadsheet Automation", title:"Spreadsheet Automation", desc:"New market segment, new problem: manual software configuration was taking 45 minutes per account and creating a cascade of delays. I built a tool that automated it to under 10 minutes with higher accuracy. Result: hardware shipped faster, installs moved quicker, go-lives improved, and onboarding could finally keep pace with GTM demand." },
  ];
  const roles = [
    { tab:"AI Lead, Onboarding", title:"AI Lead · Retail Onboarding", sub:"Toast Inc. - Remote · 2026", desc:"Building AI-powered tools that improve the GTM motion within onboarding. Focus: decrease go-live and activation timelines and improve IC throughput. Currently shipping structured handoff systems (Sales → Onboarding), AI-powered call analysis for GTM alignment, and segment-specific process automation. Obsessed with measurable efficiency gains and systems that scale." },
    { tab:"Senior Implementation Manager", title:"Senior Implementation Manager · Retail", sub:"Toast Inc. - Remote · 2024–2026", desc:"Led onboarding for Toast's expansion into retail — a fundamentally different vertical from restaurants. Retail customers demanded higher operational rigor: less mature product, more implementation complexity, quality and value realization were non-negotiable. Delivered exceptional outcomes: 126% quota attainment on 45+ accounts, highest CES on record (6.75/7). Recognized that traditional playbooks weren't enough. Built three AI-powered tools to solve retail-specific friction: call analyzer for GTM alignment, email generator for personalized customer communication, automated spreadsheet for butcher shop go-to-market activation. Proved that tooling, not just process, was the answer to scaling." },
    { tab:"Founding Implementation Consultant", title:"Founding Implementation Consultant (Self-Service) · Restaurants", sub:"Toast Inc. - Remote · 2021–2024", desc:"Scaled Toast's self-service onboarding operation from inception. Established foundational playbooks, workflows, and quality standards that became the operating manual for the team. Three promotions in three years (OC1 → OC2 → OC3) driven by consistent delivery and process leadership. Activated 1,000+ accounts (company record at the time), achieved 65% conversion to go-live within 60 days — significantly above industry baseline. Founding member of the Self-Service team; the frameworks built here are still the operating standard." },
  ];
  const [projRef, projVis] = useReveal();
  const [philRef, philVis] = useReveal();
  const [contactRef, contactVis] = useReveal();
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMobileNav(false); };
  const r = (vis, d=0) => ({ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:`opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${d}s` });

  return (
    <div style={{ background:"#fff", color:"#111", minHeight:"100vh", fontFamily:"var(--f-body)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        :root { --f-display:'Oswald',sans-serif; --f-body:'Roboto',sans-serif; --f-mono:'JetBrains Mono',monospace; --accent:#059669; --accent-light:rgba(5,150,105,0.08); }
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        ::selection{background:rgba(5,150,105,0.15);color:#111}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .nav-link{background:none;border:none;color:#999;cursor:pointer;font-family:var(--f-body);font-size:13px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;padding:8px 0;transition:color 0.2s}
        .nav-link:hover{color:var(--accent)}
        a{color:#111;text-decoration:none} input::placeholder{color:#bbb}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:3px}
        @media(max-width:768px){.desktop-nav{display:none!important}.mobile-toggle{display:flex!important}.nav-socials{display:none!important}.experience-tabs,.tol-tabs{flex-direction:column!important;background:none!important;border-radius:0!important;padding:0!important;gap:2px!important}.experience-tabs button,.tol-tabs button{width:100%!important;text-align:left!important;padding:12px 16px!important;border-radius:0 6px 6px 0!important;border-bottom:none!important;box-shadow:none!important}.experience-tabs button[data-active="true"],.tol-tabs button[data-active="true"]{border-left:3px solid var(--accent)!important;background:var(--accent-light)!important;color:var(--accent)!important}.experience-tabs button[data-active="false"],.tol-tabs button[data-active="false"]{border-left:3px solid transparent!important;color:#999!important;background:none!important}.project-tabs{flex-direction:column!important;background:none!important;border-radius:0!important;padding:0!important;gap:2px!important}.project-tabs button{width:100%!important;text-align:left!important;padding:12px 16px!important;border-radius:0 6px 6px 0!important;box-shadow:none!important}.project-tabs button[data-active="true"]{border-left:3px solid var(--accent)!important;background:var(--accent-light)!important;color:var(--accent)!important}.project-tabs button[data-active="false"]{border-left:3px solid transparent!important;color:#999!important;background:none!important}}
        @media(min-width:769px){.mobile-toggle{display:none!important}.mobile-nav-menu{display:none!important}}
      `}</style>

      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 clamp(24px,6vw,80px)",background:"rgba(255,255,255,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid #f0f0f0" }}>
        <div style={{ maxWidth:1000,margin:"0 auto",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ fontFamily:"var(--f-display)",fontSize:26,cursor:"pointer",fontWeight:700,textTransform:"uppercase" }} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>Julian Segura</div>
          <div className="desktop-nav" style={{ display:"flex",gap:28,alignItems:"center" }}>
            {[{id:"resume",label:"experience"},{id:"projects",label:"projects"},{id:"philosophy",label:"thinking out loud"},{id:"contact",label:"contact"}].map(s=><button key={s.id} className="nav-link" onClick={()=>scrollTo(s.id)}>{s.label}</button>)}
          </div>
          <button className="mobile-toggle" onClick={()=>setMobileNav(!mobileNav)} style={{ background:"none",border:"none",color:"#111",cursor:"pointer",display:"none" }}>{mobileNav?<Icons.X />:<Icons.Menu />}</button>
        </div>
        {mobileNav && <div className="mobile-nav-menu" style={{ padding:"4px 0 20px",display:"flex",flexDirection:"column",gap:2 }}>
          {[{id:"resume",label:"experience"},{id:"projects",label:"projects"},{id:"philosophy",label:"thinking out loud"},{id:"contact",label:"contact"}].map(s=><button key={s.id} className="nav-link" onClick={()=>scrollTo(s.id)} style={{padding:"12px 0",fontSize:15}}>{s.label}</button>)}
        </div>}
      </nav>

      <section id="resume" style={{ minHeight:"100vh",padding:"120px clamp(24px,6vw,80px) 100px" }}>
        <div style={{ textAlign:"center",marginBottom:40 }}>
          <h1 style={{ fontFamily:"var(--f-display)",fontSize:"clamp(36px,5vw,52px)",fontWeight:700,lineHeight:1.0,letterSpacing:"-0.02em",textTransform:"uppercase",marginBottom:0 }}>
            Hi! I'm Julian. 👋🏽
          </h1>
          <p style={{ fontSize:17,lineHeight:1.65,color:"#555",maxWidth:600,margin:"40px auto 0" }}>I solve cross-functional problems through operational strategy and smart process design. High-performer across GTM and sales ops—I identify friction, use AI where it makes sense, and build processes that let teams focus on what actually drives results.</p>
        </div>
        <div style={{ maxWidth:800,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:24 }}>
            <h2 style={{ fontFamily:"var(--f-display)",fontSize:"clamp(24px,3vw,32px)",fontWeight:600,textTransform:"uppercase",position:"relative",display:"inline-block",marginBottom:0 }}>
              Experience
            </h2>
          </div>
          <div style={{ display:"flex",justifyContent:"center" }}>
            <div className="experience-tabs" style={{ display:"inline-flex",gap:8,background:"#f8f8f8",borderRadius:100,padding:4 }}>
              {roles.map((role,i) => (
                <button key={i} data-active={resumeTab===i?"true":"false"} onClick={() => setResumeTab(i)} style={{ padding:"10px 24px",fontFamily:"var(--f-body)",fontSize:13,fontWeight:resumeTab===i?600:400,color:resumeTab===i?"#fff":"#999",background:resumeTab===i?"var(--accent)":"transparent",border:"none",borderRadius:100,cursor:"pointer",transition:"all 0.2s",boxShadow:resumeTab===i?"0 2px 8px rgba(5,150,105,0.2)":"none" }}
                  onMouseEnter={e=>{if(resumeTab!==i)e.currentTarget.style.background="#f0f0f0";}} onMouseLeave={e=>{if(resumeTab!==i)e.currentTarget.style.background="transparent";}}>{role.tab}</button>
              ))}
            </div>
          </div>
          <div style={{ paddingTop:24 }}>
            {roles.map((role,i) => (
              <div key={i} style={{ display:resumeTab===i?"block":"none",animation:resumeTab===i?"fadeIn 0.3s ease":"none" }}>
                <div style={{ fontFamily:"var(--f-display)",fontWeight:600,fontSize:16,marginBottom:6 }}>{role.title}</div>
                <div style={{ fontSize:12,color:"#bbb",fontFamily:"var(--f-mono)",marginBottom:12 }}>{role.sub}</div>
                <p style={{ color:"#555",fontSize:14,lineHeight:1.7 }}>{role.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:12 }}>
            <a href="/julian-segura-gtm-program-manager.pdf" download style={{ display:"inline-flex",alignItems:"center",gap:6,color:"#999",fontSize:13,fontWeight:500,transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"} onMouseLeave={e=>e.currentTarget.style.color="#999"}><Icons.Download /> Download Resume</a>
          </div>
        </div>
      </section>

      <section id="projects" ref={projRef} style={{ padding:"60px clamp(24px,6vw,80px)",borderTop:"1px solid #eee",...r(projVis) }}>
        <div style={{ maxWidth:640,margin:"0 auto" }}>
          <div style={{ marginBottom:32 }}>
            <SectionHeading>Projects</SectionHeading>
            <p style={{ color:"#999",fontSize:14,marginTop:4 }}>A sample of my three most high impact projects over the last 2 months.</p>
          </div>
          <div style={{ display:"flex",justifyContent:"center" }}>
            <div className="project-tabs" style={{ display:"inline-flex",gap:8,background:"#f8f8f8",borderRadius:100,padding:4 }}>
              {projectItems.map((p,i) => (
                <button key={i} data-active={projectTab===i?"true":"false"} onClick={()=>setProjectTab(i)} style={{ padding:"10px 24px",fontFamily:"var(--f-body)",fontSize:13,fontWeight:projectTab===i?600:400,color:projectTab===i?"#fff":"#999",background:projectTab===i?"var(--accent)":"transparent",border:"none",borderRadius:100,cursor:"pointer",transition:"all 0.2s",boxShadow:projectTab===i?"0 2px 8px rgba(5,150,105,0.2)":"none" }}
                  onMouseEnter={e=>{if(projectTab!==i)e.currentTarget.style.background="#f0f0f0";}} onMouseLeave={e=>{if(projectTab!==i)e.currentTarget.style.background="transparent";}}>{p.tab}</button>
              ))}
            </div>
          </div>
          {projectItems.map((p,i) => (
            <div key={i} style={{ display:projectTab===i?"block":"none",animation:projectTab===i?"fadeIn 0.3s ease":"none" }}>
              <div style={{ border:"1px solid #eee",borderRadius:12,padding:32,marginTop:28 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:16 }}>
                  <h3 style={{ fontFamily:"var(--f-display)",fontSize:20,fontWeight:600 }}>{p.title}</h3>
                  {p.badge && <span style={{ background:"var(--accent-light)",color:"var(--accent)",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",fontFamily:"var(--f-mono)" }}>{p.badge}</span>}
                </div>
                <p style={{ color:"#555",fontSize:14,lineHeight:1.7 }}>{p.desc}</p>
                {p.loom && <div style={{ background:"#f5f5f5",borderRadius:10,padding:4,margin:"16px 0",overflow:"hidden" }}><iframe src={p.loom} style={{ width:"100%",aspectRatio:"16/9",border:"none",borderRadius:8,display:"block" }} allowFullScreen /></div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="philosophy" ref={philRef} style={{ padding:"60px clamp(24px,6vw,80px)",borderTop:"1px solid #eee",...r(philVis) }}>
        <div style={{ maxWidth:640,margin:"0 auto" }}>
          <div style={{ marginBottom:32 }}>
            <SectionHeading>Thinking Out Loud</SectionHeading>
            <p style={{ color:"#999",fontSize:14,marginTop:4 }}>Here is what is top of mind for me right now.</p>
          </div>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}>
            <div className="tol-tabs" style={{ display:"inline-flex",gap:8,background:"#f8f8f8",borderRadius:100,padding:4,flexWrap:"wrap" }}>
              {philItems.map((item,i) => (
                <button key={i} data-active={philTab===i?"true":"false"} onClick={()=>setPhilTab(i)} style={{ padding:"10px 24px",fontFamily:"var(--f-body)",fontSize:13,fontWeight:philTab===i?600:400,color:philTab===i?"#fff":"#999",background:philTab===i?"var(--accent)":"transparent",border:"none",borderRadius:100,cursor:"pointer",transition:"all 0.2s",boxShadow:philTab===i?"0 2px 8px rgba(5,150,105,0.2)":"none" }}
                  onMouseEnter={e=>{if(philTab!==i)e.currentTarget.style.background="#f0f0f0";}} onMouseLeave={e=>{if(philTab!==i)e.currentTarget.style.background="transparent";}}>{item.l}</button>
              ))}
            </div>
          </div>
          <div style={{ paddingTop:28 }}>
            {philItems.map((item,i) => (
              <div key={i} style={{ display:philTab===i?"block":"none",animation:philTab===i?"fadeIn 0.3s ease":"none" }}>
                <p style={{ fontSize:15,lineHeight:1.7,color:"#444" }}>{item.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" ref={contactRef} style={{ padding:"60px clamp(24px,6vw,80px)",borderTop:"1px solid #eee",...r(contactVis) }}>
        <div style={{ maxWidth:640,margin:"0 auto",textAlign:"center" }}>
          <h2 style={{ fontFamily:"var(--f-display)",fontSize:"clamp(24px,3vw,32px)",fontWeight:600,textTransform:"uppercase",marginBottom:24,position:"relative",display:"inline-block" }}>
            Let's connect!
          </h2>
          <div style={{ textAlign:"center" }}>
            <a href="https://linkedin.com/in/juliansegura" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--accent)",color:"#fff",padding:"12px 24px",borderRadius:6,fontSize:14,fontWeight:500,transition:"all 0.2s",boxShadow:"0 2px 12px rgba(5,150,105,0.2)" }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(5,150,105,0.35)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 12px rgba(5,150,105,0.2)"}><Icons.Linkedin /> LinkedIn</a>
          </div>
        </div>
        <div style={{ maxWidth:640,margin:"80px auto 0",paddingTop:24,borderTop:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ fontSize:12,color:"#ccc" }}>© {new Date().getFullYear()} Julian Segura</div>
          <div style={{ fontSize:12,color:"#ccc" }}>Built with Claude</div>
        </div>
      </section>


      {/* <Chatbot /> */}
    </div>
  );
}
