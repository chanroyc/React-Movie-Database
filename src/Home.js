import React from 'react';
import { throwStatement } from '@babel/types';

const API_KEY   = 'afe0411f3e971d443c30a709f7757257';
const GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
             + API_KEY
             + '&language=en-US';

var d = new Date();
var eDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate();

d.setDate(d.getDate() - 90);
var sDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate();

class Home extends React.Component {
    
    constructor() {
        super();
        this.state  = {
          apiKey : API_KEY,
          start  : sDate,
          end    : eDate,

          pageNum: 1,
          totalPages: 0,
          movies : [],
          genres : [],
          selectedGenre  : 28
        };
        this.getMovies = this.getMovies.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    // Called when constructor is finished building component.
    componentDidMount() {
      this.getMovies();
      this.getGenres();
    }

    handleGenreChange(e) {
      this.setState({ selectedGenre: e.target.value })
      this.setState({pageNum: 1})
      this.getMovies(1, e.target.value)
   
    }

    checkDates() {
      var d = new Date();
      var cDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate();
      this.setState({end: cDate});

      d.setDate(d.getDate() - 90);
      var sDate = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate();
      this.setState({start: sDate});
   }

   handlePageChange(change){
    let page = this.state.pageNum;
    if(change === 'next' && page<this.state.totalPages){
      page++;
    }else if (change === 'prev' && page>1){
      page--;
    }

    this.setState({pageNum: page});
    this.getMovies(page, this.state.selectedGenre);
    console.log(page);
   }

    getMovies(pageNum, genre=28) {
        
        this.checkDates();  
        const URL        = 'http://api.themoviedb.org/3/discover/movie?api_key='
                            + API_KEY
                            + '&primary_release_date.gte=' + this.state.start
                            + '&primary_release_date.lte=' + this.state.end
                            + '&page=' + pageNum + 
                            '&with_genres=' + genre;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                this.setState({movies:data.results});
                this.setState({totalPages: data.total_pages})
                // alert(data.total_pages);
                console.log(JSON.stringify(data.results));
                console.log(data.page);
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

    getGenres() {
        // This code gets data from the remote server.
        fetch(GENRES).then(response => response.json())

        // Data is retrieved.
        .then((data) => {
            this.setState({genres:data.genres});
            console.log(JSON.stringify(data.genres));
        })
        // Data is not retrieved.
        .catch((error) => {
            alert(error);
        });
    }

    render() {
        return (          
            <div>
              <div className="page-navigation">
                <div className="genres">
                  {/* Genres */}
                  <select type='text' value={this.state.selectedGenre} 
                        onChange={this.handleGenreChange}>
                    {this.state.genres.map((item, index)=>(
                    <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="page">
                  <button onClick={(e) => this.handlePageChange('prev')}>-</button>&nbsp;
                  {this.state.pageNum} / {this.state.totalPages}&nbsp;
                  <button onClick={(e) => this.handlePageChange('next')}>+</button>
                </div>
              </div>
             
        {/* To show image add http://image.tmdb.org/t/p/w185/ to file name */}
              <ul>
              {this.state.movies.map((item, index)=>(
                <li key={item.id}><img src={"http://image.tmdb.org/t/p/w185" + item.poster_path}></img> <h2>{item.title}</h2> <p>{item.overview}</p></li>
              ))}
              </ul>
            </div>
        )
    }
}
export default Home;
