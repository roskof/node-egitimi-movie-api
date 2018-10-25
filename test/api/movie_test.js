const chai = require('chai')
const chaiHtpp= require('chai-http')
const should= chai.should()
const server= require('../../app')

chai.use(chaiHtpp)
let token

describe('/api/movies tests', ()=>{
   before((done)=>{
      chai.request(server)
            .post('/authenticate')
            .send({username: 'gcintesun4',password: '12345'}) 
            .end((err,res)=>{
                token=res.body.token
                done()
            })
   })

   describe('/GET movies',()=>{
       it('it should GET all the movies',(done)=>{
           chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
       })
   })
})