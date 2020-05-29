import React, {useState} from 'react';
import styled from 'styled-components'
import YandexMap from "../components/yandexMap";
import 'antd/dist/antd.css';
import {Input} from 'antd';
import TaxiDrivers from "../components/taxiDrivers";
import {requestDrivers} from "../store/drivers";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../store";
import {requestClientCoordinates} from "../store/clientCoordinates";
import {requestActiveDriver} from "../store/activeDriver";
import {Driver} from "../services/drivers.service";
import geocodeService from "../services/geocode.service";

const OrderPage: React.FC = () => {
    const dispatch = useDispatch();
    const drivers = useSelector((state: Store) => state.drivers.data);
    const driversLoading = useSelector((state: Store) => state.drivers.loading);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const activeDriver = useSelector((state: Store) => state.activeDriver.data);
    const clientCoordinates: number[] = useSelector((state: Store) => state.clientCoordinates.data);
    const [addressClient, setAddressClient] = useState<AddressClient>({
        address: '',
        coordinates: clientCoordinates,
    });
    const handleSubmit = () => {
            console.log({
            source_time: Date.now(),
            addresses: [
                {
                    address: 'Ул.Ленина, дом 20',
                    lat: activeDriver.lat,
                    lon: activeDriver.lon,
                }
            ],
            crew_id: activeDriver.crew_id,
        })
    };
    const handleSearchButton = () => {
        dispatch(requestClientCoordinates(geocodeService.decode(addressClient.address)));
        dispatch(requestDrivers())
    };
    return (
        <Container>
            <Header>
                Детали заказа
            </Header>
            <Form>
                <InputTitle>
                    Откуда:
                </InputTitle>
                <SearchButtonWrap>
                    <AppInput
                        placeholder={'Улица, номер дома'}
                        value={addressClient.address}
                        onChange={(e) => {
                            setAddressClient({
                                ...addressClient,
                                address: e.target.value,
                            });
                        }}/>
                    <SearchButton onClick={(e) => {
                        e.preventDefault();
                        handleSearchButton()
                    }}>
                        Найти
                    </SearchButton>
                </SearchButtonWrap>
            </Form>
            <ContentWrap>
                <OrderYandexMap
                    clickOnMap={(coordinates: []) => {
                        dispatch(requestClientCoordinates(coordinates));
                        dispatch(requestDrivers());
                        dispatch(requestActiveDriver({} as Driver));
                        setAddressClient({
                            ...addressClient,
                            address: geocodeService.decode(clientCoordinates)
                        });
                        setIsDisabled(true);
                        console.log(geocodeService.decode(clientCoordinates))
                    }}
                    drivers={drivers}
                    width={545}
                    height={498}
                />
                <TaxiDrivers
                    setIsDisabled={(isDisabled) => setIsDisabled(isDisabled)}
                    loading={driversLoading}
                    drivers={drivers}/>
            </ContentWrap>
            <AppButtonWrap>
                <AppButton
                    disabled={isDisabled}
                    onClick={() => handleSubmit()}>
                    Заказать
                </AppButton>
            </AppButtonWrap>
        </Container>
    );
};

export default OrderPage;

const Container = styled.div`
  width: 900px;
  padding: 15px; 
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.6); 
`;
const Header = styled.div`
  width: 100%;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid black;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-right: 15px;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;
const InputTitle = styled.span`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;
const AppInput = styled(Input)`
  margin-bottom: 15px;
  width: 700px;
  height: 40px;
  margin-right: 15px;
`;
const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;
const OrderYandexMap = styled(YandexMap)`
  margin-right: 15px;
  border: 1px solid black;
`;
const AppButton = styled.button`
  width: 300px;
  height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #d08604;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
    &:hover{
      cursor: pointer;
      background-color: #d09604;
    }
    &:disabled{
      cursor: no-drop;
      background-color: #b1b1b1;
    }
`;
const AppButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
`;
const SearchButton = styled.button`
  width: 150px;
  height: 40px;
  border: none;
  background-color: #d07604;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
    &:hover{
      cursor: pointer;
      background-color: #d09604;
    }
`;
const SearchButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
type AddressClient = {
    address: string,
    coordinates: number[],
}
