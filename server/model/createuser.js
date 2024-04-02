const UserSchema=new mongoose.Schema({
    userid:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const Users=new mongoose.model("User",UserSchema)
module.exports=Users;