const About = () => {
    return (
        <div className="bg-gray-50 overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
                <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
                    <div>
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
                        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Driven by Passion, Defined by Excellence
                        </h3>
                    </div>
                </div>
                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="relative lg:row-start-1 lg:col-start-2">
                        <svg
                            className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20 block h-42 w-42 text-gray-100"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>
                        <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                            <figure>
                                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                                    <img
                                        className="rounded-lg shadow-lg object-cover object-center"
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                                        alt="Whitney leaning against a railing on a downtown street"
                                        width={1184}
                                        height={1376}
                                    />
                                </div>
                            </figure>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <div className="text-base max-w-prose mx-auto lg:max-w-none">
                            <p className="text-lg text-gray-500">
                                At Zippy Digital Solutions, we are more than just a software agency. We are your strategic partner in digital transformation.
                            </p>
                        </div>
                        <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                            <p>
                                Founded with a vision to simplify complex digital challenges, we have grown into a diverse team of designers, developers, and strategists.
                            </p>
                            <p>
                                Our mission is to empower businesses with tools that not only solve today's problems but pave the way for future growth. We believe in improved user experiences, robust architecture, and design that speaks volumes.
                            </p>
                            <ul role="list">
                                <li>Innovative approach to problem solving</li>
                                <li>Client-centric development process</li>
                                <li>Commitment to long-term success</li>
                            </ul>
                            <p>
                                Join us on a journey to redefine what's possible in the digital realm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
