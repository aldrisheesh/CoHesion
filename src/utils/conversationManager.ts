// Conversation Manager - Handles task-specific conversations with persistence

export interface Message {
  id: string;
  type: 'standard' | 'decision' | 'blocker' | 'ai-summary' | 'pm-broadcast' | 'attachment';
  author: string;
  authorRole: 'member' | 'pm' | 'ai';
  content: string;
  timestamp: Date;
  isPrivate?: boolean;
  isPinned?: boolean;
  reactions?: { emoji: string; count: number }[];
  attachment?: {
    type: string;
    name: string;
    url: string;
  };
  parentId?: string;
}

export interface TaskConversation {
  taskId: string;
  messages: Message[];
  unreadCount: number;
  lastUpdated: Date;
}

const STORAGE_KEY = 'cohesion-task-conversations-v3';

class ConversationManager {
  private conversations: Map<string, TaskConversation>;

  constructor() {
    this.conversations = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([taskId, conv]: [string, any]) => {
          this.conversations.set(taskId, {
            ...conv,
            messages: conv.messages.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            })),
            lastUpdated: new Date(conv.lastUpdated),
          });
        });
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  }

  private saveToStorage() {
    try {
      const data: Record<string, TaskConversation> = {};
      this.conversations.forEach((conv, taskId) => {
        data[taskId] = conv;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save conversations:', error);
    }
  }

  getConversation(taskId: string): TaskConversation {
    if (!this.conversations.has(taskId)) {
      // Create default conversation with some sample messages
      const defaultMessages = this.getDefaultMessages(taskId);
      this.conversations.set(taskId, {
        taskId,
        messages: defaultMessages,
        unreadCount: defaultMessages.length > 0 ? Math.min(defaultMessages.length, 3) : 0, // Set some messages as unread initially
        lastUpdated: defaultMessages.length > 0 
          ? defaultMessages[defaultMessages.length - 1].timestamp 
          : new Date(),
      });
      this.saveToStorage();
    }
    return this.conversations.get(taskId)!;
  }

  private getDefaultMessages(taskId: string): Message[] {
    // Return mock conversation data based on taskId
    const mockConversations: Record<string, Message[]> = {
      '1': [ // Implement user authentication flow
        {
          id: 'msg-1-1',
          type: 'standard',
          author: 'Roi Santos',
          authorRole: 'pm',
          content: 'Hey team! Let\'s kick off the OAuth 2.0 implementation. I\'ve set up the initial structure in the repo.',
          timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
          reactions: [{ emoji: '👍', count: 3 }]
        },
        {
          id: 'msg-1-2',
          type: 'standard',
          author: 'You',
          authorRole: 'member',
          content: 'Perfect timing! I\'ve been reviewing the JWT token implementation. Should we use RS256 or HS256 for signing?',
          timestamp: new Date(Date.now() - 86400000 * 2 + 3600000), // 2 days ago + 1 hour
        },
        {
          id: 'msg-1-3',
          type: 'decision',
          author: 'Roi Santos',
          authorRole: 'pm',
          content: 'Great question! Let\'s go with RS256 for better security. It uses asymmetric keys which is more suitable for our multi-service architecture.',
          timestamp: new Date(Date.now() - 86400000 * 2 + 7200000), // 2 days ago + 2 hours
          isPinned: true,
          reactions: [{ emoji: '✅', count: 2 }]
        },
        {
          id: 'msg-1-4',
          type: 'blocker',
          author: 'Ivan Santos',
          authorRole: 'member',
          content: 'Heads up - the refresh token rotation is causing some issues with concurrent requests. Need to implement a lock mechanism.',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          reactions: [{ emoji: '🔥', count: 1 }]
        },
        {
          id: 'msg-1-5',
          type: 'ai-summary',
          author: 'AI Assistant',
          authorRole: 'ai',
          content: '📊 **Progress Update**: Authentication flow is 65% complete. Recent decisions: RS256 signing, refresh token rotation. Active blocker: concurrent request handling needs resolution.',
          timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        },
        {
          id: 'msg-1-6',
          type: 'standard',
          author: 'You',
          authorRole: 'member',
          content: 'I\'ll implement the Redis-based lock for the token rotation. Should have it ready by EOD.',
          timestamp: new Date(Date.now() - 21600000), // 6 hours ago
        }
      ],
      '2': [ // Design dashboard layout
        {
          id: 'msg-2-1',
          type: 'standard',
          author: 'Angelie Barrientos',
          authorRole: 'member',
          content: 'Started working on the wireframes! Here\'s my initial concept for the main dashboard.',
          timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
        },
        {
          id: 'msg-2-2',
          type: 'attachment',
          author: 'Angelie Barrientos',
          authorRole: 'member',
          content: 'Dashboard wireframe v1',
          timestamp: new Date(Date.now() - 86400000 * 3 + 300000), // 3 days ago + 5 min
          attachment: {
            type: 'image',
            name: 'dashboard-wireframe-v1.fig',
            url: '#'
          },
          reactions: [{ emoji: '🎨', count: 4 }]
        },
        {
          id: 'msg-2-3',
          type: 'blocker',
          author: 'Angelie Barrientos',
          authorRole: 'member',
          content: 'Blocked! Need approval on the color scheme before I can proceed with high-fidelity mockups. @PM can you review?',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          isPinned: true,
        },
        {
          id: 'msg-2-4',
          type: 'pm-broadcast',
          author: 'Project Manager',
          authorRole: 'pm',
          content: '📢 Color scheme approved! Go with the blue/purple gradient theme. Looks great!',
          timestamp: new Date(Date.now() - 43200000), // 12 hours ago
          reactions: [{ emoji: '🎉', count: 3 }]
        }
      ],
      '3': [ // Write API documentation
        {
          id: 'msg-3-1',
          type: 'standard',
          author: 'Daniel Vibar',
          authorRole: 'member',
          content: 'Setting up the documentation structure using Swagger/OpenAPI 3.0',
          timestamp: new Date(Date.now() - 86400000 * 4), // 4 days ago
        },
        {
          id: 'msg-3-2',
          type: 'decision',
          author: 'Stephen Robiso',
          authorRole: 'member',
          content: 'Let\'s include code examples in at least 3 languages: JavaScript, Python, and cURL. This will help with adoption.',
          timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
          isPinned: true,
          reactions: [{ emoji: '📚', count: 2 }]
        },
        {
          id: 'msg-3-3',
          type: 'ai-summary',
          author: 'AI Assistant',
          authorRole: 'ai',
          content: '📝 **Documentation Status**: 12 endpoints documented, 8 remaining. All examples include JS, Python, and cURL. Target completion: Dec 20.',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
        }
      ],
      '4': [ // Fix responsive layout issues
        {
          id: 'msg-4-1',
          type: 'standard',
          author: 'You',
          authorRole: 'member',
          content: 'Fixed the mobile breakpoint issues! Testing on various devices now.',
          timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
        },
        {
          id: 'msg-4-2',
          type: 'standard',
          author: 'Roi Santos',
          authorRole: 'pm',
          content: 'Excellent work! The tablet layout looks much better now. Can you also check the landscape orientation?',
          timestamp: new Date(Date.now() - 86400000 * 4), // 4 days ago
        },
        {
          id: 'msg-4-3',
          type: 'standard',
          author: 'You',
          authorRole: 'member',
          content: 'All layouts tested and working perfectly! Marking as complete.',
          timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
          reactions: [{ emoji: '✅', count: 5 }]
        }
      ],
      '5': [ // Set up CI/CD pipeline
        {
          id: 'msg-5-1',
          type: 'standard',
          author: 'Stephen Robiso',
          authorRole: 'member',
          content: 'Starting the GitHub Actions setup. Planning to have separate workflows for test, build, and deploy.',
          timestamp: new Date(Date.now() - 86400000 * 6), // 6 days ago
        },
        {
          id: 'msg-5-2',
          type: 'decision',
          author: 'Project Manager',
          authorRole: 'pm',
          content: 'Make sure to include automated testing in the pipeline. No deploys without passing tests!',
          timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
          isPinned: true,
          reactions: [{ emoji: '🔒', count: 3 }]
        },
        {
          id: 'msg-5-3',
          type: 'standard',
          author: 'Stephen Robiso',
          authorRole: 'member',
          content: 'Test workflow is running! Had to tweak the Node version but it\'s working now.',
          timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
        },
        {
          id: 'msg-5-4',
          type: 'blocker',
          author: 'Stephen Robiso',
          authorRole: 'member',
          content: 'Need AWS credentials for the deployment step. @PM can you provide access?',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: 'msg-5-5',
          type: 'standard',
          author: 'Ivan Santos',
          authorRole: 'member',
          content: 'I can help with the AWS setup if needed. Have experience with similar configurations.',
          timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        },
        {
          id: 'msg-5-6',
          type: 'ai-summary',
          author: 'AI Assistant',
          authorRole: 'ai',
          content: '⚙️ **Pipeline Progress**: Test and build workflows complete. Deployment blocked pending AWS credentials. Team collaboration active.',
          timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        }
      ]
    };

    return mockConversations[taskId] || [];
  }

  addMessage(taskId: string, message: Omit<Message, 'id'>): Message {
    const conversation = this.getConversation(taskId);
    const newMessage: Message = {
      ...message,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    conversation.messages.push(newMessage);
    conversation.unreadCount += 1;
    conversation.lastUpdated = new Date();
    
    this.conversations.set(taskId, conversation);
    this.saveToStorage();
    
    return newMessage;
  }

  getMessages(taskId: string): Message[] {
    return this.getConversation(taskId).messages;
  }

  getUnreadCount(taskId: string): number {
    const conversation = this.conversations.get(taskId);
    return conversation?.unreadCount || 0;
  }

  markAsRead(taskId: string) {
    const conversation = this.getConversation(taskId);
    conversation.unreadCount = 0;
    this.conversations.set(taskId, conversation);
    this.saveToStorage();
  }

  deleteMessage(taskId: string, messageId: string) {
    const conversation = this.getConversation(taskId);
    conversation.messages = conversation.messages.filter(m => m.id !== messageId);
    this.conversations.set(taskId, conversation);
    this.saveToStorage();
  }

  pinMessage(taskId: string, messageId: string) {
    const conversation = this.getConversation(taskId);
    const message = conversation.messages.find(m => m.id === messageId);
    if (message) {
      message.isPinned = !message.isPinned;
      this.conversations.set(taskId, conversation);
      this.saveToStorage();
    }
  }

  addReaction(taskId: string, messageId: string, emoji: string) {
    const conversation = this.getConversation(taskId);
    const message = conversation.messages.find(m => m.id === messageId);
    if (message) {
      if (!message.reactions) {
        message.reactions = [];
      }
      const existing = message.reactions.find(r => r.emoji === emoji);
      if (existing) {
        existing.count++;
      } else {
        message.reactions.push({ emoji, count: 1 });
      }
      this.conversations.set(taskId, conversation);
      this.saveToStorage();
    }
  }

  clearConversation(taskId: string) {
    this.conversations.delete(taskId);
    this.saveToStorage();
  }

  getAllUnreadCounts(): Map<string, number> {
    const counts = new Map<string, number>();
    this.conversations.forEach((conv, taskId) => {
      if (conv.unreadCount > 0) {
        counts.set(taskId, conv.unreadCount);
      }
    });
    return counts;
  }
}

// Export singleton instance
export const conversationManager = new ConversationManager();