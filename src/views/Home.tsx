import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    PiCurrencyDollarDuotone,
    PiUsersDuotone,
    PiChartLineUpDuotone,
    PiCpuDuotone,
    PiArrowUpRightBold,
    PiArrowDownRightBold,
    PiBookOpenDuotone,
    PiBellDuotone,
    PiGearDuotone,
    PiSparkleDuotone,
    PiSunDuotone,
    PiMoonDuotone,
    PiArrowRightDuotone
} from 'react-icons/pi'
import { useThemeStore } from '@/store/themeStore'
import { Link } from 'react-router-dom'

// Weekly revenue analytical data for our interactive chart
const weeklyData = [
    { day: 'Mon', revenue: 3200, users: 180 },
    { day: 'Tue', revenue: 4100, users: 220 },
    { day: 'Wed', revenue: 3800, users: 210 },
    { day: 'Thu', revenue: 5100, users: 290 },
    { day: 'Fri', revenue: 4800, users: 270 },
    { day: 'Sat', revenue: 6400, users: 380 },
    { day: 'Sun', revenue: 5900, users: 340 }
]

const recentActivities = [
    {
        id: 1,
        title: 'New customer signed up',
        user: 'Sarah Jenkins (Acme Corp)',
        time: '5 minutes ago',
        type: 'signup',
        status: 'success'
    },
    {
        id: 2,
        title: 'API gateway spike detected',
        user: 'Server-West (Uptime 99.9%)',
        time: '24 minutes ago',
        type: 'warning',
        status: 'warning'
    },
    {
        id: 3,
        title: 'Invoice paid successfully',
        user: 'Payment received: $4,250.00',
        time: '1 hour ago',
        type: 'payment',
        status: 'success'
    },
    {
        id: 4,
        title: 'New API version deployed',
        user: 'v1.4.2 released to production',
        time: '3 hours ago',
        type: 'deployment',
        status: 'info'
    }
]

const Home = () => {
    const { mode, setMode } = useThemeStore()
    const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null)
    const [notification, setNotification] = useState<string | null>(null)

    // Trigger a temporary in-app notification
    const triggerNotification = (message: string) => {
        setNotification(message)
        setTimeout(() => setNotification(null), 3000)
    }

    // Chart parameters for custom SVG area graph
    const chartHeight = 200
    const chartWidth = 560
    const paddingLeft = 40
    const paddingRight = 20
    const paddingTop = 20
    const paddingBottom = 30

    const graphWidth = chartWidth - paddingLeft - paddingRight
    const graphHeight = chartHeight - paddingTop - paddingBottom

    const maxVal = Math.max(...weeklyData.map(d => d.revenue)) * 1.1 // Add 10% headroom
    const minVal = Math.min(...weeklyData.map(d => d.revenue)) * 0.9

    // Calculate chart coordinates
    const points = weeklyData.map((d, index) => {
        const x = paddingLeft + (index / (weeklyData.length - 1)) * graphWidth
        const y = chartHeight - paddingBottom - ((d.revenue - minVal) / (maxVal - minVal)) * graphHeight
        return { x, y, day: d.day, val: d.revenue, users: d.users }
    })

    const pathD = points.reduce((acc, p, index) => {
        return index === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
    }, '')

    const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header section with profile greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        Dashboard <span className="text-primary text-xl"><PiSparkleDuotone /></span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Here is your platform operational overview for today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                        className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 cursor-pointer shadow-xs"
                        title="Toggle dark mode"
                    >
                        {mode === 'dark' ? <PiSunDuotone size={20} /> : <PiMoonDuotone size={20} />}
                    </button>
                    <Link
                        to="/docs"
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-deep text-white rounded-xl font-semibold transition duration-200 shadow-sm cursor-pointer"
                    >
                        <PiBookOpenDuotone size={18} />
                        <span>Documentation</span>
                    </Link>
                </div>
            </div>

            {/* Notification alert banner */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-primary-subtle border border-primary/20 text-primary px-4 py-3 rounded-xl flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <PiBellDuotone className="animate-bounce" />
                            <span className="font-semibold text-sm">{notification}</span>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="text-xs font-bold uppercase tracking-wider hover:underline"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Four primary statistics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Card 1: Revenue */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs flex flex-col justify-between group transition duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 bg-primary-subtle rounded-xl text-primary group-hover:scale-110 transition duration-200">
                            <PiCurrencyDollarDuotone size={24} />
                        </div>
                        <span className="flex items-center gap-0.5 text-success font-semibold text-xs py-1 px-2 bg-success-subtle rounded-full">
                            <PiArrowUpRightBold /> +12.5%
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">$48,259.00</h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                        <span>Monthly target: $50k</span>
                        <svg className="w-16 h-6 text-primary" viewBox="0 0 100 30" fill="none">
                            <path d="M0,25 Q15,10 30,20 T60,5 T90,15 L100,5" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </motion.div>

                {/* Stats Card 2: Active Users */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs flex flex-col justify-between group transition duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 bg-info-subtle rounded-xl text-info group-hover:scale-110 transition duration-200">
                            <PiUsersDuotone size={24} />
                        </div>
                        <span className="flex items-center gap-0.5 text-success font-semibold text-xs py-1 px-2 bg-success-subtle rounded-full">
                            <PiArrowUpRightBold /> +8.2%
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Active Subscriptions</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">1,842</h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                        <span>Active right now: 42</span>
                        <svg className="w-16 h-6 text-info" viewBox="0 0 100 30" fill="none">
                            <path d="M0,20 Q20,25 40,10 T80,15 L100,2" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </motion.div>

                {/* Stats Card 3: Conversion Rate */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs flex flex-col justify-between group transition duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 bg-warning-subtle rounded-xl text-warning group-hover:scale-110 transition duration-200">
                            <PiChartLineUpDuotone size={24} />
                        </div>
                        <span className="flex items-center gap-0.5 text-error font-semibold text-xs py-1 px-2 bg-error-subtle rounded-full">
                            <PiArrowDownRightBold /> -1.5%
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Conversion Rate</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">2.84%</h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                        <span>Industry avg: 2.1%</span>
                        <svg className="w-16 h-6 text-warning" viewBox="0 0 100 30" fill="none">
                            <path d="M0,5 Q20,15 40,8 T80,22 L100,25" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </motion.div>

                {/* Stats Card 4: Server Health */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs flex flex-col justify-between group transition duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="p-3 bg-success-subtle rounded-xl text-success group-hover:scale-110 transition duration-200">
                            <PiCpuDuotone size={24} />
                        </div>
                        <span className="flex items-center gap-0.5 text-success font-semibold text-xs py-1 px-2 bg-success-subtle rounded-full">
                            Stable
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Server Uptime</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">99.98%</h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                        <span>All 6 clusters healthy</span>
                        <svg className="w-16 h-6 text-success" viewBox="0 0 100 30" fill="none">
                            <path d="M0,15 L20,15 L25,5 L35,25 L40,15 L60,15 L65,8 L70,20 L75,15 L100,15" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Main analytical grid (Chart + Activity Feed) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Custom SVG interactive area chart */}
                <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Weekly Revenue Flow</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Interactive visual revenue charts (hover points for details)</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary rounded-xs inline-block" /> Revenue</span>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto">
                        <svg className="w-full min-w-[500px]" viewBox={`0 0 ${chartWidth} ${chartHeight}`} fill="none">
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.00" />
                                </linearGradient>
                            </defs>

                            {/* Background Horizontal Grid Lines */}
                            {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
                                const y = paddingTop + r * graphHeight
                                return (
                                    <line
                                        key={idx}
                                        x1={paddingLeft}
                                        y1={y}
                                        x2={chartWidth - paddingRight}
                                        y2={y}
                                        stroke="var(--gray-200)"
                                        className="dark:stroke-gray-800"
                                        strokeDasharray="4 4"
                                    />
                                )
                            })}

                            {/* Area Gradient Underlay */}
                            <path d={areaD} fill="url(#chartGrad)" />

                            {/* Main Stroke Path */}
                            <path d={pathD} stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Hotspots / Interactive Hover Circles */}
                            {points.map((p, idx) => (
                                <g key={idx}>
                                    {/* Transparent fat hover target */}
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r="18"
                                        fill="transparent"
                                        className="cursor-pointer"
                                        onMouseEnter={() => setHoveredChartIndex(idx)}
                                        onMouseLeave={() => setHoveredChartIndex(null)}
                                    />
                                    {/* Visual active dot */}
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r={hoveredChartIndex === idx ? '6' : '4'}
                                        fill={hoveredChartIndex === idx ? 'var(--primary-deep)' : 'var(--primary)'}
                                        stroke="white"
                                        strokeWidth="2"
                                        className="transition-all duration-150 pointer-events-none"
                                    />
                                </g>
                            ))}

                            {/* X-Axis labels */}
                            {points.map((p, idx) => (
                                <text
                                    key={idx}
                                    x={p.x}
                                    y={chartHeight - 10}
                                    textAnchor="middle"
                                    fill="var(--gray-400)"
                                    className="text-xs font-semibold select-none"
                                >
                                    {p.day}
                                </text>
                            ))}

                            {/* Y-Axis labels (min and max values) */}
                            <text x={10} y={paddingTop + 5} fill="var(--gray-400)" className="text-xs font-semibold select-none">
                                ${Math.round(maxVal)}
                            </text>
                            <text x={10} y={chartHeight - paddingBottom + 5} fill="var(--gray-400)" className="text-xs font-semibold select-none">
                                ${Math.round(minVal)}
                            </text>
                        </svg>

                        {/* Interactive Tooltip Card Overlay */}
                        <AnimatePresence>
                            {hoveredChartIndex !== null && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute bg-gray-900/90 dark:bg-black/90 text-white p-3 rounded-xl border border-gray-800 shadow-xl pointer-events-none text-xs space-y-1 z-10"
                                    style={{
                                        left: `${points[hoveredChartIndex].x - 60}px`,
                                        top: `${points[hoveredChartIndex].y - 80}px`
                                    }}
                                >
                                    <div className="font-bold border-b border-gray-800 pb-1 flex justify-between gap-4">
                                        <span>{points[hoveredChartIndex].day} Analytics</span>
                                    </div>
                                    <div className="flex justify-between gap-4 text-gray-300">
                                        <span>Revenue:</span>
                                        <span className="font-bold text-primary">${points[hoveredChartIndex].val}</span>
                                    </div>
                                    <div className="flex justify-between gap-4 text-gray-300">
                                        <span>Users Added:</span>
                                        <span className="font-bold text-info">{points[hoveredChartIndex].users}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Staggered recent activities feed */}
                <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Live Activity Feed</h4>
                        <span className="p-1 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-400">
                            <PiChartLineUpDuotone size={16} />
                        </span>
                    </div>

                    <div className="relative flex-1 space-y-4">
                        {/* Connecting vertical line */}
                        <div className="absolute left-4.5 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800 pointer-events-none" />

                        {recentActivities.map((act, index) => (
                            <motion.div
                                key={act.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4 relative"
                            >
                                <div className="relative">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 ${
                                        act.status === 'success' ? 'bg-success text-white' :
                                        act.status === 'warning' ? 'bg-warning text-white' : 'bg-primary text-white'
                                    }`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{act.title}</p>
                                    <p className="text-xs text-gray-400 truncate">{act.user}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{act.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions Panel & Component Demos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Quick actions box */}
                <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Quick Workspace Actions</h4>
                    <p className="text-xs text-gray-400 mb-6">Shortcut options to trigger alerts, test system updates or configure configurations</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => triggerNotification('System diagnostics triggered. Uptime checks: 100% OK.')}
                            className="p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-xl text-left transition duration-200 cursor-pointer shadow-xs"
                        >
                            <span className="text-primary text-xl"><PiCpuDuotone /></span>
                            <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">Trigger Diagnostics</h5>
                            <p className="text-[10px] text-gray-400 mt-0.5">Scan operational instances</p>
                        </button>
                        <button
                            onClick={() => triggerNotification('Alert notifications dispatched to subscriber queue.')}
                            className="p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-xl text-left transition duration-200 cursor-pointer shadow-xs"
                        >
                            <span className="text-warning text-xl"><PiBellDuotone /></span>
                            <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">Simulate Dispatch</h5>
                            <p className="text-[10px] text-gray-400 mt-0.5">Push notification streams</p>
                        </button>
                        <button
                            onClick={() => triggerNotification('API key rotation initiated. Secure tokens updated.')}
                            className="p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-xl text-left transition duration-200 cursor-pointer shadow-xs"
                        >
                            <span className="text-success text-xl"><PiGearDuotone /></span>
                            <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">Rotate Access Keys</h5>
                            <p className="text-[10px] text-gray-400 mt-0.5">Rotate crypt tokens</p>
                        </button>
                        <Link
                            to="/docs"
                            className="p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-xl text-left transition duration-200 cursor-pointer shadow-xs block"
                        >
                            <span className="text-info text-xl"><PiBookOpenDuotone /></span>
                            <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-2">View Components</h5>
                            <p className="text-[10px] text-gray-400 mt-0.5">Explore standard foundation blocks</p>
                        </Link>
                    </div>
                </div>

                {/* Tech Stack overview */}
                <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Platform Infrastructure</h4>
                        <p className="text-xs text-gray-400 mb-4">Underlying stack configurations powering this clean template.</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-800">
                                <span className="font-semibold text-gray-500">Core Architecture</span>
                                <span className="px-2 py-0.5 bg-primary-subtle text-primary font-bold rounded-xs">React 19 + TypeScript</span>
                            </div>
                            <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-800">
                                <span className="font-semibold text-gray-500">Layout & Styles</span>
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold rounded-xs">TailwindCSS v4.0</span>
                            </div>
                            <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-800">
                                <span className="font-semibold text-gray-500">Transition Engine</span>
                                <span className="px-2 py-0.5 bg-info-subtle text-info font-bold rounded-xs">Framer Motion 11</span>
                            </div>
                            <div className="flex items-center justify-between text-xs py-1.5">
                                <span className="font-semibold text-gray-500">State Management</span>
                                <span className="px-2 py-0.5 bg-warning-subtle text-warning font-bold rounded-xs">Zustand 5</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                        <span className="text-gray-400">Version 1.2.0 (Stable release)</span>
                        <Link to="/docs" className="text-primary hover:underline font-bold flex items-center gap-1">
                            System Architecture <PiArrowRightDuotone />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
