const chai = require('chai')
const chaiHtpp = require('chai-http')
const should = chai.should()
const server = require('../../app')

chai.use(chaiHtpp)
let token, movieId

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'gcintesun4', password: '12345' })
            .end((err, res) => {
                token = res.body.token
                console.log(token)
                done()
            })
    })

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })

    describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'Udemy',
                director_id: '5bccac0b508e6c2b20f94e6b',
                category: 'Komedi',
                country: 'Türkiye',
                year: 1950,
                imdb_score: 8
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('imdb_score')
                    movieId = res.body._id
                    done()
                })
        })
    })

    describe('/GET/:movie_id movie', () => {
        it('it should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('year')
                    res.body.should.have.property('imdb_score')
                    res.body.should.have.property('_id').eql(movieId)
                    done()
                })
        })
    })

    describe('/PUT/:movie_id movie', () => {
        it('it should UPDATE a movie given by id', (done) => {
            const movie = {
                title: '93creative',
                director_id: '5bccac0b508e6c2b20f94e6b',
                category: 'Suç',
                country: 'Amerika',
                year: 1989,
                imdb_score: 10
            }

            chai.request(server)
                .put('/api/movies/'+movieId)
                .send(movie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title').eql(movie.title)
                    res.body.should.have.property('director_id').eql(movie.director_id)
                    res.body.should.have.property('category').eql(movie.category)
                    res.body.should.have.property('country').eql(movie.country)
                    res.body.should.have.property('year').eql(movie.year)
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score)
                    done()
                })
        })
    })

    describe('/DELETE/:movie_id movie', () => {
        it('it should DELETE a movie given by id', (done) => {
            
            chai.request(server)
                .del('/api/movies/'+movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql(1)
                    done()
                })
        })
    })
})