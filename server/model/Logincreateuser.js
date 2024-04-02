const UserSchema=new mongoose.Schema({
    userid:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    role:{type:String,required:true},
    password:{type:String,required:true}
})


const User=mongoose.model("User2",UserSchema);
module.exports=User;