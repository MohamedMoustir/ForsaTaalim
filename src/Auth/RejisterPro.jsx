
import { useState, useEffect } from "react";
import axios from 'axios';
import '../assets/js/index';
import '../assets/js/main';
import { useNavigate } from 'react-router-dom';


const API_URL = 'http://127.0.0.1:8000/api';
// let token = '';

const storedData = localStorage.getItem('user');

 const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);

console.log(token);

const RejisterPro = () => {
    const [CategorieMatiere, setCategorieMatiere] = useState([]);
    const [subject, setSubject] = useState('');
    const [diplome, setDiplomes] = useState('');
    const [error, setError] = useState('');
    const [lesson, setlessons] = useState('');
    const [location, setLocation] = useState('');
    const [aboutyou, setAboutyou] = useState('');
    const [rate, setRate] = useState('');
    const [video, setVideo] = useState('');
    const navigate = useNavigate();



    const handleRejisterProfesseur = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("categorieMatiere_id", subject);
            formData.append("diplomes", diplome);
            formData.append("experiences", lesson);
            formData.append("biographie", aboutyou);
            formData.append("location", location);
            formData.append("tarifHoraire", rate);
            formData.append("video", video);
            formData.append("disponible", 0);

            const response = await axios.post(`${API_URL}/Professeur`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert('User registered successfully');
            } else {
                alert('Error during registration');
            }

        } catch (error) {
            setError('Error registering user');
            console.error(error);
        }
    };

     console.log(token);

    useEffect(() => {
     
            axios.get(`${API_URL}/categorie_matiere`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    setCategorieMatiere(response.data.AllCategorieMatiere);
                })
                .catch((error) => {
                    console.error("Error fetching categories", error);
                });
  


        // if (!token) {
        //     navigate("/login");
        // } else if (parsedToken && parsedToken.role === "tuteur") {
        //     navigate("/login");
        // }


    }, [token, navigate]);


    return (
        <div className="min-h-screen ">
            <header className="p-6">
                <div className="text-xl font-bold text-red-400">
                    ForsaTaalim
                    <div data-step="1" className="step  w-[14.5%] h-0.5 bg-red-400 mt-1"></div>
                    <div data-step="2" className="step hidden w-[28%] h-0.5 bg-red-400 mt-1"></div>
                    <div data-step="3" className="step hidden w-[42.5%] h-0.5 bg-red-400 mt-1"></div>
                    <div data-step="4" className="step hidden w-[56%] h-0.5 bg-red-400 mt-1"></div>
                    <div data-step="5" className="step hidden w-[70.5%] h-0.5 bg-red-400 mt-1"></div>
                    <div data-step="6" className="step hidden w-[85%] h-0.5 bg-red-400 mt-1"></div>
                    <div data-step="7" className="step hidden w-[100%] h-0.5 bg-red-400 mt-1"></div>
                </div>
            </header>
            <form onSubmit={handleRejisterProfesseur} encType="multipart/form-data">
                <div data-step="1"
                    className="step-content  flex-grow flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-12 gap-12 ">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700">
                            On ForsaTaalim you can teach over 1,000 subjects! Use the search engine to find the subject you
                            teach and let the fun begin :
                        </p>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-2">
                            Which <span className="text-red-400">subjects</span>
                        </h1>
                        <h1 className="text-3xl font-bold mb-8">do you teach?</h1>

                        <div className="flex mb-12">
                            <div className="relative flex-grow mr-4">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input id="inputSerch" value={subject} onChange={(e) => setSubject(e.target.value)} type="hidden" placeholder="Try &quot;Math&quot;"
                                    className="pl-10 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-400" />

                                <input type="text" placeholder="Try &quot;Math&quot;"
                                    className="pl-10 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-400" />
                            </div>
                            <div
                                className="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-500 transition">Search</div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Most taught subjects</h3>
                            <div className="space-y-3">
                                {CategorieMatiere.map((Categorie, index) => {
                                    return (
                                        <div key={index} id={Categorie.id} onClick={(e) => setSubject(e.target.id)}
                                            className="subjects  flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                                            <span className="font-medium text-black">{Categorie.nom}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    );
                                })}


                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-12">
                            <div
                                className="next-btn cursor-pointer px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>
                        </div>
                    </div>
                </div>
                <div data-step="2"
                    className="step-content hidden flex-grow flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700 mb-4">
                            Your title is the key to your teaching ad! It should be unique, attract attention and contain at
                            least 12 words:
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-gray-700">
                            <li>The subject you are teaching</li>
                            <li>Your qualifications and teaching approach</li>
                            <li>What sets you apart</li>
                        </ul>

                        <h3 className="font-bold uppercase text-sm mb-3">What works</h3>
                        <p className="text-gray-700">
                            • Engineering student teaches math and physics from middle school to high school in Los Angeles
                        </p>
                    </div>

                    <div className="  w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-1">
                            Title of your
                        </h1>
                        <h1 className="text-3xl font-bold text-red-400 mb-2">diplomes</h1>
                        {/* <!-- <p className="text-sm text-gray-500 mb-6">(1 minimum words)</p> */}

                        <div id="orders-container" className="  space-y-4 mb-12">
                            <div className="flex">
                                <input value={diplome} onChange={(e) => setDiplomes(e.target.value)}
                                    type="text" id="input_2"
                                    className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                                    placeholder="Enter diploma title" />
                                <button
                                    className="bg-red-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                        </div>

                        <div className="flex items-center justify-between mt-12">
                            <div className=" prev-btn px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                                back</div>
                            <div
                                className="next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>

                        </div>
                    </div>
                </div>
                <div data-step="3"
                    className="step-content hidden flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700 mb-4">
                            Explain your approach as a tutor and how you share your knowledge:
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-gray-700">
                            <li>Your teaching method and techniques.</li>
                            <li>A typical lesson plan.</li>
                            <li>What sets you apart as a tutor.</li>
                            <li> Who the lessons are for (degree, level, className, specificities, etc.).</li>


                        </ul>

                        <h3 className="font-bold uppercase text-sm mb-3">DO NOT FORGET Mohamed</h3>
                        <p className="text-gray-700">
                            • Your contact details or URLs should not appear in your texts
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-1">
                            About
                        </h1>
                        <h1 className="text-3xl font-bold text-red-400 mb-2">your lessons</h1>
                        <p className="text-sm text-gray-500 mb-6">(40 minimum words)</p>

                        <div className="space-y-4 mb-12">
                            <div className="flex">
                                <textarea value={lesson} onChange={(e) => setlessons(e.target.value)}
                                    className="flex-grow p-3 border border-gray-300 h-48 w-[600px] rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                                    placeholder="ex:Engineering student teaches math and physics frommiddle school to high school in Los Angeles"></textarea>
                            </div>
                            <div className="flex items-center justify-between mt-12">
                                <div className="prev-btn  px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                                    back</div>
                                <div
                                    className="next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>

                            </div>
                        </div>
                    </div>
                </div>
                <div data-step="4"
                    className=" step-content hidden flex-grow flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12 ">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700 mb-4">
                            Inspire confidence, establish your legitimacy, and reassure students of your professionalism.
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-gray-700">
                            <li>This is one of the first things that the students will read about you, remember to take care
                                of your spelling and grammar.</li>
                        </ul>

                        <h3 className="font-bold uppercase text-sm mb-3">DO NOT FORGET Mohamed</h3>
                        <p className="text-gray-700">
                            • Your contact details or URLs should not appear in your texts
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-1">
                            About <span className="text-3xl font-bold text-red-400 mb-2">you</span>
                        </h1>
                        <div className="space-y-4 mb-12">
                            <div className="flex">
                                <textarea value={aboutyou} onChange={(e) => setAboutyou(e.target.value)}
                                    className="flex-grow p-3 border border-gray-300 h-48 w-[600px] rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                                    placeholder="ex:Engineering student teaches math and physics frommiddle school to high school in Los Angeles"></textarea>
                            </div>
                            <div className="flex items-center justify-between mt-12">
                                <div className="prev-btn px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                                    back</div>
                                <div
                                    className="next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>

                            </div>
                        </div>
                    </div>
                </div>
                <div data-step="5"
                    className="step-content hidden flex-grow flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700 mb-4">
                            Inspire confidence, establish your legitimacy, and reassure students of your
                            professionalism.
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-gray-700">
                            <li>This is one of the first things that the students will read about you, remember to take
                                care of your spelling and grammar.</li>



                        </ul>

                        <h3 className="font-bold uppercase text-sm mb-3">DO NOT FORGET Mohamed</h3>
                        <p className="text-gray-700">
                            • Your contact details or URLs should not appear in your texts
                        </p>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-2">

                            <span className="text-red-400">Location</span> of your
                        </h1>
                        <h1 className="text-3xl font-bold mb-8">lessons</h1>


                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Where will the lesson take place?</h3>
                            <div className="space-y-3 ">
                                <input id="inputSerch" value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Try &quot;Math&quot;"
                                    className="pl-10 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-400" />
                                <div id='At your house' onClick={(e) => setLocation(e.target.id)}
                                    className="flex text-white items-center justify-between p-4 bg-red-400 rounded-md hover:bg-red-400 cursor-pointer">
                                    <span className="font-medium ">At your house</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white hover:text-white"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div id='You can travel' onClick={(e) => setLocation(e.target.id)}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-red-400 cursor-pointer hover:text-white">
                                    <span className="font-medium">You can travel</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-white"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div id='Online' onClick={(e) => setLocation(e.target.id)}
                                    className="flex   items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-red-400 hover:text-white cursor-pointer ">
                                    <span className="font-medium">Online</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-white"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-12">
                            <div className=" prev-btn px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                                back</div>
                            <div id="Next"
                                className="next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>
                        </div>
                    </div>
                </div>
                <div data-step="6"
                    className=" step-content hidden flex-grow flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700 mb-4">
                            You are free to choose your hourly rate and modify it at any time.
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-gray-700">
                            <li>If you are just starting out, you may not want to choose a rate that is too high and
                                wait until you have some reviews and recommendations to adjust it..</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-1">
                            <span className="text-3xl font-bold text-red-400 mb-2">Rate</span> per hour
                            <p className="text-sm font-medium text-gray-500 mb-4">Info: The average rate for singing
                                lessons in El Paso is $33</p>

                        </h1>
                        <div className="space-y-4 mb-12">
                            <div className="flex">
                                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
                                    className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                                    placeholder="33" />
                            </div>
                        </div>
                        <div className=" prev-btn flex items-center justify-between mt-12">
                            <div className="px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                                back</div>
                            <div
                                className="next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>

                        </div>
                    </div>
                </div>
                {/* <div data-step="7"
                className=" step-content hidden flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12">
                <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                    <h2 className="font-bold text-xl mb-4">Good to know</h2>
                    <p className="text-gray-700 mb-4">
                        You are free to choose your hourly rate and modify it at any time.
                    </p>
                    <ul className="list-disc pl-5 mb-6 text-gray-700">
                        <li>If you are just starting out, you may not want to choose a rate that is too high and
                            wait until you have some reviews and recommendations to adjust it..</li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-1">
                        <span className="text-3xl font-bold text-red-400 mb-2">Telephone Number</span>
                        <p className="text-sm font-medium text-gray-500 mb-4">Your number never appears on the site, it
                            is only sent to the students to whom you accept to give lessons.</p>

                    </h1>
                    <div className="space-y-4 mb-12">
                        <div className="flex">
                            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
                                className=" flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                                placeholder="Mobile Number" />
                        </div>
                    </div>
                    <div className="prev-btn flex items-center justify-between mt-12">
                        <div className="px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                            back</div>
                        <div
                            className="next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</div>
                    </div>
                </div>
            </div> */}
                <div data-step="7"
                    className=" step-content hidden flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 py-12 gap-12">
                    <div className="w-full md:w-80 bg-red-50 rounded-3xl p-6">
                        <h2 className="font-bold text-xl mb-4">Good to know</h2>
                        <p className="text-gray-700 mb-4">
                            Your photo will be used for all your ads, a professional quality photo will help you build
                            trust with your future students and maximize lesson requests.
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-gray-700">
                            <li>Show yourself alone and smiling!.</li>
                            <li>Face and gaze in front of the lens.</li>
                            <li>Avoid sunglasses, logos, blurry, pixelated or too dark photos.</li>
                            <li>Min. 600x600px, .PNG or .JPEG.</li>

                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-1">
                            <span className="text-3xl font-bold text-red-400 mb-2">Video
                            </span>

                        </h1>
                        <div className="space-y-4 mb-12 ml-16">
                            <div className="flex">
                                <input type="file" onChange={(e) => setVideo(e.target.files[0])}
                                    className=" flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                                    placeholder="" />
                                {/* <img src="../../assets/img/image.png" alt="" className="cursor-pointer" /> */}
                            </div>
                            {/* <div  className="px-6 py-3 text-white text-center ml-[19%] rounded-full bg-red-400">Upload a
                                video</div> */}
                        </div>
                        <div className="flex items-center justify-between mt-12 mr-24">
                            <div className="prev-btn  px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">Go
                                back</div>
                            <button type="submit"
                                className="next-btn cursor-pointer px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition">Next</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>


    );

};

export default RejisterPro;