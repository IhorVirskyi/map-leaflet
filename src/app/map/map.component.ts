import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Draggable, icon, latLng, Map, MapOptions, marker, Polyline, tileLayer} from 'leaflet';
import "leaflet-arrowheads";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 1,
    center: latLng(0, 0)
  };

  public map: Map;

  public markerIcon = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.map = new Map('map', this.options).setView([50.4574, 30.5447], 12);
    const allMarkers = [];

    let polyline = new Polyline([], {color: "red"}).addTo(this.map);

    let newMarker = this.map.on("click", e => {
      console.log(e.latlng);

      // let data = [{
      //   // id: '',
      //   loc: [e.latlng.lat, e.latlng.lng],
      // }];

      marker([e.latlng.lat, e.latlng.lng], this.markerIcon).bindPopup('Info:').addTo(this.map);

      polyline.addLatLng(e.latlng).arrowheads(({ fill: true, color: 'red' }));
    });

    allMarkers.push(newMarker);
    console.log(allMarkers);
  }

}


