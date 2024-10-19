import React from 'react'
import useSiteSettings from '../hooks/useSiteSettings'

const PickupLocations = () => {
  const siteSetting = useSiteSettings()
  const locations = siteSetting.pickup_locations // Масив локацій

  return (
    <div>
      <strong className='p1'>Адреси пунктів самовивозу:</strong>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>{location.address}</li>
        ))}
      </ul>
    </div>
  )
}

export default PickupLocations
