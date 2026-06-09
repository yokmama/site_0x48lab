export default function Loading() {
  return (
    <div className="loading-screen" aria-label="読み込み中">
      <div className="loading-inner">
        <span className="loading-spinner" />
        <span className="loading-label">HackLab Inc.</span>
      </div>
    </div>
  )
}
