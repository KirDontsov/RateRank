'use client';

import { $category, $city, $firms, $firmsPage, Firm } from '@/api';
import { transliterate } from '@/shared';
import { useUnit } from 'effector-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MouseEvent, useRef, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import styles from './map.module.scss';

export const FirmsMap = () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const searchParams = useSearchParams();
  const [selectedMarker, setSelectedMarker] = useState<{ firm: Firm } | null>(null);
  const mapRef = useRef(null);

  const { firms, city, category, page } = useUnit({
    firms: $firms,
    city: $city,
    category: $category,
    page: $firmsPage,
  });

  const zoomToSelectedLoc = (e: MouseEvent<HTMLButtonElement>, firm: Firm) => {
    // stop event bubble-up which triggers unnecessary events
    e.stopPropagation();
    const coords = firm?.coords?.split(', ');

    setSelectedMarker({ firm });
    // @ts-ignore
    mapRef.current?.flyTo({ center: [coords?.[0] ?? 0, coords?.[1] ?? 0], zoom: 17 });
  };

  const initialCoords = city?.coords?.split(', ');

  return (
    <div className={styles.mainStyle}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/kirdontsov/ck6cbhtnf27vu1inwoo33gdcx"
        // @ts-ignore
        className={styles.mapStyle}
        style={{ width: '100%', height: '100vh' }}
        initialViewState={{
          longitude: Number(initialCoords?.[0] ?? 0),
          latitude: Number(initialCoords?.[1] ?? 0),
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={1}
        pitch={45}
        bearing={-17.6}
      >
        {firms?.map((firm, index) => {
          const coords = firm?.coords?.split(', ');

          return (
            <Marker key={index} longitude={Number(coords?.[0] ?? 0)} latitude={Number(coords?.[1] ?? 0)}>
              <button type="button" className="cursor-pointer" onClick={(e) => zoomToSelectedLoc(e, firm)}>
                <div className={styles.marker} />
              </button>
            </Marker>
          );
        })}

        {selectedMarker ? (
          <Popup
            latitude={Number(selectedMarker?.firm?.coords?.split(', ')[0] ?? 0)}
            longitude={Number(selectedMarker?.firm?.coords?.split(', ')[0] ?? 0)}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={true}
            closeOnClick={true}
            className={`${styles.popupMain} text-gray-900 dark:text-white`}
            anchor="bottom-left"
          >
            <h3 className={styles.popupTitle}>{selectedMarker?.firm?.name}</h3>
            <div className={`${styles.popupInfo} text-gray-900 dark:text-white dark:bg-gray-800`}>
              <label className={`${styles.popupLabel} text-blue-400 dark:text-blue-400`}>Адрес: </label>
              <p>{selectedMarker?.firm?.address}</p>
              <br />
              {selectedMarker?.firm?.default_phone && (
                <>
                  <label className={`${styles.popupLabel} text-blue-400 dark:text-blue-400`}>Тел: </label>
                  <p>{selectedMarker?.firm?.default_phone}</p>
                  <br />
                </>
              )}

              <Link
                href={`/${city?.abbreviation}/${category?.abbreviation}/${selectedMarker?.firm?.url || transliterate(selectedMarker?.firm?.name ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
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
    </div>
  );
};
