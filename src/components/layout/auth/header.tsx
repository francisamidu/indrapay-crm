interface AuthHeaderProps {
  title?: string
  subtitle?: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-2 mb-8">
      <div className="h-12 w-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-xl">
        S
      </div>
      {title && <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>}
      {subtitle && <p className="text-slate-500 text-sm max-w-xs mx-auto">{subtitle}</p>}
    </div>
  )
}
