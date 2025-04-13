import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavEtudiant from "../components/NavEtudiant"
const API_URL = 'http://127.0.0.1:8000/api';
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
function Content() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [current_password, setCurrent_password] = useState("");
    const [isChecked, setIsChecked] = useState("");
    const [password, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {


        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                fetchUserData(token);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                setLoading(false);
            }
        } else {
            navigate('/rejister')
            setLoading(false);
            setError("Aucun utilisateur connecté.");
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${API_URL}/Etudiant/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const data = await response.json();

            console.log(data);

            setUserData(data.Profile[0]);
            // setEmail(data.Profile[0].email)
            setFormData({
                name: data.name || "",
                prenom: data.prenom || "",
                age: data.age || "",
                email: data.email || "",
                telephone: data.telephone || "",
                skype: data.skype || "",
                google_hangout: data.google_hangout || ""
            });

            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
            setError("Erreur lors de la récupération des données depuis le serveur.");
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        if (!userData) return;

        setLoading(true);
        setSuccessMessage("");

        try {
            const response = await fetch(`${API_URL}/Etudiant/${userData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            const updatedData = await response.json();




            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                const updatedUser = { ...parsedUser, ...formData };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }

            setSuccessMessage("Profil mis à jour avec succès !");
            setLoading(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setLoading(false);
            setError("Erreur lors de la mise à jour du profil.");
        }
    };



    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ current_password, password: password, email }),
        });
        console.log(email, password, password);

        const data = await response.json();
        if (response.ok) {
            setLoading(false)
            alert('Mot de passe réinitialisé avec succès !');
        } else {
            setLoading(false)

            alert(data.message || 'Erreur lors de la réinitialisation.');
        }
        setIsOpen(false);
    };


    const handleDeleteAccount = async () => {
        if (!isChecked) {
            setError("Vous devez cocher la case pour confirmer.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate('/rejister')
                alert("Votre compte a été supprimé avec succès.");
            } else {
                throw new Error("Erreur lors de la suppression de votre compte.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">

            <NavEtudiant></NavEtudiant>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="pb-3 border-b mb-4">
                            <h3 className="text-base font-medium flex items-center">
                                <div className="w-4 h-4 mr-2" />
                                Informations Générales
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Nom</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={(e) =>
                                        setUserData({ ...userData, name: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={userData.prenom}
                                    onChange={(e) =>
                                        setUserData({ ...userData, prenom: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Âge</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={userData.age}
                                    onChange={(e) =>
                                        setUserData({ ...userData, age: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={(e) =>
                                        setUserData({ ...userData, email: e.target.value })
                                    }
                                    readOnly
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Objectifs</label>
                                <input
                                    type="text"
                                    name="objectifs"
                                    value={userData.objectifs}
                                    onChange={(e) =>
                                        setUserData({ ...userData, objectifs: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">École</label>
                                <input
                                    type="text"
                                    name="ecole"
                                    value={userData.ecole}
                                    onChange={(e) =>
                                        setUserData({ ...userData, ecole: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Niveau</label>
                                <input
                                    type="text"
                                    name="niveau"
                                    value={userData.niveau}
                                    onChange={(e) =>
                                        setUserData({ ...userData, niveau: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="flex items-center">
                                    <img src="/placeholder.svg?height=16&width=16" alt="Flag" className="mr-2" />
                                    <input
                                        type="text"
                                        name="Flag"
                                        placeholder="Pays"
                                        className="text-gray-600 border-b border-gray-300 focus:outline-none focus:border-red-400 w-32"
                                    />
                                </span>
                            </div>
                            <button onClick={handleSubmit} className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-md transition-colors">
                                Vérifier
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="pb-3 border-b mb-4">
                                <h3 className="text-base font-medium flex items-center">
                                    <div className="w-4 h-4 mr-2" />
                                    Photo de profil
                                </h3>
                            </div>
                            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center relative mb-4">
                                {userData && userData.photo ? (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${userData.photo}`}
                                        alt="Profile"
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-16 h-16 text-gray-400" />
                                )}
                                <div className="absolute bottom-2 right-2 bg-red-400 text-white text-xs px-2 py-1 rounded-full">HD</div>
                            </div>
                            {/* <button className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-md transition-colors">
                                Changer la photo
                            </button> */}
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="pb-3 border-b mb-4">
                                <h3 className="text-base font-medium flex items-center">
                                    <div className="w-4 h-4 mr-2" />
                                    Changer le mot de passe
                                </h3>
                            </div>

                            <button
                                className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-md transition-colors"
                                onClick={() => setIsOpen(true)}
                            >
                                Changer le mot de passe
                            </button>

                            {isOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h2 className="text-lg font-semibold mb-4">Nouveau mot de passe</h2>
                                        <input type="text" value={email} />
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                                            placeholder="Entrer le nouveau mot de passe"
                                            value={current_password}
                                            onChange={(e) => setCurrent_password(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                                            placeholder="Confirmation du mot de passe"
                                            value={password}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="px-4 py-2 bg-gray-300 rounded-md"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-400 text-white rounded-md"
                                                onClick={handlePasswordChange}
                                            >
                                                Confirmer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="pb-3 border-b mb-4">
                                <h3 className="text-base font-medium flex items-center text-red-500">
                                    <div className="w-4 h-4 mr-2" />
                                    Supprimer le compte
                                </h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                ATTENTION! Toutes vos données (contacts, paramètres, emails,...) seront supprimées et ne pourront pas être restaurées.
                            </p>
                            <div className="flex items-center space-x-2 mb-4">
                                <input
                                    type="checkbox"
                                    id="delete-account"
                                    className="rounded border-gray-300"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <label htmlFor="delete-account" className="text-gray-600 text-sm">
                                    Supprimer mon compte
                                </label>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                className="w-full bg-gray-300 hover:bg-gray-400 text-white py-2 rounded-md transition-colors"
                                onClick={handleDeleteAccount}
                                disabled={loading}
                            >
                                {loading ? 'Suppression en cours...' : 'Supprimer mon compte'}
                            </button>
                        </div>
                    </div>

                    {/* Column 3: ID Document and Communication */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="pb-3 border-b mb-4">
                                <h3 className="text-base font-medium flex items-center">
                                    <div className="w-4 h-4 mr-2" />
                                    Pièce d'identité
                                </h3>
                            </div>
                            <div className="bg-gray-50 h-32 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
                                <div className="text-gray-400 text-center">
                                    <div className="w-12 h-12 mx-auto mb-2" />
                                    <span className="text-sm">Déposer votre document ici</span>
                                </div>
                            </div>
                            <button className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-md transition-colors mb-4">
                                Télécharger
                            </button>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Skype</label>
                                    <input
                                        type="text"
                                        name="skype"
                                        value={userData.skype || ""}
                                        onChange={handleInputChange}
                                        placeholder="Skype ID"
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Google Hangout</label>
                                    <input
                                        type="text"
                                        name="google_hangout"
                                        value={userData.google_hangout || ""}
                                        onChange={handleInputChange}
                                        placeholder="Google Hangout ID"
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}

                                    className={`w-full py-2 rounded-md transition-colors ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-redhandleSubmit-400 hover:bg-red-500 text-white"
                                        }`}
                                >
                                    {loading ? "Chargement..." : "Mettre à jour mon profil"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Content;