import React from 'react'
import useSiteContent from '../hooks/useSiteContent' // Шлях до твого хуку

const ContentDisplay = ({ selectedTitle }) => {
  const contents = useSiteContent()

  // Знайдемо контент, який відповідає вибраному заголовку
  const content = contents.find((c) => c.title === selectedTitle)

  // Якщо контент не знайдено, виведемо повідомлення
  if (!content) {
    return <div>Content not found.</div>
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  )
}

// Використання компонента ContentDisplay, де 'deliveryInformation' - це заголовок,
// який ми передаємо як пропс selectedTitle, для відображення відповідного контенту

export default ContentDisplay
