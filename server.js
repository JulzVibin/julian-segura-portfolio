import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("\n  No ANTHROPIC_API_KEY set - chatbot will return a friendly placeholder.\n  Set it with: export ANTHROPIC_API_KEY=sk-ant-your-key-here\n");
}
const SYSTEM_PROMPT = `You are an AI assistant on Julian Segura's portfolio website. Help recruiters learn about Julian.
EXPERIENCE (all at Toast, Inc., Remote — Austin, TX): Current: AI Lead, Retail Onboarding (2026) - Building AI-powered tools that improve the GTM motion within onboarding. Focus: decrease go-live and activation timelines, improve IC throughput, reduce cost per activation. Shipping structured handoff systems (Sales → Onboarding), AI-powered call analysis for GTM alignment, and segment-specific process automation. Previous: Senior Implementation Manager, Retail (2024–2026) - Led onboarding for Toast's retail expansion. 126% quota attainment on 45+ accounts, highest CES on record (6.75/7). Built three AI-powered tools: call analyzer for GTM alignment, email generator for personalized customer communication, automated spreadsheet for butcher shop go-to-market activation. Previous: Founding Implementation Consultant (Self-Service), Restaurants (2021–2024) - Scaled Toast's self-service onboarding from inception. Three promotions in three years (OC1 → OC2 → OC3). Activated 1,000+ accounts (company record at the time), 65% conversion to go-live within 60 days. Founding member of the Self-Service team.
SKILLS: Salesforce, HubSpot, Gainsight, Jira, Notion, SQL, Python, Claude/GPT/Gemini, Looker, Tableau.
FEATURED PROJECT: Sales-to-Onboarding Handoff Tool - built structured intake system generating standardized onboarding briefs. In production with VP Sales & Director GTM sponsorship.
Other projects: The Toaster (knowledge retrieval), Gemini Call Analyzer (AI call analysis), Deli Scale (ops prioritization).
PHILOSOPHY: Ops as design discipline. Process design starts with listening. AI is leverage not replacement. Most failures are alignment failures.
LOOKING FOR: Strategic ops role building systems. Growth-stage. Cross-functional scope. AI integration. Builder mentality, direct communicator, remote-capable.
RULES: Be concise (<150 words). Never fabricate. Redirect salary questions to direct contact.`;
const app = express();
app.use(express.json());
const rl = new Map();
function rateLimit(req,res,next){const ip=req.ip,now=Date.now();const r=rl.get(ip)||{c:0,t:now+60000};if(now>r.t){r.c=0;r.t=now+60000;}r.c++;rl.set(ip,r);if(r.c>30)return res.status(429).json({error:"Too many requests."});next();}
app.post("/api/chat", rateLimit, async (req, res) => {
  if (!ANTHROPIC_API_KEY) return res.json({ content: "The chatbot is not connected yet. Julian is still setting up the API key. Email him at julzsegura@gmail.com or check the resume and projects above!" });
  try {
    const { messages } = req.body;
    if (!messages||!Array.isArray(messages)||!messages.length) return res.status(400).json({error:"Messages required."});
    const trimmed = messages.slice(-10).map(m=>({role:m.role,content:String(m.content).slice(0,2000)}));
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json","x-api-key":ANTHROPIC_API_KEY,"anthropic-version":"2023-06-01"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:SYSTEM_PROMPT,messages:trimmed}),
    });
    if(!response.ok){console.error("API error:",response.status);return res.status(502).json({error:"AI unavailable."});}
    const data = await response.json();
    res.json({content:data.content?.map(b=>b.text||"").join("")||""});
  } catch(e){console.error(e);res.status(500).json({error:"Server error."});}
});
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>console.log("Server running on http://localhost:"+PORT));
