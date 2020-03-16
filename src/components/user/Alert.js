import React from 'react'

const Alert = ({alert}) => {
    return (
        alert !== null && (
           <div className={`alert alert-type-${alert.type}`}>
               <span>{alert.message}</span>
           </div>
        )
    )
};
export default Alert
