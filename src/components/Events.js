import React from 'react';

export default function Events (props) {
 
        return (
            <div>
                <h1>Memory Marker</h1>
                {props.events.map( event => {
                    return  (
                        <div key={event.id} className="event">
                            <h3>{ event.name }</h3>
                            <p>{ event.date }</p>
                            <p>{event.memory }</p>
                        </div>
                    )
                })}
            </div>
        )
}
