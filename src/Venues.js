import React from 'react';
import InsertNew from './InsertNew';
const Venues = ({venues, venueSelected, neighborhoods, types, typeSelected, handleSubmit, handleChange, venue}) => {
    return (
    <>
        <div id='venues-container'>
        <h1>SPOTS</h1>
            <div id='venue-flex'>
                {
                venues.map( venue => { 
                    return (
                            <div key={ venue.id } className='venue-info'>
                                <div>
                                    <a onClick={() => venueSelected(venue.id)}>
                                        { venue.name }
                                    </a>
                                </div>
                                <div>
                                <a onClick={() => venueSelected(venue.id)}> 
                                    <img src={ venue.imageUrl ? venue.imageUrl : './stock.png'}></img>
                                </a>
                                </div>
                
                                <div>[<a onClick={()=> typeSelected(venue.type.id)}>{venue.type.name}</a> in <a onClick={()=> handleSubmit(venue.neighborhood.id)}>{venue.neighborhood.name}</a>]</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        <div id='insert-new'>
        {
        <InsertNew venue={venue} handleChange={handleChange} handleSubmit={handleSubmit}/>
        }
        </div>
    </>
    );
}

export default Venues;