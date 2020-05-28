import React from 'react';
import styled from 'styled-components'
import {YMaps, Map, Placemark,} from "react-yandex-maps";
import {useSelector} from "react-redux";
import {Store} from "../store";
import {Driver} from "../model/driver";

const YandexMap: React.FC<Props> = (
    {
        className,
        width,
        height,
        coordinates = [],
        clickOnMap,
        drivers = [],
    }
) => {
    const mapData = {
        center: [56.85609038397859, 53.20448],
        zoom: 13,
    };
    const clientCoordinates = useSelector((state: Store) => state.clientCoordinates.data);
    return (
        <Container className={className}>
            <YMaps>
                <Map
                    defaultState={mapData}
                    width={width}
                    height={height}
                    onClick={(event: any) => {
                        let coordinates = event.get('coords');
                        clickOnMap(coordinates)
                    }}
                >
                    <Placemark
                        options={{
                            preset: 'islands#yellowStretchyIcon'
                        }}
                        geometry={clientCoordinates} properties={{
                        iconContent: 'Ваше местоположение',
                    }}
                    />
                    {drivers.map((driver) => {
                        return (
                            <Placemark
                                key={driver.driver_phone}
                                geometry={[driver.lat, driver.lon]}
                                options={{
                                    preset: 'islands#darkBlueStretchyIcon',
                                }}
                                properties={{
                                    iconContent: `${driver.car_mark} ${driver.car_model}`
                                }}
                            />
                        );
                    })}
                </Map>
            </YMaps>
        </Container>
    );
};



export default YandexMap;

const Container = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 3px;
`;

type Props = {
    className?: string
    width?: number,
    height?: number,
    coordinates?: [],
    clickOnMap?: any,
    drivers?: Driver[],
}
