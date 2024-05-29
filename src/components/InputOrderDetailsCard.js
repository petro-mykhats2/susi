// import React from 'react'

// const InputOrderDetailsCard = ({ order, index }) => {
//   console.log('order', order)
//   return (
//     <div className='product-card'>
//       <div className='left-panel'>
//         <div className='left-panel-number'>{index + 1}</div>
//         {order.cartData && order.cartData.length > 0 && (
//           <tr className='order-details'>
//             <td colSpan='2'>
//               <strong>Замовлення:</strong>
//               <ul>
//                 {order.cartData.map((item) => (
//                   <li className='order-details-item' key={item.id}>
//                     {item.name || 'Невідомий продукт'} - Кількість:{' '}
//                     {item.quantity || '0'}
//                   </li>
//                 ))}
//               </ul>
//             </td>
//           </tr>
//         )}
//       </div>
//       <div className='right-panel'>
//         {/* <div className='address'>Адреса: Вулиця Приклад, 10</div> */}
//         <div className='delivery-block-time'>
//           {order.timeFormData.deliveryTimeOption === 'nearest'
//             ? `Отправка о ${order.timeFormData.selectedTime}`
//             : order.timeFormData.nextHour}
//         </div>

//         <div className='buttons'>
//           <button className='prepare'>Йду готувати</button>
//           <button className='done'>Приготовлено</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InputOrderDetailsCard
