import React, { PureComponent }   from 'react'
import _                          from 'lodash'

import APP_CONFIG                 from '../../config'
import { DFContainer }            from '../../elements/library'

const mapLayer        = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + APP_CONFIG.LEAFLET_MBOX_TOKEN
const mapAttribution  = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

class MapComponent extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.showMap()
    this.addShopGraphics()
    this.addMarker()
  }

  getLatlon () {
    let latlon = this.props.latlon 

    if (!latlon) {
      return null
    }
    if (Object.prototype.toString.call(latlon) === '[object Array]') {
      return { lat: latlon[0], lon: latlon[1]}
    }

    return latlon
  }
  pinPoint(latlon, text = null, color = '#f03', fillColor = '#f03') {

    const marker = L.circle(latlon, {
      color: color ,
      fillColor: fillColor,
      fillOpacity: 0.5,
      radius: 50
    }).addTo(this.map)

    if (text) {
      L.popup()
        .setLatLng(latlon)
        .setContent(text)
        .openOn(this.map)
    }
    
    return marker
  }

  addShopGraphics () {
    const { LATLON }  = APP_CONFIG.SHOP

    var shopIcon = L.icon({
        iconUrl:      APP_CONFIG.SHOP.LOGO,  
        iconSize:     [24, 24], 
        iconAnchor:   [12, 12], 
        popupAnchor:  [0, 0] 
    });

    L.marker([LATLON.LAT, LATLON.LON], {icon: shopIcon}).addTo(this.map);
  }

  addMarker () {
    
    if (!this.map) {
      return
    }

    const latlon  = this.getLatlon()
    const text    = this.props.maptext || null

    if (!latlon) {
      // TODO errormsg
      return
    }

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker)
    }
    this.userMarker = this.pinPoint([latlon.lat, latlon.lon], text, '#03f')
  }

  addGenericMarker (latlon) {

    if (!this.props.editable) {
      return 
    }

    if (!this.map || !latlon) {
      return
    }

    if (this.genericMarker) {
      this.map.removeLayer(this.genericMarker)
    }
    
    const text = this.props.maptext || null

    this.genericMarker = this.pinPoint(latlon, text, '#30f')
  }


  showMap () {
    const { LATLON }  = APP_CONFIG.SHOP
    this.map          = L.map('map-container').setView([LATLON.LAT, LATLON.LON], 13)
 
    L.tileLayer(mapLayer, {
        attribution: mapAttribution,
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: APP_CONFIG.LEAFLET_MBOX_TOKEN
    }).addTo(this.map)

    this.map.on('click', (e) => {
      
      const {lat, lng} = e.latlng

      this.addGenericMarker({lat: lat, lon: lng})

      if (this.props.onSetLatlon) {
        this.props.onSetLatlon([lat, lng])
      }
    })
  }

  render () {    
    this.addMarker()

    return <DFContainer className="map-component">
      <DFContainer>
        <div id="map-container"></div>
      </DFContainer>
    </DFContainer>
  }
}

export default MapComponent