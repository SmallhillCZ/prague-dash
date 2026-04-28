import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import * as L from "leaflet";
import { MapService } from "src/app/services/map.service";
import { MapMarkerComponent, MapMarkerIconDirection } from "../map-marker/map-marker.component";

@Component({
  selector: "pd-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  private map!: L.Map;
  private markerLayer!: L.LayerGroup;
  private leafletMarkers: L.Marker[] = [];
  private resizeObserver?: ResizeObserver;

  @Input() center: [number, number] = [14.4378, 50.0755]; // [lng, lat] Prague center
  @Input() autoCenter: boolean = false;
  @Input() poi: boolean = true;

  @ViewChild("map") mapEl!: ElementRef<HTMLDivElement>;
  @ContentChildren(MapMarkerComponent) markerEls!: QueryList<MapMarkerComponent>;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createMap();
  }

  ngAfterContentInit(): void {
    this.markerEls.changes.subscribe(() => this.setMarkers());
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.map) {
      this.map.remove();
    }
  }

  private async createMap(): Promise<void> {
    // Leaflet expects [lat, lng]; our center input is [lng, lat]
    const [lng, lat] = this.center;
    this.map = L.map(this.mapEl.nativeElement, {
      center: [lat, lng],
      zoom: 16,
    });

    const tileLayer = await this.mapService.createTileLayer();
    tileLayer.addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);

    // The map host often has 0×0 size during ngAfterViewInit when it lives
    // inside an Ionic flex layout. We have to wait for the container to be
    // measured, then invalidate Leaflet's cached size and re-apply the view —
    // otherwise the map either stays blank or shows a zoomed-out world view.
    requestAnimationFrame(() => {
      this.map.invalidateSize();
      this.map.setView([lat, lng], 16);
      this.setMarkers();
    });

    // Keep the map sized correctly when the surrounding layout changes.
    this.resizeObserver = new ResizeObserver(() => this.map.invalidateSize());
    this.resizeObserver.observe(this.mapEl.nativeElement);
  }

  async setMarkers(): Promise<void> {
    this.leafletMarkers = [];
    this.markerLayer.clearLayers();

    this.markerEls.forEach((markerEl) => {
      const [mLng, mLat] = markerEl.coords;
      const marker = this.createLeafletMarker(markerEl, mLat, mLng);
      marker.addTo(this.markerLayer);
      this.leafletMarkers.push(marker);

      markerEl.changes.subscribe((changes) => this.updateMarker(marker, markerEl, changes));
    });

    if (this.autoCenter) this.updateAutoCenter();
  }

  private createLeafletMarker(markerEl: MapMarkerComponent, lat: number, lng: number): L.Marker {
    const options: L.MarkerOptions = {};

    if (markerEl.icon) {
      const iconEl = this.createIconEl(markerEl.icon, markerEl.iconDirection, markerEl.bearing);
      options.icon = L.divIcon({
        html: iconEl,
        className: "marker-icon",
        iconSize: [36, 36],
        iconAnchor: [18, 27],
      });
    }

    return L.marker([lat, lng], options);
  }

  private updateAutoCenter(): void {
    if (this.leafletMarkers.length === 0) return;

    if (this.leafletMarkers.length === 1) {
      this.map.setView(this.leafletMarkers[0].getLatLng(), 16);
      return;
    }

    const group = L.featureGroup(this.leafletMarkers);
    this.map.fitBounds(group.getBounds());
  }

  private updateMarker(marker: L.Marker, markerEl: MapMarkerComponent, changes: SimpleChanges): void {
    if (changes["coords"]) {
      const [mLng, mLat] = markerEl.coords;
      const newLatLng = L.latLng(mLat, mLng);
      if (!marker.getLatLng().equals(newLatLng)) {
        marker.setLatLng(newLatLng);
        if (this.autoCenter) this.updateAutoCenter();
      }
    }

    if (changes["bearing"] && markerEl.bearing != null && markerEl.iconDirection !== undefined && markerEl.icon) {
      const iconEl = this.createIconEl(markerEl.icon, markerEl.iconDirection, markerEl.bearing);
      marker.setIcon(
        L.divIcon({
          html: iconEl,
          className: "marker-icon",
          iconSize: [36, 36],
          iconAnchor: [18, 27],
        }),
      );
    }
  }

  private createIconEl(icon: string, icon_direction?: MapMarkerIconDirection, bearing?: number | null): HTMLElement {
    const containerEl = document.createElement("div");
    const iconEl = document.createElement("div");
    iconEl.innerText = icon;

    if (typeof bearing === "number" && icon_direction !== undefined) {
      iconEl.style.transform = this.getBearingTransform(bearing, icon_direction);
    }

    containerEl.appendChild(iconEl);
    return containerEl;
  }

  private getBearingTransform(bearing: number, icon_direction: MapMarkerIconDirection): string {
    let flip = false;

    if (icon_direction === "left") {
      if (bearing < 180) flip = true;
      icon_direction = 270;
    }

    if (icon_direction === "right") {
      if (bearing > 180 && bearing < 360) flip = true;
      icon_direction = 90;
    }

    const transformDeg = bearing - (icon_direction as number);
    const rotate = `rotate(${transformDeg}deg)`;
    return rotate + (flip ? " scaleY(-1)" : "");
  }
}
