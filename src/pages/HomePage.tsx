import landingPageImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png'

const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col text-center gap-5 -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">Tuck into a takeaway today</h1>
                <span className="text-xl">Food is just a click away</span>
            </div>
            {/* grid with mobile responsive */}
            <div className='grid md:grid-cols-2 gap-5'>
                <img src={landingPageImage} alt='' />
                <div className='flex flex-col items-center justify-center text-center gap-4'>
                    <span className='font-bold text-3xl tracking-tighter'>
                        Order takeaway even faster
                    </span>
                    <span>
                        Download the app for experiance faster ordering and personalised recommendation
                    </span>
                    <img src={appDownloadImage} alt='' />
                </div>
            </div>
        </div>
    )
}

export default HomePage;