import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MapService } from "src/app/services/map.service";
import { MapMarkerComponent, MapMarkerIconDirection } from "../map-marker/map-marker.component";

@Component({
  selector: "pd-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  standalone: false,
})
export class MapComponent implements OnInit, AfterViewInit, AfterContentInit {
  private map: any;

  private markers: any[] = [];
  private markerLayer: any;

  @Input() center: [number, number] = [14.4378, 50.0755]; // coords for Prague center

  @Input() autoCenter: boolean = false;
  @Input() poi: boolean = true;

  @ViewChild("map") mapEl!: ElementRef<HTMLDivElement>;

  @ContentChildren(MapMarkerComponent) markerEls!: QueryList<MapMarkerComponent>;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = this.createMap();
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
    m.addLayer(this.markerLayer).enable();
    this.markerLayer.enable();

    // POI
    if (this.poi) {
      var poiLayer = new SMap.Layer.Marker(undefined, {
        poiTooltip: true,
      });
      m.addLayer(poiLayer).enable();

      var dataProvider = m.createDefaultDataProvider();
      dataProvider.setOwner(m);
      dataProvider.addLayer(poiLayer);
      dataProvider.setMapSet(SMap.MAPSET_BASE);
      dataProvider.enable();
    }

    return m;
  }

  async setMarkers() {
    const m = await this.map;
    const SMap = await this.mapService.SMap;

    this.markers = [];

    this.markerLayer.removeAll();

    this.markerEls.forEach((markerEl) => {
      const pos = SMap.Coords.fromWGS84(...markerEl.coords);

      const options: any = {};

      if (markerEl.icon) {
        options.url = this.createIconEl(markerEl.icon, markerEl.iconDirection, markerEl.bearing);
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

  async updateAutoCenter() {
    const m = await this.map;

    if (this.markers.length > 1) {
      const markerPositions = this.markers.map((marker) => marker._coords);
      let [center, zoom] = m.computeCenterZoom(markerPositions);
      m.setCenterZoom(center, zoom, false);
    }

    if (this.markers.length === 1) {
      const center = this.markers[0]._coords;
      m.setCenterZoom(center, 16, false);
    }
  }

  async updateMarker(marker: any, markerEl: MapMarkerComponent, changes: SimpleChanges) {
    const SMap = await this.mapService.SMap;

    if (changes["coords"]) {
      const pos = SMap.Coords.fromWGS84(...markerEl.coords);
      if (!marker.getCoords().equals(pos)) {
        marker.setCoords(pos);
        this.updateAutoCenter();
      }
    }

    if (changes["bearing"] && markerEl.bearing && markerEl.iconDirection) {
      const el: HTMLDivElement = marker.getContainer()[3];
      const iconEl = el.querySelector("div")!;

      iconEl.style["transform"] = this.getBearingTransform(markerEl.bearing, markerEl.iconDirection);
    }
  }

  private createIconEl(icon: string, icon_direction?: MapMarkerIconDirection, bearing?: number | null) {
    const containerEl = document.createElement("div");
    containerEl.classList.add("marker-icon");
    const iconEl = document.createElement("div");
    iconEl.innerText = icon;

    if (typeof bearing === "number" && icon_direction !== undefined) {
      iconEl.style["transform"] = this.getBearingTransform(bearing, icon_direction);
    }

    containerEl.appendChild(iconEl);
    return containerEl;
  }

  private getBearingTransform(bearing: number, icon_direction: MapMarkerIconDirection) {
    let flip: boolean = false;

    if (icon_direction === "left") {
      if (bearing < 180) flip = true;
      icon_direction = 270;
    }

    if (icon_direction === "right") {
      if (bearing > 180 && bearing < 360) flip = true;
      icon_direction = 90;
    }

    const transformDeg = bearing - icon_direction;
    const rotate = `rotate(${transformDeg}deg)`;

    return rotate + (flip ? " scaleY(-1)" : "");
  }
}
