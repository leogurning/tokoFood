import { AfterRenderPhase, Component, ElementRef, OnChanges, ViewChild, afterNextRender, PLATFORM_ID, inject, Input } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { map, tileLayer, LatLng, LatLngExpression, Marker, marker, icon, LeafletMouseEvent } from 'leaflet';
import { Order } from '../../../shared/models/Order';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges {
  @Input()
  order!:Order;
  @Input()
  readonly = false;

  private readonly DEFAULT_LATLNG: L.LatLngTuple = [13.75, 21.62];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  @ViewChild('map', {static: true})
  mapRef!: ElementRef;

  map!: L.Map;
  currentMarker!: Marker;

  platformId = inject(PLATFORM_ID);
  private locationService = inject(LocationService);

  constructor() {
    /**
     * This afterNextRender is used to ensure that the leaflet only import
     * and load in the browser platform, not in SSR (server side render).
     * Otherwise, there will be error in SSR 'window not defined'
     * afterNextRender must be placed in the constructor
     */
    /** No need to use afterNextRender currently. The ssr has been disabled
     * in the angular.json  
    afterNextRender(()=> {
      import('leaflet').then((L) => {
        this.initializeMap(L);
      });
    },{phase: AfterRenderPhase.Read});
    */
  }
  
  ngOnChanges(): void {
    if (!this.order) return;

    /** This is the other way to check the browser platform, beside the afterNextRender */
    if (isPlatformBrowser(this.platformId)) {
      /** 
      import('leaflet').then((L) => {
        this.initializeMap(L);

        if (this.readonly && this.addressLatLng) {
          this.showLocationOnReadonlyMode();
        }
      }); 
      */ 
      this.initializeMap();

      if (this.readonly && this.addressLatLng) {
        this.showLocationOnReadonlyMode();
      } 
    } 
        
  }
  private initializeMap() {
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    
    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })

  }

  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);


    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng) {
    if(!latlng.lat.toFixed) return;
    
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
