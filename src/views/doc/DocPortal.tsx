import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    PiMagnifyingGlass,
    PiCopyDuotone,
    PiCheckDuotone,
    PiBookOpenDuotone,
    PiTerminalDuotone,
    PiSparkleDuotone,
    PiArrowLeftBold
} from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { docContent, DocSection } from './DocContent'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

const DocPortal = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedId, setSelectedId] = useState('overview')
    const [copiedText, setCopiedText] = useState(false)

    // Interactive Component Playground states
    const [btnVariant, setBtnVariant] = useState<'solid' | 'plain' | 'default'>('solid')
    const [btnColor, setBtnColor] = useState<string>('primary')
    const [btnLoading, setBtnLoading] = useState(false)

    const [alertType, setAlertType] = useState<'success' | 'danger' | 'info' | 'warning'>('success')
    const [alertWithIcon, setAlertWithIcon] = useState(true)
    const [alertClosable, setAlertClosable] = useState(false)

    const filteredDocs = useMemo(() => {
        return docContent.filter(doc => {
            const matchSearch =
                doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.content.toLowerCase().includes(searchQuery.toLowerCase())
            return matchSearch
        })
    }, [searchQuery])

    const selectedDoc = useMemo(() => {
        return docContent.find(doc => doc.id === selectedId) || docContent[0]
    }, [selectedId])

    const categories = useMemo(() => {
        const cats: Record<string, DocSection[]> = {}
        docContent.forEach(doc => {
            if (!cats[doc.category]) {
                cats[doc.category] = []
            }
            cats[doc.category].push(doc)
        })
        return cats
    }, [])

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedText(true)
        setTimeout(() => setCopiedText(false), 2000)
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
            {/* Header Portal Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        Documentation Portal <span className="text-info text-xl"><PiBookOpenDuotone /></span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Explore architecture details, customization guidelines, and live interactive UI component play playgrounds.
                    </p>
                </div>
                <div>
                    <Link
                        to="/home"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-250 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition duration-200 shadow-xs border border-gray-200 dark:border-gray-800 cursor-pointer"
                    >
                        <PiArrowLeftBold size={16} />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </div>

            {/* Content Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Side Sidebar - Navigation and search */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Search box */}
                    <div className="relative">
                        <PiMagnifyingGlass className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search docs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-200 shadow-xs"
                        />
                    </div>

                    {/* Navigation tree */}
                    <div className="space-y-4">
                        {Object.entries(categories).map(([category, items]) => {
                            // Filter items if search is active
                            const filteredItems = items.filter(item =>
                                filteredDocs.some(fd => fd.id === item.id)
                            )

                            if (filteredItems.length === 0) return null

                            return (
                                <div key={category} className="space-y-1">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
                                        {category}
                                    </h5>
                                    <div className="space-y-0.5 mt-2">
                                        {filteredItems.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => setSelectedId(item.id)}
                                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer flex items-center justify-between ${
                                                    selectedId === item.id
                                                        ? 'bg-primary-subtle text-primary'
                                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                                                }`}
                                            >
                                                <span>{item.title}</span>
                                                {selectedId === item.id && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right Side Main Documentation Panel */}
                <div className="lg:col-span-3 space-y-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-xs">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedDoc.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Topic title & description */}
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary-subtle py-1 px-2.5 rounded-full">
                                    {selectedDoc.category}
                                </span>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
                                    {selectedDoc.title}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                    {selectedDoc.description}
                                </p>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800" />

                            {/* Markdown-like Content Parsing */}
                            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
                                {selectedDoc.content.split('\n\n').map((paragraph, idx) => {
                                    if (paragraph.startsWith('###')) {
                                        return (
                                            <h4 key={idx} className="text-md font-bold text-gray-900 dark:text-gray-100 mt-6 mb-2">
                                                {paragraph.replace('###', '').trim()}
                                            </h4>
                                        )
                                    }
                                    if (paragraph.startsWith('*')) {
                                        return (
                                            <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                                                {paragraph.split('\n').map((li, lIdx) => (
                                                    <li key={lIdx}>
                                                        {li.replace(/^\*\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                    return (
                                        <p key={idx} dangerouslySetInnerHTML={{
                                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\`(.*?)\`/g, '<code class="bg-gray-100 dark:bg-gray-950 px-1 py-0.5 rounded text-primary font-mono text-xs">$1</code>')
                                        }} />
                                    )
                                })}
                            </div>

                            {/* LIVE INTERACTIVE PLAYGROUND (Rendered only on components docs) */}
                            {selectedDoc.id.startsWith('component-') && (
                                <div className="mt-8 border border-gray-100 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-950 p-6 space-y-6">
                                    <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                                        <h4 className="text-sm font-bold text-gray-950 dark:text-gray-100 flex items-center gap-1.5">
                                            <PiSparkleDuotone className="text-primary animate-pulse" /> Live Component Playground
                                        </h4>
                                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Interactive Preview</span>
                                    </div>

                                    {/* Play Ground renders */}
                                    <div className="flex items-center justify-center min-h-[120px] bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-xs">
                                        {selectedDoc.id === 'component-button' && (
                                            <Button
                                                variant={btnVariant}
                                                color={btnColor}
                                                loading={btnLoading}
                                                onClick={() => {
                                                    setBtnLoading(true)
                                                    setTimeout(() => setBtnLoading(false), 1500)
                                                }}
                                            >
                                                {btnLoading ? 'Processing...' : 'Click Sandbox Button'}
                                            </Button>
                                        )}

                                        {selectedDoc.id === 'component-alert' && (
                                            <div className="w-full max-w-md">
                                                <Alert
                                                    type={alertType}
                                                    showIcon={alertWithIcon}
                                                    closable={alertClosable}
                                                    onClose={() => alert('Alert closed!')}
                                                    title={alertType.toUpperCase()}
                                                >
                                                    Live sandbox simulation of status messages.
                                                </Alert>
                                            </div>
                                        )}
                                    </div>

                                    {/* Playground Controls */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        {selectedDoc.id === 'component-button' && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Style Variant</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(['solid', 'plain', 'default'] as const).map(v => (
                                                            <button
                                                                key={v}
                                                                onClick={() => setBtnVariant(v)}
                                                                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                                                                    btnVariant === v
                                                                        ? 'bg-primary border-primary text-white'
                                                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                                                                }`}
                                                            >
                                                                {v}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Color Variant</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['primary', 'danger', 'info', 'success', 'warning'].map(c => (
                                                            <button
                                                                key={c}
                                                                onClick={() => setBtnColor(c)}
                                                                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                                                                    btnColor === c
                                                                        ? 'bg-primary border-primary text-white'
                                                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                                                                }`}
                                                            >
                                                                {c}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {selectedDoc.id === 'component-alert' && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Alert Type</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(['success', 'danger', 'info', 'warning'] as const).map(t => (
                                                            <button
                                                                key={t}
                                                                onClick={() => setAlertType(t)}
                                                                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                                                                    alertType === t
                                                                        ? 'bg-primary border-primary text-white'
                                                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                                                                }`}
                                                            >
                                                                {t}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Alert Toggles</label>
                                                    <div className="flex gap-4 items-center">
                                                        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-gray-600 dark:text-gray-400">
                                                            <input
                                                                type="checkbox"
                                                                checked={alertWithIcon}
                                                                onChange={(e) => setAlertWithIcon(e.target.checked)}
                                                            />
                                                            Show Icon
                                                        </label>
                                                        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-gray-600 dark:text-gray-400">
                                                            <input
                                                                type="checkbox"
                                                                checked={alertClosable}
                                                                onChange={(e) => setAlertClosable(e.target.checked)}
                                                            />
                                                            Closable (X)
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Fenced Code Example Viewer */}
                            {selectedDoc.codeSample && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
                                        <span className="flex items-center gap-1.5"><PiTerminalDuotone /> Code Snippet</span>
                                        <button
                                            onClick={() => handleCopy(selectedDoc.codeSample || '')}
                                            className="flex items-center gap-1 hover:text-primary transition duration-150 cursor-pointer font-bold uppercase tracking-wider"
                                        >
                                            {copiedText ? (
                                                <>
                                                    <PiCheckDuotone className="text-success" /> Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <PiCopyDuotone /> Copy Code
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <pre className="bg-gray-950 text-gray-200 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 leading-relaxed shadow-sm">
                                        <code>{selectedDoc.codeSample}</code>
                                    </pre>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default DocPortal
