export default function ProfileImage({
    src,
}:{
    src:string
}){
    return(
        <div className="size-16 p-0.5 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
            <div className="size-15 p-0.5 rounded-full bg-white dark:bg-black">
                <div className="size-14 aspect-square overflow-hidden rounded-full">
                    <img 
                    className="w-full h-full object-cover"
                    src={src} 
                    alt="" />

                </div>

            </div>

        </div>
    );
}