import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Breadcrumbs from '@/components/app/breadcrumbs';
import HeroContact from '@/components/app/heroContact';
import Button from '@/components/app/form/button';
import { type SharedData } from '@/types';
import { Head, usePage, Form } from '@inertiajs/react';
import { store as contactStore } from '@/routes/contact';

export default function Contact() {
    const { flash } = usePage<SharedData & { flash?: { success?: string } }>().props;

    return (
        <>
            <Head title="Contact">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex flex-col min-h-screen bg-blue-50">
                <Header />
                
                <div className="container mx-auto px-4 py-12 md:mt-20 50">
                    <Breadcrumbs items={[{ label: 'Contact us' }]} />
                    <div className="mb-8 ">
                        <h1 className="text-5xl font-bold text-gray-600">Contact us</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Make your event extra special with our themed decorations and accessories.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row mt-12">
                        <div className="w-full">
                         
                            <div className="p-8">
                                {flash?.success && (
                                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                        {flash.success}
                                    </div>
                                )}
                                <Form {...contactStore.form()} resetOnSuccess>
                                    {({ errors, processing, recentlySuccessful }) => (
                                        <>
                                            {recentlySuccessful && (
                                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                                    Thank you for your message! We will get back to you soon.
                                                </div>
                                            )}
                                            <div className="mb-4">
                                                <label htmlFor="name" className="block text-slate-600 mb-2">Name</label>
                                                <input 
                                                    type="text" 
                                                    id="name" 
                                                    name="name" 
                                                    className={`w-full bg-white border rounded px-4 py-2 ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                                                    required
                                                />
                                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="email" className="block text-slate-600 mb-2">Email</label>
                                                <input 
                                                    type="email" 
                                                    id="email" 
                                                    name="email" 
                                                    className={`w-full bg-white border rounded px-4 py-2 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                                                    required
                                                />
                                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="phone" className="block text-slate-600 mb-2">Phone</label>
                                                <input 
                                                    type="tel" 
                                                    id="phone" 
                                                    name="phone" 
                                                    className={`w-full bg-white border rounded px-4 py-2 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                                                    required
                                                />
                                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="message" className="block text-slate-600 mb-2">Message</label>
                                                <textarea 
                                                    id="message" 
                                                    name="message" 
                                                    rows={5} 
                                                    className={`w-full bg-white border rounded px-4 py-2 ${errors.message ? 'border-red-500' : 'border-slate-300'}`}
                                                    required
                                                />
                                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                            </div>
                                            <Button label={processing ? 'Sending...' : 'Submit'} type="submit" />
                                        </>
                                    )}
                                </Form>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-slate-600 text-4xl m-8">Contact information</h1>
                            <ul className="m-8 text-slate-600 text-lg space-y-4">
                                <li>
                                    Tel: <a href="tel:+447942386386">07942 386386</a>
                                </li>
                                <li>
                                    email: hello@funtimesoftplay.co.uk
                                </li>
                                <li className="bg-gray-100 p-3 border rounded-lg bg-white">
                                    <h2 className="font-semibold">Social media</h2>
                                    <div className="flex flex-col items-start mt-2">
                                        <div className='flex flex-row items-center font-semibold'>
                                            <h3 className='pt-3 mr-2 md:text-sm'>Funtime Softplay</h3>
                                            <div>
                                                <a href=" https://www.instagram.com/funtimesoftplay/?igsh=dXBwaGtybm1pcWli#" target="_blank" rel="noopener noreferrer">
                                                    <img src="/storage/img/social/Instagram_Glyph_Black.png" className="w-8 h-8 inline-block mt-4" alt="Instagram" />
                                                </a> 
                                            </div>
                                           
                                        </div>
                                         
                                         <div className='flex flex-row items-center font-semibold'>
                                            <h3 className='pt-3 mr-2 md:text-sm'>Love Balloons Beds</h3>
                                            <div>
                                                <a href="https://www.instagram.com/love_balloons_bedfordshire_/?hl=en" target="_blank" rel="noopener noreferrer">
                                                    <img src="/storage/img/social/Instagram_Glyph_Black.png" className="w-8 h-8 inline-block mt-4" alt="Instagram" />
                                                </a>
                                            </div>
                                            
                                         </div>
                                        
                                       
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
