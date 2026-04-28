import mongoose, {Document, Schema, type ObjectId} from "mongoose"


// Sample Data 
/* 
{
  user: ObjectId (ref: User),
  goal: String (what did you plan to do?),
  achieved: String (what did you actually do?),
  tags: [String] (eg: ['React', 'Node', 'CSS']),
  mood: String (enum: ['great', 'okay', 'struggled']),
  date: Date (default: today),
  createdAt: Date
}
*/
export enum EMood {
    Great = 'great',
    Okay = 'okay',
    struggled = 'struggled'
}


export interface ILog extends Document {
    user: ObjectId | string;
    goal: string;
    achieved: string;
    date: Date;
    tags: Array<string>;
    mood: EMood;
    isCompleted: boolean;
    isDeleted: boolean;


    //timeStamps
    createdAt: Date;
    updatedAt: Date;
}

const logSchema = new Schema<ILog>({
    user : {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    goal: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 1000,
    },
    achieved: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 1000,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    }, 
    mood: {
        type : String,
        enum : Object.values(EMood),
        default: EMood.Okay,
    }, 
    tags: {
        type: [String],
        default: [],
    },
    isCompleted:{
        type: Boolean,
        default: false,
        required: true,
    },
    isDeleted:{
        type: Boolean,
        default: false,
        required: true,
    }

}, {timestamps : true})


export const Log = mongoose.model<ILog>("Log", logSchema)