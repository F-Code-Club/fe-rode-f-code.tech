import { Col, Container, Row } from 'react-bootstrap';

import ButtonCustom from './components/Button';
import SearchRoom from './components/SearchRoom';
import SelectCustom from './components/Select';
import TableRoom from './components/Tablle';
import { RoomStyle } from './style';

const AdminRoom = () => {
    return (
        <div style={{ width: '800px' }}>
            <RoomStyle className="w-100">
                <div className="box-style w-100">
                    <Col className="p-4">
                        <Row className="color-primary mb-3">
                            <h3 className="fw-bold">Room Management</h3>
                        </Row>
                        <Row className="d-flex justify-content-around align-items-center mb-3">
                            <Col className="col-5">
                                <SearchRoom
                                    props={{
                                        placeholder: 'Search room...',
                                    }}
                                />
                            </Col>
                            <Col className="col-4 d-flex justify-content-center">
                                <SelectCustom
                                    props={{
                                        name: 'Visibility:',
                                    }}
                                />
                            </Col>
                            <Col className="col-3 d-flex align-items-center justify-content-end">
                                <ButtonCustom
                                    props={{
                                        text: 'Create room',
                                        className:
                                            'bg-primary-1 text-light d-flex align-items-center text-nowrap',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="border-top">
                            <TableRoom />
                        </Row>
                    </Col>
                </div>
            </RoomStyle>
        </div>
    );
};
export default AdminRoom;
