import './StorySection.css'

export default function StorySection() {
  const stories = [
    {
      title: 'الأصل',
      text: 'المشربية فن معماري إسلامي عريق يعود لمئات السنين',
      icon: '🏛️'
    },
    {
      title: 'الوظيفة',
      text: 'تنظيم الضوء والهواء مع الحفاظ على الخصوصية',
      icon: '🌬️'
    },
    {
      title: 'الجمال',
      text: 'نقوش هندسية دقيقة تعكس براعة الحرفيين',
      icon: '✨'
    }
  ]

  return (
    <section id="story" className="story-section">
      <h2 className="section-title">قصة المشربية</h2>
      <div className="story-grid">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <div className="story-icon">{story.icon}</div>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
