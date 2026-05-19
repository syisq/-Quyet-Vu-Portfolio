/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Workflow, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Layout, 
  MessageSquare, 
  BarChart3, 
  Code2, 
  Layers, 
  Users,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
  FileCode,
  Zap,
  ArrowRight,
  GraduationCap,
  FileSearch,
  GitBranch
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { cn } from './lib/utils';

// --- Data ---
const PERFORMANCE_DATA = [
  { name: 'Rework Rate', before: 45, after: 15, unit: '%' },
  { name: 'Lead Time', before: 14, after: 9, unit: 'days' },
  { name: 'Sprint Stability', before: 60, after: 92, unit: '%' },
];

const CAREER_TIMELINE = [
  {
    period: 'July 2023 – July 2025',
    company: 'FPT Software Korea',
    role: 'Technical Project Coordinator / Delivery Lead',
    description: 'Governed delivery execution for LG.com Global (40+ sites). Managed a hybrid scope covering Technical BA, Product Ownership assistance, and QA Governance to ensure zero-defect releases.',
    achievements: [
      'Orchestrated end-to-end SDLC for 200+ global deployments',
      'Hybrid Scope: Requirements Refinement (BA) + Timeline Audit (PM) + UAT Validation (QA)',
      'Established the "Zero-Ambiguity" AC protocol, slashing rework by 30%'
    ]
  },
  {
    period: 'July 2025 – Present',
    company: 'Skill & Portfolio Growth',
    role: 'Ops Process Consultant',
    description: 'Optimizing digital service operations for startups while mastering SQL, GA4, and technical analytical workflows (e.g. OneDrop, Toss).',
    achievements: [
      'SQL / Google Analytics Certification',
      'Incident Escalation Playbook development',
      'Portfolio standardization for Bridge PM roles'
    ]
  },
  {
    period: '2016 – 2020',
    company: 'Freelance Technical Interpreter',
    role: 'Korean-Vietnamese Business Strategist',
    description: 'Facilitating cross-border technical discussions and negotiations. Specialized in bridging the gap for IT industry talent sourcing and technical infrastructure projects.',
    achievements: [
      'Technical negotiation lead',
      'Multi-industry market entry support',
      'Localization architecture bridge'
    ]
  }
];

const METHODOLOGY = [
  {
    title: 'Requirement Governance',
    desc: 'Acting as a Technical BA/PO bridge to transform abstract business goals into rigorous, developer-ready User Stories and AC.',
    icon: <FileSearch className="h-5 w-5 text-blue-500" />
  },
  {
    title: 'Lifecycle Orchestration',
    desc: 'Managing the "Golden Path" between HQ Stakeholders, UI/UX teams, and Offshore Devs to eliminate dependency bottlenecks.',
    icon: <Users className="h-5 w-5 text-purple-500" />
  },
  {
    title: 'Risk & Traceability',
    desc: 'Enforcing strict version control, decision logs, and QA protocols to maintain 99%+ release stability across global regions.',
    icon: <GitBranch className="h-5 w-5 text-emerald-500" />
  }
];

const EDUCATION = [
  {
    school: 'Seoul National University',
    degree: "Master of Science (MSc) in Business Administration",
    major: 'Minor: Marketing Management',
    period: 'Graduated Aug 2022'
  },
  {
    school: 'Vietnam National University (Hanoi)',
    degree: 'Bachelor of Arts (BA)',
    major: 'Korean Language',
    period: 'Graduated Aug 2017'
  },
  {
    school: 'Chung Ang University',
    degree: 'Exchange Program',
    major: 'Mass Communication',
    period: 'Mar 2015 – Dec 2015'
  }
];

const SKILLS_MATRIX = [
  { category: 'Languages', items: ['Korean (Fluent/TOPIK 6)', 'Vietnamese (Native)', 'English (Professional)', 'Dutch (Learning)'] },
  { category: 'Product & Project', items: ['Product Coordination', 'Backlog Prioritization', 'Roadmap Support', 'Stakeholder Management'] },
  { category: 'Technical Exposure', items: ['API Integration', 'System Behavior Analysis', 'Deployment Validation', 'SQL (Queries)'] }
];

const CASE_STUDIES = [
  {
    id: 'case-1',
    title: 'Cross-Page Component Portability & API Alignment',
    role: 'Technical Delivery Lead',
    description: 'Ensuring state consistency for the "Our Picks For You" recommendation unit across PBP and Basket.',
    challenge: 'High-level request for "Our Picks For You" on the Product Browsing Page (PBP) lacked technical specs for how the component should inherit context when a user transitions to the Basket. The PBP use case required Category-based filtering, while the Mini-Cart/Basket required SKU-association.',
    action: 'Collaborated with FE leads to abstract common logic into a shared "ProductCard" component with lazy-loading for image assets. Negotiated with the Data Team to expose a unified Recommendation API endpoint capable of handling both Category-level and Item-level payloads.',
    results: 'Enabled a non-interruptive cross-sell journey; Eliminated UI drift between PBP and Basket; Reduced developmental rework by 30% through early component abstraction.',
    tags: ['Micro-frontends', 'API Contract Design', 'UML'],
    color: 'blue'
  },
  {
    id: 'case-4',
    title: 'Checkout UX Consolidation & State Management',
    role: 'Lead Delivery Coordinator',
    description: 'Consolidating a multi-step checkout (Voucher -> Shipping -> Payment) into a high-conversion Single Page Checkout.',
    challenge: 'The legacy checkout flow was split across three separate pages, causing a 15% drop-off rate as users navigated between steps. Each step had its own validation logic and API synchronization, making error handling fragmented.',
    action: 'Orchestrated the transition to a unified "Accordion-style" Single Page Checkout. Led a 2-week preliminary discovery phase with UX Designers and Publishers (CMS/GCS) to finalize cross-locale content structures before FE development commenced. Managed the complex alignment between Payment Gateway providers and offshore dev teams.',
    results: 'Successfully launched the Single Page Checkout across UK/EU regions; Improved checkout completion rate by 8%; Reduced customer support tickets related to "Session Expired" during checkout.',
    tags: ['UX Transformation', 'State Orchestration', 'Stakeholder Alignment'],
    color: 'purple'
  },
  {
    id: 'case-2',
    title: 'Environment Staging & Deployment Orchestration',
    role: 'Global SPOC / Release Coordinator',
    description: 'Resolving critical branch conflicts and staging environment bottlenecks between internal offshore teams and 3rd-party vendors.',
    challenge: 'Urgent Revenue Ticket A (PDP Update) was blocked by Vendor Ticket B, which was already merged into the Staging branch but awaiting a delayed QA sign-off. Concurrent changes on the global styles file risked massive CSS regressions.',
    action: 'Performed a technical audit of the Git conflict. Orchestrated a "Staging Reset" and facilitated the cherry-picking of Ticket A into a clean hotfix branch. Negotiated a "Feature Toggle" strategy with Vendor B to decouple their deployment from our critical path.',
    results: 'Deployed high-revenue PDP update 2 days early; Resolved 14 potential CSS merge conflicts before production; Established a "Branch Locking" protocol for multi-vendor releases.',
    tags: ['CI/CD Workflow', 'Git Strategy', 'Conflict Resolution'],
    color: 'rose'
  },
  {
    id: 'case-3',
    title: 'Precision Hotfix Management & Locale Integrity',
    role: 'Crisis Management & Technical Lead',
    description: 'Managing high-severity production hotfixes regarding PBP logic failures and locale-leaks under extreme timezone constraints.',
    challenge: 'A critical "Locale Leak" was detected where the CA-FR (Canada-French) site was displaying text in another regional locale (CZ). Simultaneously, the "Buy Now" CTA on the PBP was intermittent for high-traffic categories.',
    action: 'Rapidly audited the CDN cache headers and localized i18n mapping files. Identified a corrupted deployment manifest. Documented a zero-ambiguity reproduction path and fix specs within 30 mins. Mobilized a key Senior Developer via established trust-based relationship to execute an out-of-hours patch during a local holiday.',
    results: 'Restored core conversion funnel (PBP buttons) and brand integrity; Restructured the "Emergency Localization Audit" process to prevent cross-locale string leaks.',
    tags: ['Incident Response', 'i18n / Localization', 'Operational Resilience'],
    color: 'emerald'
  }
];

const TICKETS = [
  {
    id: 'LGC-1024',
    title: 'Refactor: Shared "Our Picks For You" (PBP/Basket Context)',
    status: 'Done',
    priority: 'High',
    locale: 'Global (All Subsidiaries)',
    userStory: 'As a user, I want to see contextually relevant products on the PBP and see those same recommendations follow me to the Basket to maintain continuity.',
    ac: [
      'Implement context-aware custom hook for Recommendation fetching.',
      'UI must support dynamic "Add to Basket" buttons and "Pre-Order" states based on stock status.',
      'API call must pass `context_id` (Category ID for PBP, SKU list for Basket).',
      'Display star ratings and energy efficiency badges as per regional requirements.'
    ],
    brd: {
      asIs: 'PBP and Basket implementations use siloed components (Legacy-v1) with duplicated logic and separate API calls, leading to UI/Data drift of ±5% in price display.',
      toBe: 'Unified Recommendation Component (Theme-v2) injected into PBP Grid and Mini-Cart Drawer, sharing state via Redux/Context and using a conditional context_id payload.',
      mockup: 'LG-Signature-v2 Carousel: [Image Placeholder: Standardized 4-item grid with "Add to Basket" button, energy label (EU only), and star rating alignment across PBP/Basket]'
    },
    apiDoc: 'GET /api/v2/recommendations?type={pbp|basket}&id={catId|skuList}&limit=12',
    outcome: 'Bridge-level technical alignment prevented a 2-week refactor cycle by identifying the schema mismatch during the Discovery sprint.'
  },
  {
    id: 'LGC-CHKT-01',
    title: 'Consolidation: Single Page Checkout (Voucher-Address-Payment)',
    status: 'Done',
    priority: 'Critical',
    locale: 'Global - Priority EU',
    userStory: 'As a customer, I want to complete my voucher input, shipping details, and payment selection on a single page to reduce friction.',
    ac: [
      'Finalize high-fidelity design specs with UX team for all 15 EU locales.',
      'Coordinate with Publishers to pre-configure GCS placeholders for Voucher/Order summary blocks.',
      'Collapse Voucher, Shipping, and Payment into a single scrollable form with section-level validation.',
      'Trigger "Order Summary" recalculation (Tax/Shipping) immediately upon shipping address selection.',
      'Voucher input must support real-time validation without page refresh.'
    ],
    brd: {
      asIs: 'Steps split across [checkout/vouchers] -> [checkout/shipping] -> [checkout/payment]. High latent drop-off between steps.',
      toBe: 'Single route [/checkout/buy] with 3 distinct functional blocks. Shipping selection live-updates the Grand Total in the sticky sidebar.',
      mockup: 'Designer Mockup: New "Compact Checkout" with grouped Voucher entry, Address validation, and Payment selection.'
    },
    apiDoc: 'PATCH /v2/checkout/cart-summary (Partial updates for Voucher/Address)',
    outcome: 'Eliminated architectural bottlenecks by aligning Designers and Publishers 1 week prior to Sprint Start; ensured GCS parity before FE coding.'
  }
];

const STANDARDS = [
  {
    title: "Technical Discovery Gate",
    items: ["API Contract verification (Swagger/OAS)", "Data Schema mapping", "Performance budget (TTI < 2s)", "Environment parity check"],
    icon: <Search className="h-5 w-5 text-blue-500" />
  },
  {
    title: "Git & Deployment Protocol",
    items: ["Feature branch isolation", "Mandatory Peer Code Review", "Regression suite automation", "Hotfix/Reverting policy"],
    icon: <Code2 className="h-5 w-5 text-rose-500" />
  },
  {
    title: "Global Execution Framework",
    items: ["BDD/Gherkin specifications", "Multi-lingual technical glossary", "Cross-regional sync (KR/VN/EU)", "Single Source of Truth (SSoT)"],
    icon: <Workflow className="h-5 w-5 text-emerald-500" />
  }
];

// --- Components ---

const StandardCard = ({ standard }: { standard: typeof STANDARDS[0], key?: React.Key }) => (
  <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">
        {standard.icon}
      </div>
      <h5 className="font-bold font-display text-slate-900">{standard.title}</h5>
    </div>
    <ul className="space-y-2">
      {standard.items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2 text-xs text-slate-500">
          <ChevronRight className="h-3 w-3 text-slate-300" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-lg">
          <Globe className="h-5 w-5" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">Quyet Vu Portfolio</span>
      </div>
      <div className="hidden space-x-8 text-sm font-medium text-slate-600 md:flex">
        <a href="#overview" className="hover:text-slate-900 transition-colors">Overview</a>
        <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
        <a href="#cases" className="hover:text-slate-900 transition-colors">Cases</a>
        <a href="#process" className="hover:text-slate-900 transition-colors">Process</a>
      </div>
    </div>
  </nav>
);

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
    {subtitle && <p className="mt-4 text-lg text-slate-600 max-w-2xl">{subtitle}</p>}
  </div>
);

const JiraTicket = ({ ticket }: { ticket: typeof TICKETS[0], key?: React.Key }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'brd' | 'api'>('details');

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-600">{ticket.id}</span>
            <span className={cn(
              "jira-tag",
              ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' : 
              ticket.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
            )}>
              {ticket.priority}
            </span>
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {ticket.locale}
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            {ticket.status}
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-900 font-display">{ticket.title}</h4>
      </div>

      <div className="flex border-b border-slate-200">
        {(['details', 'brd', 'api'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === tab 
                ? "border-b-2 border-blue-600 text-blue-600 bg-white" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab === 'brd' ? 'BRD / Logic' : tab}
          </button>
        ))}
      </div>
      
      <div className="p-6 h-[440px] overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">User Story</label>
                <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-200 pl-3">
                  "{ticket.userStory}"
                </p>
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Acceptance Criteria</label>
                <ul className="space-y-2">
                  {ticket.ac.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'brd' && (
            <motion.div
              key="brd"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
                  <span className="text-[10px] font-bold text-rose-600 uppercase block mb-1">AS-IS</span>
                  <p className="text-xs text-rose-800 leading-relaxed">{ticket.brd.asIs}</p>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">TO-BE</span>
                  <p className="text-xs text-emerald-800 leading-relaxed">{ticket.brd.toBe}</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Mockup / Visual Reference</span>
                  <p className="text-xs text-blue-800 leading-relaxed">{ticket.brd.mockup}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-lg bg-slate-900 font-mono text-xs text-blue-400 overflow-x-auto"
            >
              <div className="flex items-center gap-2 mb-4 text-slate-500">
                <FileCode className="h-4 w-4" />
                <span>Technical Specifications</span>
              </div>
              <pre>{ticket.apiDoc}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center gap-2 text-emerald-700">
          <Zap className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">TDM Impact Log</span>
        </div>
        <p className="mt-1 text-xs text-slate-600">{ticket.outcome}</p>
      </div>
    </div>
  );
};

const WorkflowDiagram = () => (
  <div className="relative p-8 rounded-2xl bg-slate-900 text-white overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Workflow className="h-32 w-32" />
    </div>
    
    <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
      <Layers className="h-5 w-5 text-blue-400" />
      Offshore Delivery Pipeline (The Bridge Model)
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative z-10">
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
        <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
        <p className="text-xs font-bold font-display uppercase tracking-widest text-slate-400">HQ Stakeholder</p>
        <p className="text-sm mt-1">PM/PO/QA (Korea)</p>
      </div>
      
      <div className="flex justify-center text-slate-700">
        <ChevronRight className="h-6 w-6" />
      </div>

      <div className="p-5 rounded-lg bg-blue-600 border border-blue-400 text-center shadow-xl shadow-blue-900/20">
        <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-white" />
        <p className="text-xs font-bold font-display uppercase tracking-widest text-blue-100 italic">Centralized Bridge</p>
        <p className="text-sm font-bold mt-1">Bridge PM (Vu Thi Quyet)</p>
        <ul className="text-[10px] mt-2 text-blue-100 text-left list-disc list-inside">
          <li>Requirement Structuring</li>
          <li>Conflict Negotiation</li>
          <li>Risk Mitigations</li>
        </ul>
      </div>

      <div className="flex justify-center text-slate-700">
        <ChevronRight className="h-6 w-6" />
      </div>

      <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
        <Code2 className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
        <p className="text-xs font-bold font-display uppercase tracking-widest text-slate-400">Offshore Dev</p>
        <p className="text-sm mt-1">Vietnam Team</p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white" id="overview">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 mb-6 uppercase tracking-widest">
                <ShieldCheck className="h-3 w-3" />
                Single Point of Contact (SPOC)
              </div>
              <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
                Vu Thi Quyet (우수연)<br/>
                <span className="text-blue-600 text-3xl sm:text-5xl">Global Delivery Architect & Bridge PM</span>
              </h1>
              <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-3xl">
                Specialized in **Cross-Functional Bridge Management** for enterprise e-commerce. 
                Ownership of the full delivery lifecycle—bridging complex Korean HQ requirements with high-velocity Vietnam development execution.
              </p>
              
              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Education</p>
                  <p className="font-bold flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Seoul_National_University_logo.svg" className="h-5" />
                    SNU MSc (Marketing)
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Languages</p>
                  <p className="font-bold">KR (TOPIK 6) · VN (Native) · EN (IH)</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Key Exp</p>
                  <p className="font-bold">Global LG.com (2yr)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="bg-slate-50 py-24" id="experience">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Proven track record in managing critical delivery cycles for high-traffic global platforms.">
            Career Journey
          </SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CAREER_TIMELINE.map((exp, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 font-mono text-[40px] font-bold text-slate-50 opacity-20 group-hover:opacity-40 transition-opacity">0{i+1}</div>
                <p className="text-xs font-bold text-blue-600 mb-4">{exp.period}</p>
                <h4 className="text-xl font-bold font-display mb-1">{exp.company}</h4>
                <p className="text-sm font-semibold text-slate-500 mb-4">{exp.role}</p>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{exp.description}</p>
                <div className="space-y-2">
                  {exp.achievements.map((ach, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Zap className="h-3 w-3 text-emerald-500" />
                      {ach}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-slate-200">
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Education</h5>
              <div className="space-y-6">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-none mb-1">{edu.school}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{edu.degree} · {edu.major}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {SKILLS_MATRIX.map((skill, i) => (
                <div key={i} className={i === 2 ? "col-span-2" : ""}>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{skill.category}</h5>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <span key={j} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-white py-24" id="cases">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Deep dives into complex delivery scenarios where I acted as the strategic bridge.">
            Critical Case Studies
          </SectionHeading>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 space-y-4">
              {CASE_STUDIES.map((study, idx) => (
                <button
                  key={study.id}
                  onClick={() => setActiveCase(idx)}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl border transition-all duration-300",
                    activeCase === idx 
                      ? "border-blue-600 bg-blue-50 shadow-sm" 
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  )}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Case 0{idx + 1}</p>
                  <h4 className={cn("font-bold font-display", activeCase === idx ? "text-blue-700" : "text-slate-900")}>
                    {study.title}
                  </h4>
                </button>
              ))}
            </div>

            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {CASE_STUDIES[activeCase].tags.map((tag, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-3xl font-bold font-display text-slate-900 mb-6 leading-tight">
                      {CASE_STUDIES[activeCase].description}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-3">The Challenge</h5>
                        <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-rose-200 pl-4">
                          {CASE_STUDIES[activeCase].challenge}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3">TDM Execution</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {CASE_STUDIES[activeCase].action}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-10 p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Outcome
                      </div>
                      <p className="text-emerald-900 text-sm font-medium">{CASE_STUDIES[activeCase].results}</p>
                    </div>
                    <p className="mt-4 text-[10px] text-slate-400 italic">
                      * Methodology Demonstration: Case study represents a reconstructed abstraction of delivery workflows to protect client confidentiality.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Workflow */}
      <section className="bg-slate-50 py-24" id="process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Standardizing the delivery lifecycle to eliminate ambiguity and optimize throughput.">
            Bridge Operations & Standardization
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {METHODOLOGY.map((pillar, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl w-fit mb-4">
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{pillar.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="h-[350px] w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 block">Key Impact Metrics</label>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="after" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                    {PERFORMANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : index === 1 ? '#3b82f6' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <WorkflowDiagram />
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                 <p className="text-xs text-slate-400 italic font-mono">"My goal is to create a Zero-Ambiguity environment where every requirement is execution-ready the moment it hits the developer."</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STANDARDS.map((std, i) => (
                  <StandardCard key={i} standard={std} />
                ))}
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Requirement Articulation Samples</h4>
              {TICKETS.map(ticket => (
                <JiraTicket key={ticket.id} ticket={ticket} />
              ))}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-[10px] text-slate-500 italic leading-relaxed">
                <span className="font-bold block mb-1 uppercase tracking-tighter">Confidentiality Guard:</span>
                Reconstructed functional abstractions demonstrating TDM/BA methodology. No proprietary site assets or real-time data are exposed.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-slate-900 text-white py-24" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-8">Ready to Scale Your Global Delivery?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
             F-2 Residing Visa holder (unrestricted employment).<br/>
             Available for regional travel (KR/VN/Global).
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all cursor-pointer">
              ursyisq@gmail.com
            </div>
            <div className="px-8 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all cursor-pointer">
               Phone upon request
            </div>
            <a href="https://linkedin.com/in/quyet-vu-thi" target="_blank" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              LinkedIn Profile
            </a>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="font-display font-bold">Vu Thi Quyet · Bridge TDM</span>
            </div>
            <p className="text-sm text-slate-500">© 2026 Structured Delivery Portfolio</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
