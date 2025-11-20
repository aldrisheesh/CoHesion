import { motion, AnimatePresence } from "motion/react";
import { AppContextType } from "../../App";
import {
  Users,
  Zap,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  Sparkles,
  Radio,
  ChevronDown,
  ChevronUp,
  Target,
  Waves,
  Flame,
  Battery,
  CheckCircle,
  TrendingDown,
  Heart,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { useState, useMemo } from "react";

interface PMDashboardProps {
  context: AppContextType;
}

interface TeamMember {
  id: number;
  name: string;
  mode: "Sprint" | "Focus" | "Chill";
  energy: number;
  tasks: number;
  burnoutRisk: "low" | "medium" | "high";
  focusTime: string;
  timeInMode: string;
  avatar: string;
  gender: "male" | "female";
  initials: string;
}

interface Insight {
  id: number;
  severity: "critical" | "high" | "medium" | "low";
  type:
    | "dependency_risk"
    | "overload_prediction"
    | "burnout_prediction"
    | "sprint_duration_warning"
    | "optimal_sprint_window"
    | "recovery_trend";
  title: string;
  description: string;
  action: string;
  affectedMembers?: string[];
  reasoning?: string;
}

export function PMDashboard({ context }: PMDashboardProps) {
  const { mode } = context;
  const isDark = mode !== "Focus";

  // Expandable states
  const [expandedMember, setExpandedMember] = useState<
    number | null
  >(null);
  const [expandedInsight, setExpandedInsight] = useState<
    number | null
  >(1);

  // Real team data with gender-based avatar colors
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Roi Santos",
      mode: "Focus",
      energy: 85,
      tasks: 8,
      burnoutRisk: "low",
      focusTime: "6h 20m",
      timeInMode: "3h 45m",
      avatar: "from-blue-400 to-blue-600",
      gender: "male",
      initials: "RS",
    },
    {
      id: 2,
      name: "Stephen Robiso",
      mode: "Sprint",
      energy: 45,
      tasks: 14,
      burnoutRisk: "high",
      focusTime: "2h 10m",
      timeInMode: "6h 15m",
      avatar: "from-teal-400 to-teal-600",
      gender: "male",
      initials: "SR",
    },
    {
      id: 3,
      name: "Angelie Barrientos",
      mode: "Chill",
      energy: 92,
      tasks: 3,
      burnoutRisk: "low",
      focusTime: "4h 45m",
      timeInMode: "2h 30m",
      avatar: "from-pink-400 to-pink-600",
      gender: "female",
      initials: "AB",
    },
    {
      id: 4,
      name: "Shane Binuya",
      mode: "Focus",
      energy: 78,
      tasks: 6,
      burnoutRisk: "medium",
      focusTime: "5h 30m",
      timeInMode: "4h 00m",
      avatar: "from-indigo-400 to-indigo-600",
      gender: "male",
      initials: "SB",
    },
    {
      id: 5,
      name: "Sebastian Bien",
      mode: "Sprint",
      energy: 38,
      tasks: 12,
      burnoutRisk: "high",
      focusTime: "1h 50m",
      timeInMode: "5h 20m",
      avatar: "from-cyan-400 to-cyan-600",
      gender: "male",
      initials: "SB",
    },
    {
      id: 6,
      name: "Daniel Vibar",
      mode: "Chill",
      energy: 88,
      tasks: 4,
      burnoutRisk: "low",
      focusTime: "3h 15m",
      timeInMode: "1h 45m",
      avatar: "from-blue-500 to-blue-700",
      gender: "male",
      initials: "DV",
    },
    {
      id: 7,
      name: "Ivan Santos",
      mode: "Focus",
      energy: 72,
      tasks: 7,
      burnoutRisk: "low",
      focusTime: "4h 30m",
      timeInMode: "2h 15m",
      avatar: "from-teal-500 to-teal-700",
      gender: "male",
      initials: "IS",
    },
  ];

  // All insights
  const allInsights: Insight[] = [
    {
      id: 1,
      severity: "critical",
      type: "dependency_risk",
      title: "Task Dependency Risk",
      description:
        "Q4 Financial Report blocked by 2 incomplete dependencies. 78% chance of deadline miss within 48 hours.",
      reasoning:
        "Historical data shows similar blockers delayed deliverables by avg 5.2 days. Current velocity suggests critical path impact.",
      action: "Review Dependencies",
      affectedMembers: ["Stephen Robiso", "Roi Santos"],
    },
    {
      id: 2,
      severity: "high",
      type: "overload_prediction",
      title: "Overload Prediction",
      description:
        "Stephen & Sebastian showing signs of task overload. Current trajectory suggests burnout risk increase to critical within 2 hours.",
      reasoning:
        "Task completion velocity declining 32% over last 4 hours. Energy levels dropping faster than sustainable rate.",
      action: "Rebalance Workload",
      affectedMembers: ["Stephen Robiso", "Sebastian Bien"],
    },
    {
      id: 3,
      severity: "high",
      type: "burnout_prediction",
      title: "Burnout Prediction Alert",
      description:
        "Stephen Robiso at 89% burnout risk. Prolonged Sprint mode detected (6h continuous). Immediate intervention recommended.",
      reasoning:
        "Energy depletion rate exceeds recovery capacity. Pattern matches historical burnout events in team data.",
      action: "Suggest Chill Mode",
      affectedMembers: ["Stephen Robiso"],
    },
    {
      id: 4,
      severity: "medium",
      type: "sprint_duration_warning",
      title: "Sprint Mode Duration Warning",
      description:
        "3 team members in Sprint mode for 4+ hours. Sustained high intensity may affect team performance.",
      reasoning:
        "Optimal Sprint windows are 2-3 hours. Extended periods correlate with 24% productivity decline next day.",
      action: "Review Mode Distribution",
      affectedMembers: [
        "Stephen Robiso",
        "Sebastian Bien",
        "Roi Santos",
      ],
    },
    {
      id: 5,
      severity: "low",
      type: "optimal_sprint_window",
      title: "Optimal Sprint Window Detected",
      description:
        "Team energy peaks between 2-4 PM. Consider scheduling critical tasks during this high-energy window.",
      reasoning:
        "Analysis of 30-day energy patterns shows consistent peak performance during afternoon hours.",
      action: "Optimize Schedule",
    },
    {
      id: 6,
      severity: "low",
      type: "recovery_trend",
      title: "Positive Recovery Trend",
      description:
        "Team average energy increased 18% over last 2 hours. Chill mode adoption showing positive impact.",
      reasoning:
        "Recovery rate aligns with optimal rest patterns. Morale indicators trending upward.",
      action: "Monitor Progress",
    },
  ];

  // Mode-specific filtering and sorting
  const filteredInsights = useMemo(() => {
    let filtered = [...allInsights];

    if (mode === "Sprint") {
      // Show only critical and high priority
      filtered = filtered.filter(
        (i) =>
          i.severity === "critical" || i.severity === "high",
      );
      // Prioritize blockers and burnout warnings
      filtered.sort((a, b) => {
        if (
          a.severity === "critical" &&
          b.severity !== "critical"
        )
          return -1;
        if (a.type === "burnout_prediction") return -1;
        return 0;
      });
    } else if (mode === "Focus") {
      // Show all insights with reasoning
      filtered.sort((a, b) => {
        const order = {
          critical: 0,
          high: 1,
          medium: 2,
          low: 3,
        };
        return order[a.severity] - order[b.severity];
      });
    } else if (mode === "Chill") {
      // Filter out critical, emphasize recovery and wellbeing
      filtered = filtered.filter(
        (i) =>
          i.severity === "medium" ||
          i.severity === "low" ||
          i.type === "recovery_trend",
      );
      filtered.sort((a, b) => {
        if (a.type === "recovery_trend") return -1;
        if (b.type === "recovery_trend") return 1;
        return 0;
      });
    }

    return filtered;
  }, [mode]);

  // Sort team members based on mode
  const sortedTeamMembers = useMemo(() => {
    const sorted = [...teamMembers];

    if (mode === "Sprint") {
      // Sort by risk level (high first)
      sorted.sort((a, b) => {
        const riskOrder = { high: 0, medium: 1, low: 2 };
        return (
          riskOrder[a.burnoutRisk] - riskOrder[b.burnoutRisk]
        );
      });
    } else if (mode === "Focus") {
      // Sort by workload balance (most tasks first)
      sorted.sort((a, b) => b.tasks - a.tasks);
    } else if (mode === "Chill") {
      // Sort by energy level (lowest first for attention)
      sorted.sort((a, b) => a.energy - b.energy);
    }

    return sorted;
  }, [mode]);

  // Calculate metrics
  const avgEnergy = Math.round(
    teamMembers.reduce((sum, m) => sum + m.energy, 0) /
      teamMembers.length,
  );
  const burnoutRiskCount = teamMembers.filter(
    (m) => m.burnoutRisk === "high",
  ).length;
  const burnoutRiskLevel =
    burnoutRiskCount === 0
      ? "Low"
      : burnoutRiskCount === 1
        ? "Medium"
        : "High";
  const totalFocusTime = teamMembers.reduce((sum, m) => {
    const [hours, mins] = m.focusTime
      .split("h ")
      .map((s) => parseInt(s));
    return sum + hours * 60 + mins;
  }, 0);
  const avgTaskLoad = (
    teamMembers.reduce((sum, m) => sum + m.tasks, 0) /
    teamMembers.length
  ).toFixed(1);

  // Mode-specific styling
  const spacing =
    mode === "Sprint"
      ? "gap-3"
      : mode === "Focus"
        ? "gap-5"
        : "gap-7";
  const cardRadius =
    mode === "Sprint"
      ? "rounded-xl"
      : mode === "Focus"
        ? "rounded-2xl"
        : "rounded-3xl";
  const containerPadding =
    mode === "Sprint"
      ? "p-5"
      : mode === "Focus"
        ? "p-8"
        : "p-10";

  // Mode-specific theme
  const modeTheme = {
    Sprint: {
      primaryAccent: "#FF4A4A",
      secondaryAccent: "#FF8E57",
      cardBg: isDark ? "#24242A" : "#FFFFFF",
      baseBg: isDark ? "#1A1A1F" : "#F6F6F8",
      textPrimary: isDark ? "#FFFFFF" : "#1A1A1F",
      textSecondary: isDark ? "#A0A0A8" : "#6B6B76",
      borderColor: isDark
        ? "rgba(255, 74, 74, 0.15)"
        : "rgba(255, 74, 74, 0.2)",
      shadow:
        mode === "Sprint"
          ? "shadow-lg shadow-red-500/10"
          : "shadow-md",
      pulse: true,
    },
    Focus: {
      primaryAccent: "#4A4AFF",
      secondaryAccent: "#7A7AFF",
      cardBg: "#FFFFFF",
      baseBg: "#F6F6F8",
      textPrimary: "#1A1A1F",
      textSecondary: "#6B6B76",
      borderColor: "rgba(74, 74, 255, 0.15)",
      shadow: "shadow-sm",
      pulse: false,
    },
    Chill: {
      primaryAccent: "#62A3FF",
      secondaryAccent: "#B18CFF",
      cardBg: "rgba(255, 255, 255, 0.85)",
      baseBg:
        "linear-gradient(135deg, #EEF4FF 0%, #F5F0FF 100%)",
      textPrimary: "#1E2A40",
      textSecondary: "#3A4A62",
      borderColor: "rgba(98, 163, 255, 0.2)",
      shadow: "shadow-md shadow-blue-200/20",
      pulse: false,
    },
  }[mode];

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: "#FF4E4E",
      high: "#FFB347",
      medium: mode === "Chill" ? "#62A3FF" : "#5EA0FF",
      low: mode === "Chill" ? "#88D4A7" : "#47D88A",
    };
    return colors[severity as keyof typeof colors];
  };

  const getSeverityBg = (severity: string) => {
    if (mode === "Chill") {
      return {
        critical: "bg-red-50/80",
        high: "bg-orange-50/80",
        medium: "bg-blue-50/80",
        low: "bg-green-50/80",
      }[severity];
    }
    if (mode === "Focus") {
      return "bg-white";
    }
    return "bg-[#24242A]";
  };

  const getEnergyColor = (energy: number) => {
    if (energy < 40) return getSeverityColor("critical");
    if (energy < 70) return getSeverityColor("high");
    return getSeverityColor("low");
  };

  const toggleMember = (id: number) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const toggleInsight = (id: number) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };

  // Mode-specific PM Insights
  const pmInsights = {
    Sprint: [
      {
        category: "Critical Risk",
        message: "2 members at burnout threshold",
        action: "Urgent intervention needed",
      },
      {
        category: "Urgent Action",
        message: "Dependency blocker detected",
        action: "Resolve Q4 Report blocker",
      },
    ],
    Focus: [
      {
        category: "Dependency Risk",
        message: "Q4 Report has 2 incomplete dependencies",
        action: "Review task chain",
      },
      {
        category: "Efficiency Alert",
        message: "Stephen velocity declining 32%",
        action: "Analyze workload",
      },
      {
        category: "Optimal Window",
        message: "Peak energy window 2-4 PM today",
        action: "Schedule critical tasks",
      },
    ],
    Chill: [
      {
        category: "Recovery Status",
        message: "Team energy improved 18% in 2h",
        action: "Continue current pace",
      },
      {
        category: "Morale Insight",
        message: "Positive wellbeing trend detected",
        action: "Recognize team effort",
      },
      {
        category: "Reflection",
        message: "Consider celebrating recent wins",
        action: "Send recognition",
      },
    ],
  }[mode];

  return (
    <div
      className={containerPadding}
      style={{ maxWidth: 1680, margin: "0 auto" }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 style={{ color: modeTheme.textPrimary }}>
          PM Dashboard
        </h1>
        <p style={{ color: modeTheme.textSecondary }}>
          {mode === "Sprint" &&
            "High-urgency supervision · Critical risks · Immediate actions"}
          {mode === "Focus" &&
            "Analytical oversight · Workload balance · Dependency tracking"}
          {mode === "Chill" &&
            "Team wellbeing · Recovery monitoring · Morale insights"}
        </p>
      </motion.div>

      {/* Three-Column Layout */}
      <div
        className={`grid grid-cols-[35%_40%_25%] pr-8 ${spacing} transition-all duration-300 ease-in-out`}
        style={{
          marginRight: context.commandCenterOpen
            ? "400px"
            : "0",
        }}
      >
        {/* LEFT COLUMN - Team Health & Stability */}
        <div
          className={`space-y-${mode === "Sprint" ? "4" : mode === "Focus" ? "5" : "6"}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* Section Title */}
            <h2
              className={`text-sm uppercase tracking-wider mb-4`}
              style={{ color: modeTheme.textSecondary }}
            >
              Team Health & Stability
            </h2>

            {/* Team Health Summary - Mode-Reactive Metrics */}
            <div
              className={`grid grid-cols-3 gap-2 mb-${mode === "Sprint" ? "4" : "6"}`}
            >
              {/* Burnout Risk - Always shown, emphasized in Sprint */}
              <motion.div
                className={`p-3 ${cardRadius} border transition-all ${modeTheme.shadow}`}
                style={{
                  backgroundColor: modeTheme.cardBg,
                  borderColor:
                    mode === "Sprint" &&
                    burnoutRiskLevel !== "Low"
                      ? modeTheme.primaryAccent
                      : modeTheme.borderColor,
                }}
                animate={
                  mode === "Sprint" &&
                  burnoutRiskLevel !== "Low"
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(255, 74, 74, 0.3)",
                          "0 0 0 4px rgba(255, 74, 74, 0)",
                          "0 0 0 0 rgba(255, 74, 74, 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Flame
                    className="w-3.5 h-3.5"
                    style={{ color: modeTheme.primaryAccent }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-wide"
                    style={{ color: modeTheme.textSecondary }}
                  >
                    {mode === "Sprint"
                      ? "Burnout"
                      : mode === "Focus"
                        ? "Burnout Risk"
                        : "Wellbeing"}
                  </span>
                </div>
                <div
                  className="text-xl"
                  style={{
                    color:
                      burnoutRiskLevel === "High"
                        ? "#FF4E4E"
                        : burnoutRiskLevel === "Medium"
                          ? "#FFB347"
                          : mode === "Chill"
                            ? "#88D4A7"
                            : "#47D88A",
                  }}
                >
                  {burnoutRiskLevel}
                </div>
              </motion.div>

              {/* Team Energy - Emphasized in Chill */}
              <div
                className={`p-3 ${cardRadius} border transition-all ${modeTheme.shadow}`}
                style={{
                  backgroundColor: modeTheme.cardBg,
                  borderColor:
                    mode === "Chill"
                      ? modeTheme.primaryAccent
                      : modeTheme.borderColor,
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap
                    className="w-3.5 h-3.5"
                    style={{
                      color:
                        mode === "Chill"
                          ? modeTheme.primaryAccent
                          : modeTheme.secondaryAccent,
                    }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-wide"
                    style={{ color: modeTheme.textSecondary }}
                  >
                    Energy
                  </span>
                </div>
                <div
                  className="text-xl"
                  style={{ color: modeTheme.textPrimary }}
                >
                  {avgEnergy}%
                </div>
              </div>

              {/* Active Members / Focus Time - Mode dependent */}
              <div
                className={`p-3 ${cardRadius} border transition-all ${modeTheme.shadow}`}
                style={{
                  backgroundColor: modeTheme.cardBg,
                  borderColor: modeTheme.borderColor,
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  {mode === "Focus" ? (
                    <Clock
                      className="w-3.5 h-3.5"
                      style={{
                        color: modeTheme.secondaryAccent,
                      }}
                    />
                  ) : (
                    <Users
                      className="w-3.5 h-3.5"
                      style={{
                        color: modeTheme.secondaryAccent,
                      }}
                    />
                  )}
                  <span
                    className="text-[10px] uppercase tracking-wide"
                    style={{ color: modeTheme.textSecondary }}
                  >
                    {mode === "Focus" ? "Focus" : "Active"}
                  </span>
                </div>
                <div
                  className="text-xl"
                  style={{ color: modeTheme.textPrimary }}
                >
                  {mode === "Focus"
                    ? `${Math.floor(totalFocusTime / 60)}h ${totalFocusTime % 60}m`
                    : teamMembers.length}
                </div>
              </div>
            </div>

            {/* Team Member Status - Mode-Reactive Sorting */}
            <div
              className={`${cardRadius} border overflow-hidden ${modeTheme.shadow}`}
              style={{
                backgroundColor: modeTheme.cardBg,
                borderColor: modeTheme.borderColor,
              }}
            >
              <div
                className="p-4 border-b"
                style={{ borderColor: modeTheme.borderColor }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className="text-sm"
                    style={{ color: modeTheme.textPrimary }}
                  >
                    Team Member Status
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        mode === "Sprint"
                          ? "rgba(255,74,74,0.1)"
                          : mode === "Focus"
                            ? "rgba(74,74,255,0.1)"
                            : "rgba(98,163,255,0.1)",
                      color: modeTheme.primaryAccent,
                    }}
                  >
                    {mode === "Sprint"
                      ? "By Risk"
                      : mode === "Focus"
                        ? "By Load"
                        : "By Energy"}
                  </span>
                </div>
              </div>
              <div
                className="divide-y"
                style={{ borderColor: modeTheme.borderColor }}
              >
                {sortedTeamMembers.map((member, index) => {
                  const showRiskFlag =
                    mode === "Sprint" &&
                    member.burnoutRisk === "high";

                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <button
                        onClick={() => toggleMember(member.id)}
                        className={`w-full p-3 text-left transition-colors ${
                          expandedMember === member.id
                            ? mode === "Chill"
                              ? "bg-blue-50/50"
                              : "bg-black/5"
                            : "hover:bg-black/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Status Dot */}
                          <motion.div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor:
                                member.burnoutRisk === "high"
                                  ? "#FF4E4E"
                                  : member.burnoutRisk ===
                                      "medium"
                                    ? "#FFB347"
                                    : "#47D88A",
                            }}
                            animate={
                              showRiskFlag && modeTheme.pulse
                                ? {
                                    scale: [1, 1.3, 1],
                                    opacity: [1, 0.7, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />

                          {/* Avatar */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative"
                            style={{
                              background: `linear-gradient(135deg, ${
                                member.avatar.includes("blue")
                                  ? "#60A5FA, #3B82F6"
                                  : member.avatar.includes(
                                        "teal",
                                      )
                                    ? "#2DD4BF, #14B8A6"
                                    : member.avatar.includes(
                                          "pink",
                                        )
                                      ? "#F9A8D4, #EC4899"
                                      : member.avatar.includes(
                                            "indigo",
                                          )
                                        ? "#A78BFA, #8B5CF6"
                                        : member.avatar.includes(
                                              "cyan",
                                            )
                                          ? "#22D3EE, #06B6D4"
                                          : member.avatar.includes(
                                                "purple",
                                              )
                                            ? "#C084FC, #A855F7"
                                            : "#60A5FA, #3B82F6"
                              })`,
                              boxShadow:
                                mode === "Focus"
                                  ? "0 0 0 1px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)"
                                  : mode === "Chill"
                                    ? "0 0 0 1px rgba(98,163,255,0.1), 0 2px 6px rgba(98,163,255,0.15)"
                                    : "0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.2)",
                            }}
                          >
                            <span
                              className="text-xs text-white"
                              style={{ fontWeight: 600 }}
                            >
                              {member.initials}
                            </span>
                          </div>

                          {/* Name & Info */}
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm truncate flex items-center gap-2"
                              style={{
                                color: modeTheme.textPrimary,
                              }}
                            >
                              {member.name}
                              {showRiskFlag && (
                                <AlertTriangle className="w-3 h-3 text-red-500" />
                              )}
                            </div>
                            <div
                              className="text-xs"
                              style={{
                                color: modeTheme.textSecondary,
                              }}
                            >
                              {mode === "Sprint" &&
                                `${member.tasks} tasks · ${member.timeInMode} in mode`}
                              {mode === "Focus" &&
                                `${member.tasks} tasks · ${member.focusTime} focus`}
                              {mode === "Chill" &&
                                `${member.energy}% energy · ${member.timeInMode} in ${member.mode}`}
                            </div>
                          </div>

                          {/* Mode Badge */}
                          {mode !== "Chill" && (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] ${
                                member.mode === "Sprint"
                                  ? mode === "Sprint"
                                    ? "bg-red-500/30 text-red-300"
                                    : "bg-red-500/20 text-red-400"
                                  : member.mode === "Focus"
                                    ? "bg-neutral-500/20 text-neutral-400"
                                    : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {member.mode}
                            </span>
                          )}

                          {/* Energy - shown differently per mode */}
                          {mode !== "Chill" && (
                            <div
                              className="text-sm"
                              style={{
                                color: getEnergyColor(
                                  member.energy,
                                ),
                              }}
                            >
                              {member.energy}%
                            </div>
                          )}

                          {/* Expand Icon */}
                          <motion.div
                            animate={{
                              rotate:
                                expandedMember === member.id
                                  ? 180
                                  : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown
                              className="w-4 h-4"
                              style={{
                                color: modeTheme.textSecondary,
                              }}
                            />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedMember === member.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.18,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-3 pb-3 space-y-2"
                              style={{
                                backgroundColor:
                                  mode === "Chill"
                                    ? "rgba(98,163,255,0.05)"
                                    : "rgba(0,0,0,0.02)",
                              }}
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  style={{
                                    color:
                                      modeTheme.textSecondary,
                                  }}
                                >
                                  Energy Level
                                </span>
                                <span
                                  style={{
                                    color: getEnergyColor(
                                      member.energy,
                                    ),
                                  }}
                                >
                                  {member.energy}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  style={{
                                    color:
                                      modeTheme.textSecondary,
                                  }}
                                >
                                  Focus Time
                                </span>
                                <span
                                  style={{
                                    color:
                                      modeTheme.textPrimary,
                                  }}
                                >
                                  {member.focusTime}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  style={{
                                    color:
                                      modeTheme.textSecondary,
                                  }}
                                >
                                  Time in Mode
                                </span>
                                <span
                                  style={{
                                    color:
                                      modeTheme.textPrimary,
                                  }}
                                >
                                  {member.timeInMode}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  style={{
                                    color:
                                      modeTheme.textSecondary,
                                  }}
                                >
                                  Burnout Risk
                                </span>
                                <span
                                  className="capitalize"
                                  style={{
                                    color:
                                      member.burnoutRisk ===
                                      "high"
                                        ? "#FF4E4E"
                                        : member.burnoutRisk ===
                                            "medium"
                                          ? "#FFB347"
                                          : "#47D88A",
                                  }}
                                >
                                  {member.burnoutRisk}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  style={{
                                    color:
                                      modeTheme.textSecondary,
                                  }}
                                >
                                  Task Load
                                </span>
                                <span
                                  style={{
                                    color:
                                      modeTheme.textPrimary,
                                  }}
                                >
                                  {member.tasks} active
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* MIDDLE COLUMN - Predictive Insights */}
        <div
          className={`space-y-${mode === "Sprint" ? "3" : mode === "Focus" ? "4" : "5"}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-5">
              <div
                className={`p-2 ${cardRadius} flex items-center justify-center`}
                style={{
                  backgroundColor: `${modeTheme.primaryAccent}15`,
                  border: `1px solid ${modeTheme.primaryAccent}30`,
                }}
              >
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: modeTheme.primaryAccent }}
                />
              </div>
              <div>
                <h2
                  className="text-sm uppercase tracking-wider"
                  style={{
                    color: modeTheme.textPrimary,
                    fontWeight: 600,
                  }}
                >
                  {mode === "Sprint" &&
                    "Critical Risks & Actions"}
                  {mode === "Focus" &&
                    "Predictive Insights & Analysis"}
                  {mode === "Chill" &&
                    "Recovery & Wellbeing Insights"}
                </h2>
                <p
                  className="text-[10px]"
                  style={{ color: modeTheme.textSecondary }}
                >
                  {filteredInsights.length} insight
                  {filteredInsights.length !== 1 ? "s" : ""} ·
                  AI-powered analysis
                </p>
              </div>
            </div>

            {/* Insight Stack - Mode-Filtered */}
            <div
              className={`space-y-${mode === "Sprint" ? "2" : "3"}`}
            >
              {filteredInsights.map((insight, index) => {
                const isExpanded =
                  expandedInsight === insight.id ||
                  (mode === "Focus" && index === 0);
                const severityColor = getSeverityColor(
                  insight.severity,
                );
                const shouldPulse =
                  mode === "Sprint" &&
                  insight.severity === "critical";

                return (
                  <motion.div
                    key={insight.id}
                    className={`${cardRadius} border overflow-hidden ${modeTheme.shadow}`}
                    style={{
                      backgroundColor: getSeverityBg(
                        insight.severity,
                      ),
                      borderColor:
                        mode === "Sprint" &&
                        insight.severity === "critical"
                          ? severityColor
                          : modeTheme.borderColor,
                      borderLeftWidth: "3px",
                      borderLeftColor: severityColor,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.05,
                    }}
                  >
                    <button
                      onClick={() => toggleInsight(insight.id)}
                      className="w-full p-4 text-left hover:bg-black/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wide"
                              style={{
                                backgroundColor: `${severityColor}20`,
                                color: severityColor,
                              }}
                            >
                              {insight.severity}
                            </span>
                            {insight.affectedMembers && (
                              <span
                                className="text-xs"
                                style={{
                                  color:
                                    modeTheme.textSecondary,
                                }}
                              >
                                {insight.affectedMembers.length}{" "}
                                member
                                {insight.affectedMembers
                                  .length > 1
                                  ? "s"
                                  : ""}
                              </span>
                            )}
                            {mode === "Sprint" &&
                              insight.severity ===
                                "critical" && (
                                <motion.div
                                  animate={{
                                    opacity: [1, 0.4, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                  }}
                                >
                                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                </motion.div>
                              )}
                          </div>
                          <h3
                            className="text-sm mb-1"
                            style={{
                              color: modeTheme.textPrimary,
                            }}
                          >
                            {mode === "Sprint" &&
                            insight.severity === "critical"
                              ? `⚠️ ${insight.title}`
                              : insight.title}
                          </h3>
                          {!isExpanded && mode !== "Focus" && (
                            <p
                              className="text-xs line-clamp-1"
                              style={{
                                color: modeTheme.textSecondary,
                              }}
                            >
                              {insight.description}
                            </p>
                          )}
                        </div>
                        <motion.div
                          animate={{
                            rotate: isExpanded ? 180 : 0,
                          }}
                          transition={{ duration: 0.18 }}
                        >
                          <ChevronDown
                            className="w-4 h-4 flex-shrink-0"
                            style={{
                              color: modeTheme.textSecondary,
                            }}
                          />
                        </motion.div>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.18,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`px-4 pb-4 space-y-${mode === "Focus" ? "4" : "3"}`}
                          >
                            <p
                              className="text-sm"
                              style={{
                                color: modeTheme.textPrimary,
                              }}
                            >
                              {insight.description}
                            </p>

                            {/* Reasoning - Only in Focus mode */}
                            {mode === "Focus" &&
                              insight.reasoning && (
                                <div
                                  className="p-3 rounded-lg"
                                  style={{
                                    backgroundColor:
                                      "rgba(74,74,255,0.05)",
                                    borderLeft:
                                      "2px solid rgba(74,74,255,0.3)",
                                  }}
                                >
                                  <div
                                    className="text-[10px] uppercase tracking-wide mb-1"
                                    style={{
                                      color:
                                        modeTheme.secondaryAccent,
                                    }}
                                  >
                                    AI Reasoning
                                  </div>
                                  <p
                                    className="text-xs"
                                    style={{
                                      color:
                                        modeTheme.textSecondary,
                                    }}
                                  >
                                    {insight.reasoning}
                                  </p>
                                </div>
                              )}

                            {insight.affectedMembers && (
                              <div>
                                <div
                                  className="text-xs mb-2"
                                  style={{
                                    color:
                                      modeTheme.textSecondary,
                                  }}
                                >
                                  Affected Members:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {insight.affectedMembers.map(
                                    (name, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-1 rounded text-xs"
                                        style={{
                                          backgroundColor:
                                            mode === "Chill"
                                              ? "rgba(255,255,255,0.8)"
                                              : "rgba(0,0,0,0.05)",
                                          border: `1px solid ${modeTheme.borderColor}`,
                                          color:
                                            modeTheme.textPrimary,
                                        }}
                                      >
                                        {name}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                            <motion.button
                              className={`px-4 py-2 ${mode === "Sprint" ? "rounded-lg" : "rounded-xl"} text-xs transition-colors`}
                              style={{
                                backgroundColor:
                                  mode === "Sprint"
                                    ? modeTheme.primaryAccent
                                    : mode === "Chill"
                                      ? modeTheme.primaryAccent
                                      : "#FFFFFF",
                                color:
                                  mode === "Sprint" ||
                                  mode === "Chill"
                                    ? "#FFFFFF"
                                    : modeTheme.textPrimary,
                                border:
                                  mode === "Focus"
                                    ? `1px solid ${modeTheme.borderColor}`
                                    : "none",
                              }}
                              animate={shouldPulse && modeTheme.pulse ? {
                                boxShadow: [
                                  `0 0 0 0 ${severityColor}40`,
                                  `0 0 0 4px ${severityColor}00`,
                                  `0 0 0 0 ${severityColor}00`,
                                ],
                              } : {}}
                              transition={shouldPulse ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              } : {}}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {mode === "Sprint" &&
                              insight.severity === "critical"
                                ? `🚨 ${insight.action}`
                                : insight.action}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Operational Metrics */}
            {mode !== "Sprint" && (
              <div
                className={`mt-6 p-5 ${cardRadius} border ${modeTheme.shadow}`}
                style={{
                  backgroundColor: modeTheme.cardBg,
                  borderColor: modeTheme.borderColor,
                }}
              >
                <h3
                  className="text-sm mb-4 flex items-center gap-2"
                  style={{ color: modeTheme.textPrimary }}
                >
                  <BarChart3 className="w-4 h-4" />
                  Operational Metrics
                </h3>

                {/* Workload Distribution */}
                <div className="space-y-3 mb-6">
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: modeTheme.textSecondary }}
                  >
                    Workload by Priority
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span
                          style={{
                            color: modeTheme.textSecondary,
                          }}
                        >
                          High Priority
                        </span>
                        <span
                          style={{
                            color: modeTheme.textPrimary,
                          }}
                        >
                          26 tasks
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{
                          backgroundColor:
                            mode === "Chill"
                              ? "rgba(98,163,255,0.1)"
                              : "rgba(0,0,0,0.05)",
                        }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: "#FF4E4E" }}
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{
                            duration: 1,
                            delay: 0.5,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span
                          style={{
                            color: modeTheme.textSecondary,
                          }}
                        >
                          Medium Priority
                        </span>
                        <span
                          style={{
                            color: modeTheme.textPrimary,
                          }}
                        >
                          18 tasks
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{
                          backgroundColor:
                            mode === "Chill"
                              ? "rgba(98,163,255,0.1)"
                              : "rgba(0,0,0,0.05)",
                        }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: "#FFB347" }}
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          transition={{
                            duration: 1,
                            delay: 0.6,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span
                          style={{
                            color: modeTheme.textSecondary,
                          }}
                        >
                          Low Priority
                        </span>
                        <span
                          style={{
                            color: modeTheme.textPrimary,
                          }}
                        >
                          12 tasks
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{
                          backgroundColor:
                            mode === "Chill"
                              ? "rgba(98,163,255,0.1)"
                              : "rgba(0,0,0,0.05)",
                        }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor:
                              mode === "Chill"
                                ? "#62A3FF"
                                : "#5EA0FF",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: "30%" }}
                          transition={{
                            duration: 1,
                            delay: 0.7,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mode Distribution */}
                <div>
                  <div
                    className="text-xs uppercase tracking-wider mb-3"
                    style={{ color: modeTheme.textSecondary }}
                  >
                    Mode Distribution
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 text-center">
                      <div
                        className="text-xl mb-1"
                        style={{
                          color:
                            mode === "Chill"
                              ? "#FF6B6B"
                              : "#FF4E4E",
                        }}
                      >
                        33%
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: modeTheme.textSecondary,
                        }}
                      >
                        Sprint
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div
                        className="text-xl mb-1"
                        style={{
                          color:
                            mode === "Chill"
                              ? "#8B92A0"
                              : "#A0A0A8",
                        }}
                      >
                        33%
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: modeTheme.textSecondary,
                        }}
                      >
                        Focus
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div
                        className="text-xl mb-1"
                        style={{
                          color:
                            mode === "Chill"
                              ? "#62A3FF"
                              : "#5EA0FF",
                        }}
                      >
                        33%
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: modeTheme.textSecondary,
                        }}
                      >
                        Chill
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Control Panel & AI */}
        <div
          className={`space-y-${mode === "Sprint" ? "4" : mode === "Focus" ? "5" : "6"}`}
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {/* Section Title */}
            <h2
              className="text-sm uppercase tracking-wider mb-4"
              style={{ color: modeTheme.textSecondary }}
            >
              Control Panel & AI
            </h2>

            {/* Team Mode Controls - Mode-Reactive Priority */}
            <div
              className={`p-4 ${cardRadius} border ${modeTheme.shadow}`}
              style={{
                backgroundColor: modeTheme.cardBg,
                borderColor: modeTheme.borderColor,
              }}
            >
              <h3
                className="text-sm mb-3"
                style={{ color: modeTheme.textPrimary }}
              >
                Team Mode Controls
              </h3>

              <div className="space-y-2">
                {/* Sprint Mode - Hide in Chill, Prioritize in Sprint */}
                {mode !== "Chill" && (
                  <motion.button
                    className={`w-full px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                      mode === "Sprint"
                        ? "ring-2 ring-red-500/30"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        mode === "Sprint"
                          ? "rgba(255,74,74,0.2)"
                          : "rgba(255,74,74,0.1)",
                      border: `1px solid ${mode === "Sprint" ? "rgba(255,74,74,0.5)" : "rgba(255,74,74,0.3)"}`,
                      color: "#FF4E4E",
                    }}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span className="flex-1 text-left">
                      Force Sprint Mode
                    </span>
                  </motion.button>
                )}

                {/* Focus Mode - Always shown, prioritized in Sprint/Focus */}
                <motion.button
                  className={`w-full px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                    mode === "Focus"
                      ? "ring-2 ring-blue-500/30"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      mode === "Chill"
                        ? "rgba(107,107,107,0.05)"
                        : "rgba(107,107,107,0.1)",
                    border: `1px solid ${mode === "Chill" ? "rgba(107,107,107,0.15)" : "rgba(107,107,107,0.3)"}`,
                    color:
                      mode === "Chill" ? "#6B6B76" : "#8B8B96",
                  }}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left">
                    Start Focus Session
                  </span>
                </motion.button>

                {/* Chill Mode - Prioritized in Chill */}
                <motion.button
                  className={`w-full px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                    mode === "Chill"
                      ? "ring-2 ring-blue-500/30"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      mode === "Chill"
                        ? "rgba(98,163,255,0.2)"
                        : "rgba(98,163,255,0.1)",
                    border: `1px solid ${mode === "Chill" ? "rgba(98,163,255,0.4)" : "rgba(98,163,255,0.3)"}`,
                    color:
                      mode === "Chill" ? "#4A8FE8" : "#62A3FF",
                  }}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Waves className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left">
                    Initiate Chill Cooldown
                  </span>
                </motion.button>

                {/* Sync Mode - De-prioritized in Sprint */}
                {mode !== "Sprint" && (
                  <motion.button
                    className="w-full px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-colors"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.3)",
                      color: "#8B5CF6",
                    }}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span className="flex-1 text-left">
                      Enable Sync Mode
                    </span>
                  </motion.button>
                )}
              </div>

              {/* Warning - Mode-specific messaging */}
              <div
                className="mt-4 p-3 rounded-lg text-xs"
                style={{
                  backgroundColor:
                    mode === "Chill"
                      ? "rgba(255,190,100,0.1)"
                      : "rgba(255,179,71,0.1)",
                  border: `1px solid ${mode === "Chill" ? "rgba(255,190,100,0.2)" : "rgba(255,179,71,0.3)"}`,
                  color:
                    mode === "Chill" ? "#D97706" : "#FFB347",
                }}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <p>
                    {mode === "Sprint" &&
                      "Critical: Avoid frequent overrides"}
                    {mode === "Focus" &&
                      "Mode overrides may increase burnout risk"}
                    {mode === "Chill" &&
                      "Use mode controls mindfully for team wellbeing"}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistant Panel - Mode-Specific Content */}
            <div
              className={`p-4 ${cardRadius} border ${modeTheme.shadow} mt-4`}
              style={{
                background:
                  mode === "Chill"
                    ? "linear-gradient(135deg, rgba(238,244,255,0.8) 0%, rgba(245,240,255,0.8) 100%)"
                    : mode === "Focus"
                      ? "linear-gradient(135deg, #FFFFFF 0%, rgba(246,246,248,0.5) 100%)"
                      : "linear-gradient(135deg, rgba(36,36,42,0.8) 0%, rgba(42,42,48,0.8) 100%)",
                borderColor: modeTheme.borderColor,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: modeTheme.primaryAccent }}
                />
                <h3
                  className="text-sm"
                  style={{ color: modeTheme.textPrimary }}
                >
                  {mode === "Sprint"
                    ? "PM Command Center"
                    : mode === "Focus"
                      ? "AI Assistant"
                      : "Team Insights"}
                </h3>
              </div>

              <div className="space-y-3">
                {/* Mode-Specific Insights */}
                {pmInsights.map((insight, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor:
                        mode === "Chill"
                          ? "rgba(255,255,255,0.9)"
                          : mode === "Focus"
                            ? "#FFFFFF"
                            : "rgba(20,21,27,0.8)",
                      border: `1px solid ${modeTheme.borderColor}`,
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {mode === "Sprint" &&
                        insight.category.includes(
                          "Critical",
                        ) && (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5" />
                        )}
                      {mode === "Chill" &&
                        insight.category.includes(
                          "Recovery",
                        ) && (
                          <Heart className="w-3.5 h-3.5 text-green-500 mt-0.5" />
                        )}
                      {mode === "Focus" && (
                        <TrendingUp
                          className="w-3.5 h-3.5 mt-0.5"
                          style={{
                            color: modeTheme.secondaryAccent,
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <div
                          className="text-[10px] uppercase tracking-wide mb-1"
                          style={{
                            color: modeTheme.secondaryAccent,
                          }}
                        >
                          {insight.category}
                        </div>
                        <div
                          className="text-xs mb-1"
                          style={{
                            color: modeTheme.textPrimary,
                          }}
                        >
                          {insight.message}
                        </div>
                        <div
                          className="text-[10px]"
                          style={{
                            color: modeTheme.textSecondary,
                          }}
                        >
                          {insight.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Actions - Mode-Specific */}
                <div className="pt-2 space-y-2">
                  {mode === "Sprint" && (
                    <>
                      <button
                        className="w-full px-3 py-2 rounded-lg text-xs text-left transition-colors"
                        style={{
                          backgroundColor:
                            "rgba(255,74,74,0.15)",
                          color: "#FF4E4E",
                        }}
                      >
                        🚨 Review Critical Blockers
                      </button>
                      <button
                        className="w-full px-3 py-2 rounded-lg text-xs text-left transition-colors"
                        style={{
                          backgroundColor:
                            "rgba(255,179,71,0.15)",
                          color: "#FFB347",
                        }}
                      >
                        Rebalance Team Load
                      </button>
                    </>
                  )}
                  {mode === "Focus" && (
                    <>
                      <button
                        className="w-full px-3 py-2 rounded-lg text-xs text-left transition-colors"
                        style={{
                          backgroundColor:
                            "rgba(74,74,255,0.1)",
                          color: modeTheme.primaryAccent,
                        }}
                      >
                        Analyze Dependencies
                      </button>
                      <button
                        className="w-full px-3 py-2 rounded-lg text-xs text-left transition-colors"
                        style={{
                          backgroundColor:
                            "rgba(74,74,255,0.1)",
                          color: modeTheme.primaryAccent,
                        }}
                      >
                        Review Team Metrics
                      </button>
                    </>
                  )}
                  {mode === "Chill" && (
                    <>
                      <button
                        className="w-full px-3 py-2 rounded-lg text-xs text-left transition-colors"
                        style={{
                          backgroundColor:
                            "rgba(98,163,255,0.15)",
                          color: modeTheme.primaryAccent,
                        }}
                      >
                        💚 Send Recognition
                      </button>
                      <button
                        className="w-full px-3 py-2 rounded-lg text-xs text-left transition-colors"
                        style={{
                          backgroundColor:
                            "rgba(136,212,167,0.15)",
                          color: "#88D4A7",
                        }}
                      >
                        Celebrate Team Wins
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}