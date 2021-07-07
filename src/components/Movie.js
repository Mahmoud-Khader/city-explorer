import React, { Component } from 'react'
import { Row, Card, Col } from 'react-bootstrap'

class Movie extends Component {
  render() {
    return (
      <div>
        <Row xs={2} md={3} >
          {
            this.props.moviesData.map((value,index) => {
              console.log(this.props.moviesData[0]+'  Value console')
              return (

                <Col key={index}>

                  <Card>


                    <Card.Body>

                      <Card.Text>
                        Movie Title :  {value.title}
                      </Card.Text>
                      <Card.Text>
                        Movie Language : {value.original_language}
                      </Card.Text>
                      <Card.Text>
                        Movie Avg. Vote :  {value.vote_average}
                      </Card.Text>
                      <Card.Text>
                        Movie Overview :  {value.overview}
                      </Card.Text>
                      <Card.Text>
                        Movie Total Vote : {value.vote_count}
                      </Card.Text>
                      <Card.Text>
                        Movie Popularity :  {value.popularity}
                      </Card.Text>
                      <Card.Text>
                        Movie Release_date :  {value.release_date}
                      </Card.Text>
                      <Card.Img  variant="top" src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`
                      } alt={value.title} />

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