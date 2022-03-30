import { boundingExtent } from 'ol/extent';
import TileGrid from 'ol/tilegrid/TileGrid';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from "ol/source"
import { MousePosition, defaults } from 'ol/control';
import { Projection, addCoordinateTransforms, transform } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';
import { View, Map, Feature } from 'ol';
import { Text, Style, Icon, Fill} from 'ol/style';
import { Point } from 'ol/geom';
class Unmined {
  map(mapId, options, regions) {
    const dpiScale = window.devicePixelRatio ?? 1.0

    const worldMinX = options.minRegionX * 512
    const worldMinY = options.minRegionZ * 512
    const worldWidth = (options.maxRegionX + 1 - options.minRegionX) * 512
    const worldHeight = (options.maxRegionZ + 1 - options.minRegionZ) * 512

    const worldTileSize = 256

    const worldMaxZoomFactor = Math.pow(2, options.maxZoom)

    // left, bottom, right, top, Y is negated
    const mapExtent = boundingExtent([
      [
        worldMinX * worldMaxZoomFactor,
        -(worldMinY + worldHeight) * worldMaxZoomFactor,
      ],
      [
        (worldMinX + worldWidth) * worldMaxZoomFactor,
        -worldMinY * worldMaxZoomFactor,
      ],
    ])

    const viewProjection = new Projection({
      code: "VIEW",
      units: "pixels",
    })

    const dataProjection = new Projection({
      code: "DATA",
      units: "pixels",
    })

    // Coordinate transformation between view and data
    // OpenLayers Y is positive up, world Y is positive down
    addCoordinateTransforms(
      viewProjection,
      dataProjection,
      function (coordinate) {
        return [coordinate[0], -coordinate[1]]
      },
      function (coordinate) {
        return [coordinate[0], -coordinate[1]]
      }
    )

    const mapZoomLevels = options.maxZoom - options.minZoom
    // Resolution for each OpenLayers zoom level
    const resolutions = new Array(mapZoomLevels + 1)
    for (let z = 0; z < mapZoomLevels + 1; ++z) {
      resolutions[mapZoomLevels - z] =
        (Math.pow(2, z) * dpiScale) / worldMaxZoomFactor
    }

    const tileGrid = new TileGrid({
      extent: mapExtent,
      origin: [0, 0],
      resolutions: resolutions,
      tileSize: worldTileSize / dpiScale,
    })

    const unminedLayer = new Tile({
      source: new XYZ({
        projection: viewProjection,
        tileGrid: tileGrid,
        tilePixelRatio: dpiScale,
        tileSize: worldTileSize / dpiScale,

        tileUrlFunction: function (coordinate) {
          const worldZoom = -(mapZoomLevels - coordinate[0]) + options.maxZoom
          const worldZoomFactor = Math.pow(2, worldZoom)

          const minTileX = Math.floor(
            (worldMinX * worldZoomFactor) / worldTileSize
          )
          const minTileY = Math.floor(
            (worldMinY * worldZoomFactor) / worldTileSize
          )
          const maxTileX =
            Math.ceil(
              ((worldMinX + worldWidth) * worldZoomFactor) / worldTileSize
            ) - 1
          const maxTileY =
            Math.ceil(
              ((worldMinY + worldHeight) * worldZoomFactor) / worldTileSize
            ) - 1

          const tileX = coordinate[1]
          const tileY = coordinate[2]

          const tileBlockSize = worldTileSize / worldZoomFactor
          const tileBlockPoint = {
            x: tileX * tileBlockSize,
            z: tileY * tileBlockSize,
          }

          const hasTile = function () {
            const tileRegionPoint = {
              x: Math.floor(tileBlockPoint.x / 512),
              z: Math.floor(tileBlockPoint.z / 512),
            }
            const tileRegionSize = Math.ceil(tileBlockSize / 512)

            for (
              let x = tileRegionPoint.x;
              x < tileRegionPoint.x + tileRegionSize;
              x++
            ) {
              for (
                let z = tileRegionPoint.z;
                z < tileRegionPoint.z + tileRegionSize;
                z++
              ) {
                const group = {
                  x: Math.floor(x / 32),
                  z: Math.floor(z / 32),
                }
                const regionMap = regions.find(
                  (e) => e.x === group.x && e.z === group.z
                )
                if (regionMap) {
                  const relX = x - group.x * 32
                  const relZ = z - group.z * 32
                  const inx = relZ * 32 + relX
                  const b = regionMap.m[Math.floor(inx / 32)]
                  const bit = inx % 32
                  const found = (b & (1 << bit)) !== 0
                  if (found) return true
                }
              }
            }
            return false
          }

          if (
            tileX >= minTileX &&
            tileY >= minTileY &&
            tileX <= maxTileX &&
            tileY <= maxTileY &&
            hasTile()
          ) {
            const url = (
              "/minecraft/tiles/zoom.{z}/{xd}/{yd}/tile.{x}.{y}." + options.imageFormat
            )
              .replace("{z}", worldZoom)
              .replace("{yd}", Math.floor(tileY / 10))
              .replace("{xd}", Math.floor(tileX / 10))
              .replace("{y}", tileY)
              .replace("{x}", tileX)
            return url
          } else return undefined
        },
      }),
    })

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(0),
      projection: dataProjection,
    })

    const map = new Map({
      target: mapId,
      controls: defaults().extend([mousePositionControl]),
      layers: [
        unminedLayer,
        /*
                new ol.layer.Tile({
                    source: new ol.source.TileDebug({
                        tileGrid: unminedTileGrid,
                        projection: viewProjection
                    })
                })
                */
      ],
      view: new View({
        center: [0, 0],
        extent: mapExtent,
        projection: viewProjection,
        resolutions: tileGrid.getResolutions(),
        maxZoom: mapZoomLevels,
        zoom: mapZoomLevels - options.maxZoom,
        constrainResolution: true,
        showFullExtent: true,
        constrainOnlyCenter: true,
      }),
    })

    if (options.markers) {
      const markersLayer = this.createMarkersLayer(
        options.markers,
        dataProjection,
        viewProjection
      )
      map.addLayer(markersLayer)
    }

    if (options.background) {
      document.getElementById(mapId).style.backgroundColor = options.background
    }

    this.openlayersMap = map
  }

  createMarkersLayer(markers, dataProjection, viewProjection) {
    const features = []

    for (let i = 0; i < markers.length; i++) {
      const item = markers[i]
      const longitude = item.x
      const latitude = item.z

      const feature = new Feature({
        geometry: new Point(
          transform(
            [longitude, latitude],
            dataProjection,
            viewProjection
          )
        ),
      })

      const style = new Style()
      if (item.image)
        style.setImage(
          new Icon({
            src: item.image,
            anchor: item.imageAnchor,
            scale: item.imageScale,
          })
        )

      if (item.text)
        style.setText(
          new Text({
            text: item.text,
            font: item.font,
            offsetX: item.offsetX,
            offsetY: item.offsetY,
            fill: new Fill({
              color: item.textColor,
            }),
          })
        )

      feature.setStyle(style)

      features.push(feature)
    }

    const vectorSource = new VectorSource({
      features: features,
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    })
    return vectorLayer
  }
}

export default Unmined;