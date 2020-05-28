import React from 'react';
import styled from 'styled-components'
import { CarOutlined, RightOutlined } from '@ant-design/icons';
import {Driver as DriverType} from "../model/driver";
const Driver: React.FC<Props> = ({isActive, driver, onClick}) => {
    return (
       <Container
           active={isActive}
           onClick={onClick}>
           <Icon/>
           <Decription>
               <DecriptionTitle>
                   {`${driver.car_mark} ${driver.car_model}`}
               </DecriptionTitle>
               <Color>
                   {driver.car_color}
               </Color>
           </Decription>
           <Distance>
               <RightOutlined/>
               {`${driver.distance} метров`}
           </Distance>
       </Container>
    );
};

export default Driver;

const Container = styled.div`
  position: relative;
  display:flex;
  align-items: center;
  width: 300px;
  height: 60px;
  padding: 10px;
  border-bottom: 1px solid black;
  color: ${(props: ContainerProps) => props.active ? 'orange' : 'black'};
    &:hover{
      color: orange;
      cursor: pointer;
    }
`;
const Icon = styled(CarOutlined)`
  font-size: 30px;
  color: black;
  padding-left: 5px;
  margin-right: 25px;
`;
const Decription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const DecriptionTitle = styled.div`
  font-weight: bold;
`;
const Color = styled.div`
  
`;
const Distance = styled.div`
  position: absolute;
  right: 5px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;


type Props = {
    driver: DriverType,
    isActive?: boolean,
    onClick?: () => void,
}
type ContainerProps = {
    active?: boolean,
}
