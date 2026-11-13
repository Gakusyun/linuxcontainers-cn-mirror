import { useState, useRef } from 'preact/hooks'

const SOURCES = [
  {
    id: 'tuna',
    label: 'TUNA 镜像源',
    file: 'tuna-rootfs.json',
    host: 'mirrors.tuna.tsinghua.edu.cn',
    badge: '推荐',
  },
  {
    id: 'nju',
    label: 'NJU 镜像源',
    file: 'nju-rootfs.json',
    host: 'mirror.nju.edu.cn',
    badge: '备用',
  },
]

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      onClick={copy}
      class={`mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border text-[12.5px]
        font-medium transition-colors
        ${copied
          ? 'border-mint-500/50 bg-mint-500/10 text-mint-400'
          : 'border-ink-700 bg-ink-850 text-ink-200 hover:border-mint-500/50 hover:bg-ink-800 hover:text-white'}`}
    >
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          已复制
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </svg>
          复制链接
        </>
      )}
    </button>
  )
}

export default function App() {
  const origin = typeof location !== 'undefined' && location.origin.startsWith('http')
    ? location.origin
    : 'https://example.com'
  const active = (origin + import.meta.env.BASE_URL).replace(/\/+$/, '')

  return (
    <div class="relative min-h-screen">
      <div class="pointer-events-none absolute inset-x-0 top-0 h-[380px] grid-bg" />

      <div class="relative mx-auto flex min-h-screen max-w-[720px] flex-col justify-center px-4 py-14 sm:px-6">
        {/* header */}
        <div class="flex items-center gap-2.5">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-850 ring-1 ring-ink-700">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade9f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="6" rx="1.5" />
              <rect x="3" y="14" width="18" height="6" rx="1.5" />
              <path d="M7 7h.01M7 17h.01" />
            </svg>
          </span>
          <div>
            <h1 class="text-[19px] font-semibold tracking-tight text-white">适用于 Droidspaces 的 linuxcontainers rootfs.json</h1>
          </div>
        </div>

        {/* the two copy cards */}
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          {SOURCES.map((s) => {
            const url = `${active}/${s.file}`
            return (
              <div class="flex flex-col rounded-xl border border-ink-800 bg-ink-900/60 p-4">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[13px] font-medium text-white">{s.label}</span>
                  <span class={`rounded px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-inset
                    ${s.id === 'tuna'
                      ? 'bg-mint-500/10 text-mint-400 ring-mint-500/25'
                      : 'bg-ink-800 text-ink-400 ring-ink-600/50'}`}>
                    {s.badge}
                  </span>
                </div>

                <p class="mt-1 font-mono text-[11px] text-ink-500">{s.host}</p>

                <code class="mt-3 block break-all rounded-lg border border-ink-700 bg-ink-950 px-2.5 py-2
                             font-mono text-[11.5px] leading-[1.6] text-ink-200">
                  {url}
                </code>

                <CopyButton value={url} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}