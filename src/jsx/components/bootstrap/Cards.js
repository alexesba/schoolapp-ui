import React, { Fragment, useState } from "react";
import Highlight from "react-highlight";
import {Link} from 'react-scroll';
/// Compoents
import PageTitle from "../../layouts/PageTitle";

/// Image
import img1 from "../../../images/card/1.png";
import img2 from "../../../images/card/2.png";
import img3 from "../../../images/card/3.png";
/// Bootstrap
import { Row, Card, Col, Button, Nav, Tab } from "react-bootstrap";

const sidebarLink = [
  {title:'Card Title', to:'card-title-1'},
  {title:'Card Title-2', to:'card-title-2'},
  {title:'Card Title-3', to:'card-title-3'},
  {title:'Special Title Treatment', to:'special-title'},
  {title:'Primary Card Title', to:'primary-card'},
  {title:'Secondary Card Title', to:'secondary-card'},
  {title:'Success Card Title', to:'success-card'},
  {title:'Danger Card Title', to:'danger-card'},
  {title:'Warning Card Title', to:'warning-card'},
  {title:'Info Card Title', to:'info-card' },
  {title:'Light Card Title', to:'light-card' },
  {title:'Dark Card Title', to:'dark-card' },
  {title:'Card Title-4'  , to:'card-title-4'},
  {title:'Card Title-5' , to:'card-title-5'},
  {title:'Card Title-6' , to:'card-title-6'} , 
]

const UiCards = () => {
  const [activeLink ,setActiveLink] = useState(0);
  return (
    <Fragment> 
      <div className="row ">
				<div className="col-xl-12">
					<div className="page-titles">
						<div className="d-flex align-items-center">
							<h2 className="heading">Card</h2>
						</div>
					</div>
				</div>
			</div>
      <div className="element-area">
        <div className="demo-view">
          <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
            <Row>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="card-title-1" className="dz-card">
                    <Card.Header className=" border-0 pb-0">
                      <div>
                        <Card.Title>Card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Card.Text>
                            He lay on his armour-like back, and if he lifted his head a
                            little he could see his brown belly, slightly domed and divided
                            by arches into stiff <br /> sections. The bedding was hardly
                            able to cover it and seemed ready to slide off any moment.
                          </Card.Text>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`

<Card.Text>
  He lay on his armour-like back, and if he lifted his head a
  little he could see his brown belly, slightly domed and divided
  by arches into stiff <br /> sections. The bedding was hardly
  able to cover it and seemed ready to slide off any moment.
</Card.Text>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>

                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="card-title-2" className="dz-card">
                    <Card.Header>
                      <div>
                        <Card.Title>Card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Card.Text>
                            This is a wider card with supporting text and below as a natural
                            lead-in to the additional content. This content is a little
                            <br /> bit longer. Some quick example text to build the bulk{" "}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="d-sm-flex justify-content-between align-items-center">
                          <Card.Text className=" text-dark d-inline">
                            Last updated 3 mins ago
                          </Card.Text>

                          <Link to={"#"} className="btn btn-primary text-white">
                            Go somewhere
                          </Link>
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body>
  <Card.Text>
    This is a wider card with supporting text and below as a natural
    lead-in to the additional content. This content is a little
    <br /> bit longer. Some quick example text to build the bulk{" "}
  </Card.Text>
  </Card.Body>
  <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
  <Card.Text className=" text-dark d-inline">
    Last updated 3 mins ago
  </Card.Text>

  <Link to={"#"} className="btn btn-primary text-white">
    Go somewhere
  </Link>
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>

                      </Tab.Pane>
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-center dz-card" id="card-title-3" >
                    <Card.Header>
                      <div>
                      <Card.Title>Card Title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Card.Text>
                            This is a wider card with supporting text and below as a natural
                            lead-in to the additional content. This content
                          </Card.Text>
                          <Button as="a" variant="primary" href="#" className="text-white mt-3">
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer>
                          <Card.Text className=" text-dark">
                            Last updateed 3 min ago
                          </Card.Text>
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body>
  <Card.Text>
    This is a wider card with supporting text and below as a natural
    lead-in to the additional content. This content
  </Card.Text>
  <Button as="a" variant="outline-primary" href="#" className="text-white mt-3">
    Go somewhere
  </Button>
</Card.Body>
<Card.Footer>
  <Card.Text className=" text-dark">
    Last updateed 3 min ago
  </Card.Text>
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-center dz-card" id="special-title">
                    <Card.Header>
                      <div>
                        <Card.Title>Special title treatment</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" custom-tab-1">
                          <ul className="nav nav-tabs card-body-tabs mb-3">
                            <Nav.Item as="li">
                              <Nav.Link active href="#">
                                Active
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                              <Nav.Link href="#">Link</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                              <Nav.Link disabled href="#">
                                Disabled
                              </Nav.Link>
                            </Nav.Item>
                          </ul>

                          <Card.Text>
                            With supporting text below as a natural lead-in to additional
                            content.
                          </Card.Text>
                          <Button variant="primary" href="#" className="text-white mt-3">
                            Go somewhere
                          </Button>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" custom-tab-1">
  <ul className="nav nav-tabs card-body-tabs mb-3">
    <Nav.Item as="li">
      <Nav.Link active href="#">
        Active
      </Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link href="#">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link disabled href="#">
        Disabled
      </Nav.Link>
    </Nav.Item>
  </ul>

  <Card.Text>
    With supporting text below as a natural lead-in to additional
    content.
  </Card.Text>
  <Button variant="outline-primary" href="#" className="text-white mt-3">
    Go somewhere
  </Button>
</Card.Body>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>

                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="primary-card">
                    <Card.Header>
                      <div>
                        <Card.Title className="text-white">Primary card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=" "
                            href="#"
                            className="btn-card btn-primary text-white mt-3"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=" "
    href="#"
    className="btn-card btn-primary text-white mt-3"
  >
    Go somewhere
  </Button>
</Card.Body>
<Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="secondary-card">
                    <Card.Header>
                      <div>
                        <Card.Title className="text-white">
                          Secondary card title
                        </Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=" "
                            href="#"
                            className="btn-card btn-secondary text-white mt-3"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=" "
    href="#"
    className="btn-card btn-secondary text-white mt-3"
  >
    Go somewhere
  </Button>
  </Card.Body>
  <Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="success-card">
                    <Card.Header>
                      <div>
                      <Card.Title className="text-white">Success card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=" "
                            href="#"
                            className="btn-card btn-success text-white mt-3"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=" "
    href="#"
    className="btn-card btn-success text-white mt-3"
  >
    Go somewhere
  </Button>
  </Card.Body>
  <Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>

                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="danger-card">
                    <Card.Header>
                      <div>
                        <Card.Title className="text-white">Danger card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=""
                            href="#"
                            className="btn-card btn-danger text-white mt-3"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=""
    href="#"
    className="btn-card btn-danger text-white mt-3"
  >
    Go somewhere
  </Button>
</Card.Body>
<Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>

                      </Tab.Pane>
                    </Tab.Content>   
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="warning-card">
                    <Card.Header>
                      <div>
                        <Card.Title className="text-white">Warning card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav>   
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=""
                            href="#"
                            className="btn-card btn-warning text-white mt-3"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=""
    href="#"
    className="btn-card btn-warning text-white mt-3"
  >
    Go somewhere
  </Button>
</Card.Body>
<Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>

                    </Tab.Content>    
                  </Card>
                 </Tab.Container> 
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="info-card">
                    <Card.Header>
                      <div>
                        <Card.Title className="text-white">Info card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=""
                            href="#"
                            className="btn-card btn-info text-white mt-3"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=""
    href="#"
    className="btn-card btn-info text-white mt-3"
  >
    Go somewhere
  </Button>
  </Card.Body>
  <Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
  </Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="dz-card" id="light-card">
                    <Card.Header>
                      <div>
                        <Card.Title>Light card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button as="a" variant="" href="#" className="btn-card btn-light text-white mt-3">
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className="bg-transparent border-0">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button as="a" variant="" href="#" className="btn-card btn-light text-white mt-3">
    Go somewhere
  </Button>
  </Card.Body>
  <Card.Footer className=" bg-transparent border-0">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card className="text-white dz-card" id="dark-card">
                    <Card.Header>
                      <div>
                      <Card.Title className="text-white">Dark card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body className=" mb-0">
                          <Card.Text>
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                          </Card.Text>
                          <Button
                            as="a"
                            variant=""
                            href="#"
                            className="btn-card btn-dark mt-3 text-white"
                          >
                            Go somewhere
                          </Button>
                        </Card.Body>
                        <Card.Footer className=" bg-transparent border-0 text-white">
                          Last updateed 3 min ago
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body className=" mb-0">
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
  <Button
    as="a"
    variant=""
    href="#"
    className="btn-card btn-dark mt-3 text-white"
  >
    Go somewhere
  </Button>
</Card.Body>
<Card.Footer className=" bg-transparent border-0 text-white">
  Last updateed 3 min ago
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>

                    </Tab.Content> 
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="card-title-4" className="dz-card">
                    <img
                      className="card-img-top img-fluid"
                      src={img1}
                      alt="Card cap"
                    />
                    <Card.Header>
                      <div>
                        <Card.Title>Card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Card.Text>
                            This is a wider card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                          </Card.Text>
                          <Card.Text className="mt-3 text-dark">
                            Last updated 3 mins ago
                          </Card.Text>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body>
  <Card.Text>
    This is a wider card with supporting text below as a natural
    lead-in to additional content. This content is a little bit
    longer.
  </Card.Text>
  <Card.Text className="mt-3 text-dark">
    Last updated 3 mins ago
  </Card.Text>
</Card.Body>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="card-title-5" className="dz-card">
                    <img
                      className="card-img-top img-fluid"
                      src={img2}
                      alt="Card cap"
                    />
                    <Card.Header>
                      <div>
                        <Card.Title>Card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Card.Text>
                            He lay on his armour-like back, and if he lifted his head a
                            little
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Card.Text className=" d-inline">Card footer</Card.Text>
                          <Link to="/ui-card" className="card-link float-end">
                            Card link
                          </Link>
                        </Card.Footer>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body>
  <Card.Text>
    He lay on his armour-like back, and if he lifted his head a
    little
  </Card.Text>
</Card.Body>
<Card.Footer>
  <Card.Text className=" d-inline">Card footer</Card.Text>
  <Link to="/ui-card" className="card-link float-end">
    Card link
  </Link>
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>

                      </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl="12">
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="card-title-6" className="dz-card">
                    <Card.Header>
                      <div>
                        <Card.Title>Card title</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav> 
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Card.Text>
                            This is a wider card with supporting text and below as a natural
                            lead-in to the additional content. This content is a little
                          </Card.Text>
                        </Card.Body>
                        <img
                          className="card-img-bottom img-fluid"
                          src={img3}
                          alt="Card cap"
                        />
                        <Card.Footer>
                          <Card.Text className=" d-inline">Card footer</Card.Text>
                          <Link to="/ui-card" className="card-link float-end">
                            Card link
                          </Link>
                        </Card.Footer>
                      </Tab.Pane>  
                      <Tab.Pane eventKey="Code">  
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Card.Body>
  <Card.Text>
    This is a wider card with supporting text and below as a natural
    lead-in to the additional content. This content is a little
  </Card.Text>
</Card.Body>
<img
  className="card-img-bottom img-fluid"
  src={img3}
  alt="Card cap"
/>
<Card.Footer>
  <Card.Text className=" d-inline">Card footer</Card.Text>
  <Link to="/ui-card" className="card-link float-end">
    Card link
  </Link>
</Card.Footer>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>  
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>
            </Row>
          </div>
        </div>
        <div className="demo-right ">
          <div className="demo-right-inner dlab-scroll " id="right-sidebar">
              <h4 className="title">Examples For Cards</h4>
              <ul className="navbar-nav" id="menu-bar">
                    {sidebarLink.map((item, ind)=>(
                      <li key={ind}>
                        <Link to={item.to}  smooth={true}
                          className={`scroll ${ind === activeLink ? 'active' :  ''} `}
                          activeClass="active"
                          spy={true}
                          onClick={()=>setActiveLink(ind)}
                        > 
                          {item.title}
                        </Link>
                      </li>
                    ))}   
              </ul>	
          </div>
      </div>
      </div>    
    </Fragment>
  );
};

export default UiCards;
