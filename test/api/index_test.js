const chai= require('chai')
const chaiHtpp=require('chai-http')
const should= chai.should()
const server= require('../../app')

chai.use(chaiHtpp)

describe('Node Server',()=>{
    it('(GET /) anasayfayı döndürür', (done)=>{
        chai.request(server)
            .get('/')
            .end((err,res)=>{
                res.should.have.status(200)
                done()
            })
    })
})
