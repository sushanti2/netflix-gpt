
const VideoTitle = ({title,  overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute bg-gradient-to-r from-black">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-lg py-6 w-1/3 text-white">{overview}</p>
        <div>
            <button className="p-4 px-8 bg-white text-black text-xl rounded-lg font-semibold hover:bg-opacity-20">▶️ Play</button>
            <button className="p-4 px-8 bg-white text-black text-xl rounded-lg opacity-70 font-semibold mx-6">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle