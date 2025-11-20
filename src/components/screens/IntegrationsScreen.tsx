import { motion } from 'motion/react';
import { AppContextType } from '../../App';
import { CheckCircle2, ExternalLink, Settings, Key } from 'lucide-react';
import { useState } from 'react';

interface IntegrationsScreenProps {
  context: AppContextType;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  logo: string;
  features: string[];
}

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
      logo: '💬',
      features: ['Mode-aware notifications', 'Task threading', 'Status sync']
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Connect your Teams workspace for seamless collaboration',
      category: 'Communication',
      connected: false,
      logo: '👥',
      features: ['Meeting sync', 'Chat integration', 'Presence updates']
    },
    {
      id: 'gcal',
      name: 'Google Calendar',
      description: 'Auto-schedule Focus sessions and sync deadlines',
      category: 'Productivity',
      connected: true,
      logo: '📅',
      features: ['Smart scheduling', 'Deadline sync', 'Time blocking']
    },
    {
      id: 'gdrive',
      name: 'Google Drive',
      description: 'Attach files directly to tasks and access shared documents',
      category: 'Storage',
      connected: true,
      logo: '📁',
      features: ['File attachments', 'Version control', 'Shared access']
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Sync task files and collaborate on documents',
      category: 'Storage',
      connected: false,
      logo: '📦',
      features: ['File sync', 'Smart suggestions', 'Team folders']
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Schedule and join meetings directly from tasks',
      category: 'Communication',
      connected: false,
      logo: '🎥',
      features: ['One-click meetings', 'Recording integration', 'AI summaries']
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Import tasks and sync project timelines',
      category: 'Project Management',
      connected: false,
      logo: '✅',
      features: ['Task import', 'Timeline sync', 'Two-way updates']
    },
    {
      id: 'clickup',
      name: 'ClickUp',
      description: 'Connect your ClickUp workspace for unified task management',
      category: 'Project Management',
      connected: false,
      logo: '⚡',
      features: ['Workspace sync', 'Custom fields', 'Automation']
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Sync engineering tasks and sprint planning',
      category: 'Project Management',
      connected: true,
      logo: '🔷',
      features: ['Issue sync', 'Sprint tracking', 'Agile workflows']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Track sales activities and customer engagement',
      category: 'CRM',
      connected: false,
      logo: '🎯',
      features: ['Deal tracking', 'Contact sync', 'Pipeline insights']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect CRM data and automate workflows',
      category: 'CRM',
      connected: false,
      logo: '☁️',
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