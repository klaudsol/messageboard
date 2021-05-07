import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control placeholder="Enter your name" />
    </Form.Group>
  
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Message</Form.Label>
      <Form.Control as="textarea" className="text-muted" rows={10} placeholder="Enter your message here." />
    </Form.Group>
    <Form.Group>
      <Button className="mt-3 text-right" variant="primary" type="submit">
        Submit
      </Button>
    </Form.Group>
  </Form>
          </Container>
          
        <Container className='mt-5'>
        {[...Array(10)].map((x) => (          
          <Container className='p-4 mb-1 border border-muted rounded'>
            <Row>
              Name
            </Row>
            <Row>
              Message 
            </Row>
          </Container>
         ))}
        </Container>          
      </header>
    </div>
  );
}

export default App;
