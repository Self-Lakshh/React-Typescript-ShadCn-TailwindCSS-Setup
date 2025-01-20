import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        className,
        style,
    } = props

    return (
        <div
            className={classNames('flex items-center gap-2 select-none', className)}
            style={style}
        >
            {/* SVG Brackets Code Logo Icon */}
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-primary to-primary-deep flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            </div>
            
            {type === 'full' && (
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-gray-100 text-sm tracking-tight leading-none">
                        React+TS+Shadcn
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 leading-none">
                        Template
                    </span>
                </div>
            )}
        </div>
    )
}

export default Logo
