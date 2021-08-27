import React from 'react';
  
const InsertNew = ({neighborhoods, types, handleSubmit, handleChange, venue}) => {
return (
    <>
    <div id='insert-new-grid'>
    <h2>Add New Spot</h2>
        {
            <form onSubmit={handleSubmit}>
                <div className='fields'>
                    <label className='label'>Name</label>
                    <br></br>
                    <input type='string' name='name' value={venue.name} onChange={handleChange}/>
                </div>
                <div className='fields'>
                    <label className='label'>Website URL</label>
                    <br></br>
                    <input type='string' name='website' value={venue.website} onChange={handleChange}/>
                </div>
                <div className='fields'>
                    <label className='label'>Image URL</label>
                    <br></br>
                    <input type='string' name='imageUrl' value={venue.imageUrl} onChange={handleChange}/>
                </div>
                <br />
                <div id='dropdowns'>
                    <div id='neighborhoods'>
                        <label >
                            Neighborhood
                        </label>
                        <br></br>
                        <select name='neighborhoodId' value={venue.neighborhoodId} onChange={handleChange}>
                            {
                            neighborhoods.map( neighborhood => { 
                                return (
                                <option value={ neighborhood.id } key={ neighborhood.id } >
                                    {neighborhood.name}
                                </option>
                                );
                            })
                            }
                        </select>
                    </div>
                    <div id='types'>
                        <label>
                            Categories
                        </label>
                        <br></br>
                        <select name='typeId' value={venue.typeId} onChange={handleChange}>
                            {
                            types.map( type => { 
                                return (
                                <option value={ type.id } key={ type.id } >
                                    {type.name}
                                </option>
                                );
                            })
                            }
                        </select>
                    </div>
                <br />
                </div>
                <input className='submit' type='submit' value='Submit' ></input>
            </form>
        }
    </div>
    </>
);
}

export default InsertNew;


