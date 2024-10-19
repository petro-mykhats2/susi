import React from 'react'
import useSiteSettings from '../hooks/useSiteSettings'

const PickupLocations = () => {
  const siteSetting = useSiteSettings()
  const locations = siteSetting.pickup_locations // Масив локацій

  return (
    <div>
      <span className='p1'>Адреси пунктів самовивозу:</span>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            <strong>{location.location_name}:</strong> {location.address}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PickupLocations
