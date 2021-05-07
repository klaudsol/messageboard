import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button, Form, FormLayout, TextField, DataTable} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function App() {
  const backendPath = "/.netlify/functions/index";
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback((_event) => {
    (async () => {
      await fetch(`${backendPath}/message`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          message
        })
      }) 
    })();
  }, [name, message]);



  
  return (
    <div className="App">
      <header className="App-header">
      <AppProvider i18n={enTranslations}>
          <Page title="Messageboard App">
    <Form onSubmit={handleSubmit}>
      <FormLayout>

        <TextField
          value={name}
          onChange={(name) => setName(name)}
          label="Name"
        />
        
        <TextField
          value={message}
          onChange={(message) => setMessage(message)}
          multiline={10}
          label="Message"
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
    
    <br />
    
    <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
          ]}
          headings={[
            'Name',
            'Message',
          ]}
          rows={[[]]}
        />
      </Card>
          </Page>
        </AppProvider>,
      
      </header>
    </div>
  );
}

export default App;
