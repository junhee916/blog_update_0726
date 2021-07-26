const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre('save', async function(next){

    /*
    * userModel.save를 진행할 때 실행하는 function
    * bcrypt hash 진행 
    */
    
    try{
        const salt = await bcrypt.genSalt(10)

        const passwordHash = await bcrypt.hash(this.password, salt)

        this.password = passwordHash;

        next();
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.comparePassword = function(isInputPassword, cb){

    /*
    * isInputPassword / 현재 input에 작성한 password, this.password / db에 저장된 비밀번호 => 두개를 match 진행 
    */
    bcrypt.compare(isInputPassword, this.password, (err, isMatch) => {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema)