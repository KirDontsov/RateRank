'use client';

import { $category, $city, $firms, $firmsForMap, $firmsPage, Firm } from '@/api';
import { transliterate } from '@/shared';
import { useUnit } from 'effector-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, MouseEvent, memo, useRef, useState } from 'react';
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  MapboxGeoJSONFeature,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import styles from './map.module.scss';

export interface MarkersComponentProps {
  items: MapboxGeoJSONFeature[] | null;
  zoomToSelectedLoc: (e: MouseEvent<HTMLButtonElement>, item: MapboxGeoJSONFeature) => void;
}

/** Работаем с гео-json и itemsInViewPort иначе тормозит */
const MarkersComponent: FC<MarkersComponentProps> = ({ zoomToSelectedLoc, items }) => {
  const markerRef = useRef<mapboxgl.Marker>(null);

  return (
    <>
      {!!items?.length &&
        items?.map((item, index) => {
          return (
            <Marker
              ref={markerRef}
              key={index}
              longitude={Number(item?.properties?.longitude ?? 0)}
              latitude={Number(item?.properties?.latitude ?? 0)}
              pitchAlignment="viewport"
            >
              <button type="button" className="cursor-pointer" onClick={(e) => zoomToSelectedLoc(e, item)}>
                <div className={styles.marker} />
              </button>
            </Marker>
          );
        })}
    </>
  );
};

export const Markers = memo(MarkersComponent);

export const FirmsMap = () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const searchParams = useSearchParams();
  const [selectedMarker, setSelectedMarker] = useState<MapboxGeoJSONFeature | null>(null);
  const [itemsInViewPort, setItemsInViewPort] = useState<MapboxGeoJSONFeature[] | null>(null);
  const mapRef = useRef<MapRef>(null);

  const { firms, city, category, page } = useUnit({
    firms: $firmsForMap,
    city: $city,
    category: $category,
    page: $firmsPage,
  });

  const zoomToSelectedLoc = (e: MouseEvent<HTMLButtonElement>, item: MapboxGeoJSONFeature) => {
    e.stopPropagation();

    setSelectedMarker(item);
    mapRef.current?.flyTo({ center: [item?.properties?.longitude ?? 0, item?.properties?.latitude ?? 0], zoom: 17 });
  };

  const initialCoords = city?.coords?.split(', ');

  return (
    <div className={styles.mainStyle}>
      {!!firms?.length && (
        <Map
          ref={mapRef}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/kirdontsov/ck6cbhtnf27vu1inwoo33gdcx"
          // @ts-ignore
          className={styles.mapStyle}
          style={{ width: '100%', height: '100svh' }}
          initialViewState={{
            longitude: Number(initialCoords?.[0] ?? 0),
            latitude: Number(initialCoords?.[1] ?? 0),
            zoom: 10,
          }}
          maxZoom={20}
          minZoom={3}
          pitch={45}
          bearing={-18}
          onMove={() => {
            const featuresInViewport: MapboxGeoJSONFeature[] | null =
              // @ts-ignore
              mapRef?.current?.getMap().queryRenderedFeatures({ layers: ['car-services-msk'] }) ?? null;
            if ((featuresInViewport?.length ?? 0) < 300) {
              setItemsInViewPort(featuresInViewport || null);
            }
          }}
        >
          <Markers items={itemsInViewPort} zoomToSelectedLoc={zoomToSelectedLoc} />

          {selectedMarker ? (
            <Popup
              latitude={Number(selectedMarker?.properties?.latitude ?? 0)}
              longitude={Number(selectedMarker?.properties?.longitude ?? 0)}
              onClose={() => {
                setSelectedMarker(null);
              }}
              closeButton={true}
              closeOnClick={true}
              className={`${styles.popupMain} text-gray-900 dark:text-white`}
              anchor="bottom-left"
            >
              <h3 className={styles.popupTitle}>{selectedMarker?.properties?.name}</h3>
              <div className={`${styles.popupInfo} text-gray-900 dark:text-white dark:bg-gray-800`}>
                <label className={`${styles.popupLabel} text-blue-400 dark:text-blue-400`}>Адрес: </label>
                <p>{selectedMarker?.properties?.address}</p>
                <br />

                <Link
                  href={`/${city?.abbreviation}/${category?.abbreviation}/${selectedMarker?.properties?.url || transliterate(selectedMarker?.properties?.name ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
                  // target={selectedMarker?.firm?.url === '' ? null : '_blank'}
                  className={styles.popupWebUrl}
                >
                  Подробнее
                </Link>
              </div>
            </Popup>
          ) : null}

          <GeolocateControl position="top-left" style={{ marginTop: '154%' }} />
          <NavigationControl position="top-left" />
          <FullscreenControl position="bottom-right" />
        </Map>
      )}
    </div>
  );
};
