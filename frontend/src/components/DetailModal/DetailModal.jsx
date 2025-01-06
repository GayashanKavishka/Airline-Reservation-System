// import React from 'react';

// const DetailModal = ({ isOpen, onClose, flightDetails, onChange, onSave }) => {
//   return (
//     <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h4 className="modal-title" style={{ color: '#079d49' }}>Edit Flight Information</h4>
//             <button type="button" className="close" onClick={onClose}>&times;</button>
//           </div>
//           <div className="modal-body">
//             {flightDetails && (
//               <div>
//                 <div className="form-group">
//                   <label>Flight Price</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     value={flightDetails.Flight_price} 
//                     onChange={(e) => onChange(e, 'Flight_price')} 
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Expected Arrival</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     value={flightDetails.Expected_arrival_date_time} 
//                     onChange={(e) => onChange(e, 'Expected_arrival_date_time')} 
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Departure Time</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     value={flightDetails.Departure_date_time} 
//                     onChange={(e) => onChange(e, 'Departure_date_time')} 
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-success" onClick={onSave}>Save</button>
//             <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailModal;
