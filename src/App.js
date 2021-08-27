import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Navbar from './Navbar';
import VenueView from './VenueView';
import NeighborhoodView from './NeighborhoodView';
import TypeView from './TypeView';
import Footer from './Footer';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      venues: [],
      selectedVenue: {},
      neighborhoods: [],
      selectedNeighborhood: {},
      notes: [],
      types: [],
      selectedType: {},
      view: null,
      venue: {
        name: '',
        imageUrl: '',
        website: '',
        neighborhoodId: '',
        typeId: ''
      }
    };

    this.venueSelected = this.venueSelected.bind(this);
    this.neighborhoodSelected = this.neighborhoodSelected.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.typeSelected = this.typeSelected.bind(this);
    this.addNote = this.addNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(){
    this.setState({
      venues: (await axios.get('/api/venues')).data,
      neighborhoods: (await axios.get('/api/neighborhoods')).data,
      types: (await axios.get('/api/types')).data,
      view: 'venues',
    });
  }
  async venueSelected (venueId){
    if (venueId !== ''){
      const venue = (await axios.get(`/api/venues/${venueId}`)).data;
      this.setState({
        selectedVenue: venue,
        notes: venue.notes,
        view: 'venues',
      });
    } else {
      this.setState({
        selectedVenue: venueId,
        view: 'venues',
      });
    }
  };
  async neighborhoodSelected (neighborhoodId){
    if (neighborhoodId !== ''){
      const neighborhood = (await axios.get(`/api/neighborhoods/${neighborhoodId}`)).data;
      this.setState({
        selectedNeighborhood: neighborhood,
        view: 'neighborhoods',
      });
    } else {
      this.setState({
        selectedNeighborhood: neighborhoodId,
        view: 'neighborhoods',
      });
    }
  };
  async typeSelected (typeId){
    if (typeId !== ''){
      const type = (await axios.get(`/api/types/${typeId}`)).data;
      this.setState({
        selectedType: type,
        view: 'types'
      });
    } else {
      this.setState({
        selectedType: typeId,
        view: 'types'
      });
    }
  }
  async deleteNote(noteId){
    const {notes} = this.state;
    try{
      await axios.delete(`/api/notes/${noteId}`);
      //const notes = this.state.notes.filter(i => i.id !== noteId);
      this.setState({
        notes: notes.filter(i => i.id !== noteId)
      });
    }
    catch(ex){
      console.log(ex)
    }
  }
  async addNote(venueId){
    const {notes} = this.state;
    try{
      await axios.post(`/api/venues/${venueId}/notes`);
      this.setState({
        notes: notes.push(note)
      });
    }
    catch(ex){
      console.log(ex)
    }
  }
  
  handleChange(event) {
    const value = event.target;
    const name = value.name;
    
    this.setState({
      venue: {...this.state.venue, [name]: value }
    });
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post('/api/venues',this.state.venue);
      const venues = [res.data, ...this.state.venues];
      this.setState({
        venues: venues,
        venue: {
          name: '',
          website: '',
          imageUrl: '',
          neighborhoodId: '',
          typeId: ''
        }
      });
    } catch (ex){

      console.log(ex);
    }
  }

  
  render(){
    const { venues, selectedVenue, neighborhoods, selectedNeighborhood, types, selectedType, view, venue } = this.state;
    const {venueSelected, neighborhoodSelected, typeSelected, deleteNote, handleChange, handleSubmit } = this;
    return (
      <div id='main-container'>
        <div id='header'>
              {
                <Header />
              }
        </div>
        <div id='navbar'>
        {
        <Navbar venueSelected={venueSelected} neighborhoodSelected={neighborhoodSelected} typeSelected={typeSelected}/>
        }
        </div>
          <>
            {
              view === 'venues' ? <VenueView 
                                  venue={venue}
                                  selectedVenue={selectedVenue} 
                                  deleteNote={deleteNote} 
                                  venues={venues} 
                                  venueSelected={venueSelected} 
                                  neighborhoods={neighborhoods} 
                                  types={types}
                                  neighborhoodSelected={neighborhoodSelected}
                                  typeSelected={typeSelected}
                                  handleChange={handleChange}
                                  handleSubmit={handleSubmit}
                                  /> 
                                  : view === 'neighborhoods' ? 
                                  <NeighborhoodView 
                                  neighborhoods={neighborhoods} 
                                  neighborhoodSelected={neighborhoodSelected} 
                                  selectedNeighborhood={selectedNeighborhood} 
                                  venueSelected={venueSelected} />
                                  :
                                  <TypeView
                                  types={types}
                                  typeSelected={typeSelected}
                                  selectedType={selectedType}
                                  venueSelected={venueSelected} />

            }
          </>
        <div id='footer'>
              {
                <Footer />
              }
        </div>
      </div>
    );
  }
}

export default App;

