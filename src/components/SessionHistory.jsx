import { useState } from 'react'
import { motion } from 'framer-motion'
import { buildIframeDoc } from './PreviewPanel'

// THUMBNAIL SCALING MATH
// Card container: 320px wide (w-80), 200px tall
// iframe rendered at: 800px wide, 500px tall
// Scale factor: 320 / 800 = 0.4
// Result: 800 * 0.4 = 320px ✓  500 * 0.4 = 200px ✓
const THUMB_W  = 320
const THUMB_H  = 200
const IFRAME_W = 800
const IFRAME_H = 500
const SCALE    = THUMB_W / IFRAME_W  // 0.4

function ThumbnailCard({ item, number, onRestore }) {
  const [loaded, setLoaded] = useState(false)

  // isThumb=true gives the iframe minimal padding and centered layout
  // so the component fills the thumbnail with less empty space
  const srcDoc = buildIframeDoc(item.code, true)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 w-80 bg-white rounded-2xl border border-zinc-200
                 shadow-sm overflow-hidden cursor-pointer group
                 hover:border-zinc-400 hover:shadow-lg transition-all duration-200"
      onClick={() => onRestore(item)}
    >

      {/* THUMBNAIL VIEWPORT */}
      <div className="relative overflow-hidden" style={{ height: `${THUMB_H}px` }}>

        {/* Shimmer shown while iframe is still loading */}
        {!loaded && (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg,#f0f0f0 25%,#e4e4e7 50%,#f0f0f0 75%)',
              backgroundSize: '400% 100%',
              animation: 'shimmer 1.5s infinite linear',
            }}
          />
        )}

        <iframe
          srcDoc={srcDoc}
          title={`Component ${number}`}
          sandbox="allow-scripts allow-same-origin"
          scrolling="no"
          onLoad={() => setLoaded(true)}
          style={{
            width:           `${IFRAME_W}px`,
            height:          `${IFRAME_H}px`,
            border:          'none',
            transform:       `scale(${SCALE})`,
            transformOrigin: 'top left',
            pointerEvents:   'none',
            opacity:         loaded ? 1 : 0,
            transition:      'opacity 0.4s ease',
          }}
        />

        {/* Number badge so components are visually distinguishable */}
        <div
          className="absolute top-2 left-2 w-6 h-6 rounded-full z-10
                     flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.55)' }}
        >
          <span className="text-white text-xs font-semibold">{number}</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center
                        bg-zinc-900/0 group-hover:bg-zinc-900/50
                        transition-all duration-200">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-200
                           text-white text-xs font-semibold px-4 py-2
                           bg-zinc-900 rounded-xl">
            Restore →
          </span>
        </div>

      </div>

      {/* CARD FOOTER */}
      <div className="px-4 py-3 border-t border-zinc-100">
        <p className="text-xs text-zinc-700 font-medium truncate leading-relaxed">
          {item.prompt}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-zinc-400">{item.timestamp}</p>
          <span className="text-xs text-zinc-300">#{number}</span>
        </div>
      </div>

    </motion.div>
  )
}

function SessionHistory({ history, onRestore }) {
  if (history.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-8 pb-12"
    >

      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-sm font-medium text-zinc-700">This Session</h2>
        <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
          {history.length} {history.length === 1 ? 'component' : 'components'}
        </span>
        <span className="text-xs text-zinc-400">· Click any to restore</span>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {history.map((item, index) => (
          <ThumbnailCard
            key={item.id}
            item={item}
            number={history.length - index}
            onRestore={onRestore}
          />
        ))}
      </div>

    </motion.div>
  )
}

export default SessionHistory