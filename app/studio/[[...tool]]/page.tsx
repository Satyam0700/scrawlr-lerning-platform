import { ExternalLink, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Scrawlr Studio — Standalone Workspace',
  description: 'Sanity Studio runs as a standalone Vite workspace on localhost:3333.',
}

export default function StudioRedirectPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4">
      <div className="max-w-md w-full bg-neutral-800/80 border border-neutral-700/60 rounded-2xl p-8 text-center shadow-2xl backdrop-blur">
        <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
          <Sparkles className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2 font-display">
          Scrawlr Studio
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
          Scrawlr Studio is configured as a standalone workspace running with Vite for high performance, independent deploys, and automated TypeGen.
        </p>

        <a
          href="http://localhost:3333"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary-500 hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors shadow-lg shadow-primary-500/20"
        >
          <span>Open Standalone Studio (Port 3333)</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="mt-6 pt-5 border-t border-neutral-700/50 text-xs text-neutral-500 flex flex-col gap-1">
          <span>Run Studio dev server:</span>
          <code className="bg-neutral-950 px-2.5 py-1.5 rounded-lg text-neutral-300 font-mono text-[11px] select-all">
            npm run studio:dev
          </code>
        </div>
      </div>
    </div>
  )
}
