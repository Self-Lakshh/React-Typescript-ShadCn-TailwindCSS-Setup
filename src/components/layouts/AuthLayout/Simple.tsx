import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import { Link } from 'react-router-dom'
import { PiBookOpenDuotone, PiArrowRightBold } from 'react-icons/pi'
import Logo from '@/components/template/Logo'

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Left side: Visual Panel (Visible on lg screens and up) */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-tr from-gray-900 via-gray-900 to-primary-deep text-white p-12 flex-col justify-between relative overflow-hidden select-none">
                {/* Decorative SVG background shapes */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary-deep/20 blur-3xl" />

                {/* Top header */}
                <div className="z-10">
                    <Logo type="full" className="text-white" />
                </div>

                {/* Middle feature visual */}
                <div className="z-10 max-w-lg space-y-6">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wide uppercase">
                        React 19 Boilerplate
                    </span>
                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight text-white">
                        Build beautiful, scalable SaaS dashboards in minutes.
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        A pre-configured template with collapsible layouts, session auth, reactive analytical dashboards, and searchable playgrounds.
                    </p>
                </div>

                {/* Bottom footer linking to docs */}
                <div className="z-10 flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-xs text-gray-500 font-semibold">Boilerplate v1.2.0</span>
                    <Link
                        to="/docs"
                        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-mild hover:underline transition duration-150"
                    >
                        <span>View Documentation</span>
                        <PiArrowRightBold />
                    </Link>
                </div>
            </div>

            {/* Right side: Login / Signup Form (Takes full width on mobile/tablet) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 relative">
                {/* Mobile Navigation Header */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between lg:hidden select-none">
                    <Logo type="streamline" />
                    <Link
                        to="/docs"
                        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                        <PiBookOpenDuotone size={16} />
                        <span>Docs</span>
                    </Link>
                </div>

                {/* Main Auth Card wrapper */}
                <div className="w-full max-w-[400px] mx-auto space-y-6">
                    {/* Floating Back to Docs Button for Desktop */}
                    <div className="hidden lg:block text-right">
                        <Link
                            to="/docs"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition duration-150 shadow-xs border border-gray-250/20"
                        >
                            <PiBookOpenDuotone />
                            <span>Explore Docs</span>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 p-8 rounded-2xl shadow-xs">
                        {content}
                        {children
                            ? cloneElement(children as ReactElement, {
                                  ...rest,
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Simple
