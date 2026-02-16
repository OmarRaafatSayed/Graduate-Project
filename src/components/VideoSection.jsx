import './VideoSection.css'

export default function VideoSection() {
  return (
    <section id="video" className="video-section">
      <div className="video-container">
        <h2 className="section-title">شاهد المشربية</h2>
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Mashrabiya Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}
