import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function MyTabPedido({components = []}) {
  return (
    <Tabs
    defaultActiveKey="general"
    id="uncontrolled-tab-example"
    className="mb-3"
  >
        <Tab eventKey="general" title="General">
            {components[0]}
        </Tab>
        <Tab eventKey="contenido" title="Contenido">
            {components[1]}
        </Tab>
        <Tab eventKey="logistica" title="Logistica">
            {components[2]}
        </Tab>
        <Tab eventKey="finanza" title="Finanzas">
            {components[3]}
        </Tab>
    </Tabs>
  )
}

// {/* <Tab eventKey="contact" title="Contact" disabled>
// Tab content for Contact
// </Tab> */}
