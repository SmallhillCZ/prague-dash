import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Geolocation } from "@capacitor/geolocation";
import { MapService } from "src/app/services/map.service";
import { MapMarkerComponent } from "../map-marker/map-marker.component";

@Component({
  selector: "pd-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit, AfterContentInit {
  map: any;

  markers: any[] = [];
  markerLayer: any;

  @Input() center!: [number, number];

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

  async createMap() {
    const SMap = await this.mapService.SMap;

    const zoom = 16;
    const center = SMap.Coords.fromWGS84(...this.center);

    const m = new SMap(this.mapEl.nativeElement, center, zoom);
    m.addDefaultLayer(SMap.DEF_BASE).enable();

    var sync = new SMap.Control.Sync();
    m.addControl(sync);

    var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
    m.addControl(mouse);

    this.markerLayer = new SMap.Layer.Marker();
    m.addLayer(this.markerLayer);
    this.markerLayer.enable();

    this.setMarkers();

    // POI
    var layer = new SMap.Layer.Marker(undefined, {
      poiTooltip: true,
    });
    m.addLayer(layer).enable();

    var dataProvider = m.createDefaultDataProvider();
    dataProvider.setOwner(m);
    dataProvider.addLayer(layer);
    dataProvider.setMapSet(SMap.MAPSET_BASE);
    dataProvider.enable();

    this.map = m;
  }

  async setMarkers() {
    const SMap = await this.mapService.SMap;

    this.markers = [];

    this.markerEls.forEach((markerEl) => {
      const pos = SMap.Coords.fromWGS84(...markerEl.coords);

      const options: any = {};

      if (markerEl.icon) {
        options.url = this.createIconEl(markerEl.icon, markerEl.bearing);
      }

      var marker = new SMap.Marker(pos, false, options);
      this.markerLayer.addMarker(marker);

      this.markers.push(marker);

      markerEl.changes.subscribe((changes) => this.updateMarker(marker, markerEl, changes));

      // if (markerEl.pointer) {
      //   var pointer = new SMap.Control.Pointer();
      //   pointer.addListener("pointer-click", () => this.updateAutoCenter(), pointer);
      //   this.map.addControl(pointer);
      //   pointer.setCoords(pos);
      //   pointer.redraw();
      // }
    });

    if (this.autoCenter) this.updateAutoCenter();
  }

  updateAutoCenter() {
    const markerPositions = this.markers.map((marker) => marker._coords);
    let centerZoom = this.map.computeCenterZoom(markerPositions);
    this.map.setCenterZoom(...centerZoom);
  }

  async updateMarker(marker: any, markerEl: MapMarkerComponent, changes: SimpleChanges) {
    const SMap = await this.mapService.SMap;

    if (changes["coords"] && !this.compareCoords(changes["coords"].currentValue, changes["coords"].previousValue)) {
      const pos = SMap.Coords.fromWGS84(...markerEl.coords);
      marker.setCoords(pos);
      this.updateAutoCenter();
    }

    if (changes["bearing"] && markerEl.bearing) {
      const el: HTMLDivElement = marker.getContainer()[3];
      const iconEl = el.querySelector("div")!;

      iconEl.style["transform"] = this.getBearingTransform(markerEl.bearing);
    }
  }

  private createIconEl(icon: string, bearing: number = 270) {
    const containerEl = document.createElement("div");
    containerEl.classList.add("marker-icon");
    const iconEl = document.createElement("div");
    iconEl.innerText = icon;

    iconEl.style["transform"] = this.getBearingTransform(bearing);
    containerEl.appendChild(iconEl);
    return containerEl;
  }

  private getBearingTransform(bearing: number) {
    let transformDeg = bearing - 270;
    let transformString = `rotate(${transformDeg}deg)`;

    if (transformDeg > 270 || transformDeg < -90) {
      transformString += ` scaleY(-1)`;
    }

    return transformString;
  }

  private compareCoords(a: [number, number], b: [number, number]) {
    return a[0] === b[0] && a[1] === b[1];
  }
}
