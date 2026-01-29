const industries = [
    {
        name: 'Healthcare',
        description: 'Digital solutions for patient care and hospital management.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        name: 'Finance',
        description: 'Secure platforms for banking, trading, and financial services.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        name: 'E-Commerce',
        description: 'Scalable online stores with seamless payment indicators.',
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        name: 'Education',
        description: 'Learning management systems and educational tools.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
];

const Industries = () => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Industries We Serve
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Empowering diverse sectors with tailored technology.
                    </p>
                </div>
                <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-4 lg:max-w-none">
                    {industries.map((industry) => (
                        <div key={industry.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src={industry.image} alt={industry.name} />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-xl font-semibold text-gray-900">
                                        {industry.name}
                                    </p>
                                    <p className="mt-3 text-base text-gray-500">
                                        {industry.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Industries;
