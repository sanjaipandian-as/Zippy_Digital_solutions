import {
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Expert Team',
        description: 'Our team consists of industry veterans with years of experience delivering top-tier digital solutions.',
        icon: CheckCircleIcon,
    },
    {
        name: 'Fast Delivery',
        description: 'We understand the importance of time-to-market. Our agile process ensures rapid delivery without compromising quality.',
        icon: ClockIcon,
    },
    {
        name: 'Cost Effective',
        description: 'Get premium quality services at competitive rates. We optimize our processes to give you the best value.',
        icon: CurrencyDollarIcon,
    },
    {
        name: 'Secure & Reliable',
        description: 'Security is at the core of everything we build. Your data and your users data are always protected.',
        icon: ShieldCheckIcon,
    },
];

const WhyChooseUs = () => {
    return (
        <div className="py-12 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Benefits</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Why Choose Us?
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        We bring a unique combination of technical expertise and business acumen to help you succeed.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
