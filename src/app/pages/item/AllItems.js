import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { getAllItems } from '../../services/ItemService';

import { formatDate, formatDatetime } from '../../../base/utils/date';

const AllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // axiosService
    //   .get('http://localhost:4000/user/fav-movies')
    //   .then((response) => {
    //     setMovies(response.data);
    //   });
  
    // useEffect async
    // Reference: 
    // https://devtrium.com/posts/async-functions-useeffect
    const fetchData = async () => {
      const data = await getAllItems();
      setItems(data);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {items.map((itemObj, idx) => (
          <Col key={itemObj.id}>
            <Card>
              <Card.Body>
                <Card.Title>{itemObj.name} ({itemObj.id})</Card.Title>
                <Card.Text>
                  PurchasedDate: {formatDatetime(itemObj.purchasedDate)}
                  , LastModifiedDatetime: {formatDatetime(itemObj.lastModifiedDatetime)}
                  , VersionNo: {itemObj.versionNo}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllItems;
