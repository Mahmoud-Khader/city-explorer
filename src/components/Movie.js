import React, { Component } from 'react'
import { Row,Card,Col } from 'react-bootstrap'

class Movie extends Component {
    render() {
        return (
            <div>
<Row xs={2} md={3} >
{ 
         this.props.moviesData.map(value=>{
            return  (
                
             
            
            <Col>
             
                
            
                <Card>
                   
                  <Card.Img variant="top" src={value.image_url}  />
                  <Card.Body>
                    
                    <Card.Text>
                        <p>popularity : {value.popularity} </p>
                          <p>release_date : {value.release_date}</p>
                          <p>total_votes : {value.total_votes}</p>
                          <p>average_votes : {value.average_votes}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
               
              </Col>)
                      })
                    }
                    </Row>

              


               
  
 

            </div>
        )
    }
}

export default Movie