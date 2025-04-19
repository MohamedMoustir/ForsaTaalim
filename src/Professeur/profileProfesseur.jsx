import React from "react";

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
     

      <div className="ml-64 p-8 w-full">
        <div className="bg-white rounded-lg shadow-sm mb-8 p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Mon Profil Professeur</h1>
          <button className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">
            <i className="fas fa-edit mr-2"></i>Modifier
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-400">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-500">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Étudiants</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-400">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500">
                  <i className="fas fa-star text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Notation</p>
                  <p className="text-2xl font-bold">4.8/5</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-400">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Heures enseignées</p>
                  <p className="text-2xl font-bold">524h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-400">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                  <i className="fas fa-euro-sign text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Tarif horaire</p>
                  <p className="text-2xl font-bold">25€</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start">
                <img
                  src="/api/placeholder/120/120"
                  alt="Photo de profil"
                  className="w-32 h-32 rounded-full border-4 border-red-400"
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-3xl font-bold text-gray-800">Nom Prénom</h2>
                  <p className="text-gray-600 mt-1">professeur@email.com</p>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Âge</p>
                      <p className="font-semibold">25 ans</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Téléphone</p>
                      <p className="font-semibold">+212 6 00 00 00 00</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Localisation</p>
                      <p className="font-semibold">Casablanca, Maroc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Biographie</h3>
                <p className="text-gray-600 leading-relaxed">
                  Passionné par l&apos;enseignement depuis plus de 10 ans, je me spécialise dans l&apos;accompagnement personnalisé des élèves. Mon approche pédagogique s&apos;adapte à chaque profil d&apos;apprenant pour garantir une progression optimale.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Matières enseignées</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full">Mathématiques</span>
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full">Physique</span>
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full">Chimie</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Diplômes</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full">
                    <i className="fas fa-graduation-cap text-red-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Master en Sciences de l&apos;Éducation</p>
                    <p className="text-sm text-gray-500">Université Hassan II - 2018</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Expériences</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full">
                    <i className="fas fa-briefcase text-red-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Professeur de mathématiques</p>
                    <p className="text-sm text-gray-500">Lycée International - 2019 à aujourd&apos;hui</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-span-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Présentation vidéo</h3>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-video text-6xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600">Votre vidéo de présentation apparaîtra ici</p>
                  <button className="mt-4 bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition">
                    Télécharger une vidéo
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
