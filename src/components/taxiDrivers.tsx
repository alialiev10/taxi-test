import React from 'react';
import styled from 'styled-components'
import {Driver as DriverType} from "../model/driver";
import Driver from "./driver";
import 'antd/dist/antd.css';
import {Spin} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../store";
import {requestActiveDriver} from "../store/activeDriver";

const TaxiDrivers: React.FC<Props> = (
    {
        drivers = [],
        loading,
        setIsDisabled
    }
) => {
    const dispatch = useDispatch();
    const activeDriver = useSelector((state: Store) => state.activeDriver.data);
    return (
        <Container>
            {loading ?
                <Spinner>
                    <Spin size={'large'}/>
                </Spinner> :
                drivers.map((driver) => {
                    return (
                        <Driver
                            key={driver.driver_phone}
                            isActive={driver.crew_id === activeDriver.crew_id}
                            onClick={() => {
                                dispatch(requestActiveDriver(driver));
                                setIsDisabled && setIsDisabled(false)
                            }}
                            driver={driver}
                        />
                    )
                })}
        </Container>
    );
};

export default TaxiDrivers;

const Container = styled.div`
  position: relative;
  width: 500px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid black;
`;
const Spinner = styled.div`
  position: absolute;
  top: 200px;
  right: 105px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
type Props = {
    drivers?: DriverType[],
    loading?: boolean,
    setIsDisabled?: (isDisabled: boolean) => void,
}
