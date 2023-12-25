import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        //useNewUrlParser: true, -> Deprecated
        //useUnifiedTopology: true -> Deprecated
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}