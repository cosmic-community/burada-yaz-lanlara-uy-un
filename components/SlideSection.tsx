interface SlideSectionProps {
  icon: string
  title: string
  content: string
  accent: 'red' | 'blue' | 'green'
}

const ACCENTS: Record<string, { bar: string; bg: string; iconBg: string; text: string }> = {
  red: {
    bar: 'bg-rose-500',
    bg: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    text: 'text-rose-900',
  },
  blue: {
    bar: 'bg-brand-500',
    bg: 'bg-brand-50',
    iconBg: 'bg-brand-100',
    text: 'text-brand-900',
  },
  green: {
    bar: 'bg-emerald-500',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    text: 'text-emerald-900',
  },
}

export default function SlideSection({ icon, title, content, accent }: SlideSectionProps) {
  const styles = ACCENTS[accent] ?? ACCENTS.blue

  if (!content) return null

  return (
    <div className={`rounded-2xl ${styles.bg} overflow-hidden`}>
      <div className="flex">
        <div className={`w-1.5 ${styles.bar} flex-shrink-0`} />
        <div className="p-6 flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-9 h-9 rounded-lg ${styles.iconBg} flex items-center justify-center text-lg`}>
              {icon}
            </div>
            <h3 className={`font-semibold text-base ${styles.text}`}>{title}</h3>
          </div>
          <div className="prose prose-slate prose-sm max-w-none whitespace-pre-line text-slate-700 leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}