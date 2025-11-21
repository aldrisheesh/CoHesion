import { motion } from 'motion/react';
import { AppContextType } from '../../App';
import { CheckCircle2, ExternalLink, Settings, Key } from 'lucide-react';
import { useState, ReactNode } from 'react';

interface IntegrationsScreenProps {
  context: AppContextType;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  logo: ReactNode;
  features: string[];
}

const integrationLogos: Record<string, ReactNode> = {
  slack: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <rect x="5" y="26" width="12" height="12" rx="6" fill="#36C5F0" />
      <rect x="17" y="26" width="12" height="33" rx="6" fill="#36C5F0" />
      <rect x="26" y="5" width="12" height="12" rx="6" fill="#E01E5A" />
      <rect x="26" y="17" width="33" height="12" rx="6" fill="#E01E5A" />
      <rect x="26" y="47" width="12" height="12" rx="6" fill="#2EB67D" />
      <rect x="26" y="35" width="33" height="12" rx="6" fill="#2EB67D" />
      <rect x="47" y="26" width="12" height="12" rx="6" fill="#ECB22E" />
      <rect x="35" y="26" width="12" height="33" rx="6" fill="#ECB22E" />
    </svg>
  ),
  teams: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <rect x="6" y="18" width="20" height="28" rx="4" fill="#5C62D6" />
      <rect x="24" y="14" width="28" height="36" rx="6" fill="#3B45B7" />
      <rect x="30" y="20" width="12" height="4" rx="2" fill="#E8EBFF" />
      <rect x="30" y="26" width="8" height="4" rx="2" fill="#E8EBFF" />
      <circle cx="50" cy="18" r="6" fill="#5C62D6" />
    </svg>
  ),
  gcal: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="#1A73E8" />
      <rect x="10" y="18" width="44" height="10" fill="#185ABC" />
      <path d="M16 10c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v8H16v-8Z" fill="#8AB4F8" />
      <text x="32" y="44" textAnchor="middle" fontSize="18" fontWeight="700" fill="#F1F3F4" fontFamily="'Inter', system-ui">31</text>
    </svg>
  ),
  gdrive: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <polygon points="24,8 40,8 56,36 40,36" fill="#4285F4" />
      <polygon points="24,8 40,36 24,56 8,28" fill="#34A853" />
      <polygon points="8,28 24,56 40,56 56,28 40,28 32,42 24,28" fill="#FBBC04" />
    </svg>
  ),
  dropbox: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <polygon points="22,10 32,18 22,26 12,18" fill="#0061FF" />
      <polygon points="42,10 52,18 42,26 32,18" fill="#0061FF" />
      <polygon points="22,30 32,38 22,46 12,38" fill="#0061FF" />
      <polygon points="42,30 52,38 42,46 32,38" fill="#0061FF" />
      <polygon points="22,46 32,54 42,46 32,38" fill="#3385FF" />
    </svg>
  ),
  zoom: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <rect x="8" y="14" width="36" height="36" rx="10" fill="#2D8CFF" />
      <rect x="34" y="24" width="18" height="16" rx="4" fill="#CDE3FF" />
      <rect x="14" y="24" width="18" height="16" rx="6" fill="#E6F0FF" />
    </svg>
  ),
  asana: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <circle cx="32" cy="18" r="10" fill="#FF6B6B" />
      <circle cx="20" cy="38" r="10" fill="#FFB45B" />
      <circle cx="44" cy="38" r="10" fill="#FF8F8F" />
    </svg>
  ),
  clickup: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <path d="M16 20 32 8l16 12" fill="none" stroke="#7B68EE" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 38c8 10 16 10 24 0" fill="none" stroke="#FF6B9E" strokeWidth="6" strokeLinecap="round" />
      <path d="M22 46c6 6 14 6 20 0" fill="none" stroke="#FFB55A" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <path d="M16 32 32 16l16 16-16 16Z" fill="#2684FF" />
      <path d="M24 32 32 24l8 8-8 8Z" fill="#4C9AFF" />
    </svg>
  ),
  hubspot: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <circle cx="34" cy="32" r="12" fill="#FF7A59" />
      <circle cx="14" cy="20" r="5" fill="#FF7A59" />
      <circle cx="46" cy="12" r="4" fill="#FF7A59" />
      <rect x="12" y="24" width="6" height="18" rx="3" fill="#FF7A59" />
      <rect x="34" y="10" width="6" height="18" rx="3" fill="#FF7A59" transform="rotate(-45 37 19)" />
      <rect x="42" y="32" width="12" height="6" rx="3" fill="#FF7A59" />
    </svg>
  ),
  salesforce: (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <circle cx="26" cy="28" r="10" fill="#00A1E0" />
      <circle cx="38" cy="28" r="12" fill="#00B4F0" />
      <circle cx="22" cy="36" r="9" fill="#00B9F1" />
      <circle cx="38" cy="38" r="11" fill="#00AEEF" />
      <circle cx="46" cy="32" r="9" fill="#00A1E0" />
    </svg>
  ),
};

export function IntegrationsScreen({ context }: IntegrationsScreenProps) {
  const { mode, role } = context;
  const isDark = mode !== 'Focus';

  const [integrations] = useState<Integration[]>([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Sync notifications and team messages with your workspace modes',
      category: 'Communication',
      connected: true,
      logo: integrationLogos.slack,
      features: ['Mode-aware notifications', 'Task threading', 'Status sync']
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Connect your Teams workspace for seamless collaboration',
      category: 'Communication',
      connected: false,
      logo: integrationLogos.teams,
      features: ['Meeting sync', 'Chat integration', 'Presence updates']
    },
    {
      id: 'gcal',
      name: 'Google Calendar',
      description: 'Auto-schedule Focus sessions and sync deadlines',
      category: 'Productivity',
      connected: true,
      logo: integrationLogos.gcal,
      features: ['Smart scheduling', 'Deadline sync', 'Time blocking']
    },
    {
      id: 'gdrive',
      name: 'Google Drive',
      description: 'Attach files directly to tasks and access shared documents',
      category: 'Storage',
      connected: true,
      logo: integrationLogos.gdrive,
      features: ['File attachments', 'Version control', 'Shared access']
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Sync task files and collaborate on documents',
      category: 'Storage',
      connected: false,
      logo: integrationLogos.dropbox,
      features: ['File sync', 'Smart suggestions', 'Team folders']
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Schedule and join meetings directly from tasks',
      category: 'Communication',
      connected: false,
      logo: integrationLogos.zoom,
      features: ['One-click meetings', 'Recording integration', 'AI summaries']
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Import tasks and sync project timelines',
      category: 'Project Management',
      connected: false,
      logo: integrationLogos.asana,
      features: ['Task import', 'Timeline sync', 'Two-way updates']
    },
    {
      id: 'clickup',
      name: 'ClickUp',
      description: 'Connect your ClickUp workspace for unified task management',
      category: 'Project Management',
      connected: false,
      logo: integrationLogos.clickup,
      features: ['Workspace sync', 'Custom fields', 'Automation']
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Sync engineering tasks and sprint planning',
      category: 'Project Management',
      connected: true,
      logo: integrationLogos.jira,
      features: ['Issue sync', 'Sprint tracking', 'Agile workflows']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Track sales activities and customer engagement',
      category: 'CRM',
      connected: false,
      logo: integrationLogos.hubspot,
      features: ['Deal tracking', 'Contact sync', 'Pipeline insights']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect CRM data and automate workflows',
      category: 'CRM',
      connected: false,
      logo: integrationLogos.salesforce,
      features: ['Lead management', 'Opportunity tracking', 'Custom objects']
    },
  ]);

  const categories = ['All', 'Communication', 'Productivity', 'Storage', 'Project Management', 'CRM'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = selectedCategory === 'All' 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);

  const toggleConnection = (id: string) => {
    // In a real app, this would handle OAuth flow
    console.log(`Toggle connection for ${id}`);
  };

  return (
    <div className={`${mode === 'Sprint' ? 'p-6' : mode === 'Chill' ? 'p-12' : 'p-8'} max-w-7xl mx-auto`}>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>
          Integrations & Automations
        </h1>
        <p className={mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Connect your favorite tools to enhance CoHesion's adaptive workspace
          {role === 'member' && ' (Read-only)'}
        </p>
        {role === 'member' && (
          <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 text-sm ${
            mode === 'Chill' ? 'bg-blue-50 border border-blue-200 text-blue-700' : isDark ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <span>ℹ️</span>
            <span>Contact your Project Manager to add or remove integrations</span>
          </div>
        )}
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex gap-2 mb-8 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              selectedCategory === category
                ? mode === 'Sprint'
                  ? 'bg-red-500 text-white'
                  : mode === 'Chill'
                  ? 'bg-[#6CA8FF] text-white'
                  : 'bg-neutral-700 text-white'
                : mode === 'Chill'
                ? 'bg-white border border-[rgba(108,168,255,0.15)] text-[#1E2A40]'
                : isDark
                ? 'bg-neutral-800/50 border border-red-500/20 text-white'
                : 'bg-white/80 border border-neutral-300/30 text-neutral-900'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Integrations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            className={`p-6 rounded-2xl border ${
              mode === 'Chill'
                ? 'bg-white border-[rgba(108,168,255,0.15)]'
                : isDark
                ? 'bg-neutral-800/50 border-red-500/20'
                : 'bg-white/80 border-neutral-300/30'
            } hover:shadow-lg transition-shadow`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-2xl">
                  {integration.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>
                      {integration.name}
                    </h3>
                    {integration.connected && (
                      <CheckCircle2 className={`w-4 h-4 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-blue-500' : 'text-green-600'}`} />
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    mode === 'Chill' ? 'bg-blue-50 text-blue-600' : isDark ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {integration.category}
                  </span>
                </div>
              </div>
            </div>

            <p className={`text-sm mb-4 ${mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {integration.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {integration.features.map((feature) => (
                <span
                  key={feature}
                  className={`text-xs px-2 py-1 rounded ${
                    mode === 'Chill'
                      ? 'bg-[rgba(108,168,255,0.12)] text-[#3A4A62]'
                      : isDark
                      ? 'bg-neutral-900/50 text-neutral-400'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {integration.connected ? (
                <>
                  <button
                    onClick={() => role === 'pm' && toggleConnection(integration.id)}
                    disabled={role === 'member'}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm ${
                      role === 'member' ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'
                    } ${
                      mode === 'Chill'
                        ? 'bg-neutral-100 text-[#1E2A40]'
                        : isDark
                        ? 'bg-neutral-700 text-white'
                        : 'bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    Disconnect
                  </button>
                  <button 
                    disabled={role === 'member'}
                    className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 ${
                      role === 'member' ? 'opacity-40 cursor-not-allowed' : ''
                    } ${
                      mode === 'Chill'
                        ? 'bg-white border border-[rgba(108,168,255,0.15)] text-[#1E2A40]'
                        : isDark
                        ? 'bg-neutral-800/50 border border-red-500/20 text-white'
                        : 'bg-white border border-neutral-300/30 text-neutral-900'
                    }`}>
                    <Settings className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => role === 'pm' && toggleConnection(integration.id)}
                    disabled={role === 'member'}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm flex items-center justify-center gap-2 ${
                      role === 'member' ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'
                    } ${
                      mode === 'Sprint'
                        ? 'bg-red-500 text-white'
                        : mode === 'Chill'
                        ? 'bg-[#6CA8FF] text-white'
                        : 'bg-neutral-700 text-white'
                    }`}
                  >
                    Connect
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button 
                    disabled={role === 'member'}
                    className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 ${
                      role === 'member' ? 'opacity-40 cursor-not-allowed' : ''
                    } ${
                      mode === 'Chill'
                        ? 'bg-white border border-[rgba(108,168,255,0.15)] text-[#1E2A40]'
                        : isDark
                        ? 'bg-neutral-800/50 border border-red-500/20 text-white'
                        : 'bg-white border border-neutral-300/30 text-neutral-900'
                    }`}>
                    <Key className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIntegrations.length === 0 && (
        <div className="text-center py-16">
          <p className={mode === 'Chill' ? 'text-[#7888A0]' : isDark ? 'text-neutral-500' : 'text-neutral-600'}>
            No integrations found in this category
          </p>
        </div>
      )}
    </div>
  );
}