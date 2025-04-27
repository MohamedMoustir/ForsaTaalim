let inputSerch = document.getElementById('inputSerch');
let input_2 = document.getElementById('input_2');
let subjects = document.getElementsByClassName('.subjects');
let nextEtap = document.getElementById('Next');

function getSubjects(subject, targat) {
    console.log(subject);

    inputSerch.value = subject
    targat.classList.toggle('subjects bg-red-400  flex items-center justify-between p-4 bg-gray-50 rounded-md  cursor-pointer text-white')
}


// input_2.onclick = function getNextEtap () {
//     if (value) {
//         nextEtap.innerHTML = 'Next';
//         nextEtap.classList = 'next-btn px-12 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition'
//     } else {
//         nextEtap.innerHTML = '1/1'
//         nextEtap.classList = 'next-btn px-6 py-3 bg-gray-100 rounded-full'
//     }
// }


document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 7

    function updateStep(step) {
        document.querySelectorAll('.step-content').forEach((content) => {
            content.classList.toggle('hidden', content.dataset.step != step);
        });
        document.querySelectorAll('.step').forEach((el) => {
            el.classList.toggle('bg-red-400', el.dataset.step == step);
            el.classList.toggle('text-white', el.dataset.step == step);
            el.classList.toggle('bg-white/10', el.dataset.step != step);
            el.classList.toggle('hidden', el.dataset.step != step);

        });
        currentStep = step;
    }

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                updateStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {

        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                updateStep(currentStep - 1);
            }
        });
    });

    updateStep(currentStep);
});

function addOrder() {
    const container = document.getElementById('orders-container');
    const div = document.createElement('div');
    div.classList.add('order-group', 'mb-4', 'flex', 'gap-2');

    div.innerHTML = `
              <input type="text"
                    class="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 mr-2"
                    placeholder="Enter diploma title">
                <button onclick="addOrder()"
                    class="bg-red-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4v16m8-8H4" />
                    </svg>
                </button> `;

    container.appendChild(div);
    updateRemoveButtons();
}

function removeOrder(button) {
    button.parentElement.remove();
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-order');
    removeButtons.forEach(button => {
        button.classList.toggle('hidden', removeButtons.length === 1);
    });
}

updateRemoveButtons();




document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelectorAll('.faq-content').forEach(content => content.classList.add('hidden'));
        item.nextElementSibling.classList.remove('hidden');
    });

    item.addEventListener('mouseleave', () => {
        item.nextElementSibling.classList.add('hidden');
    });
});
let menu = document.getElementsByClassName('menu');
let choix1 = document.getElementById('choix1');
let choix2 = document.getElementById('choix2');
let title = document.getElementById('title');
let container = document.getElementsByClassName('container');
let ber = document.getElementsByClassName('hamburger');
console.log(ber[0]);


// ber[0].addEventListener('click', () => {
//     alert();
//     menu[0].classList.toggle('hidden')

// });
function openChoix(id) {
    container[0].classList.toggle('hidden')
    if (id == 2) {
        title.innerHTML = 'this title'
        choix1.innerHTML = 'choix1'
        choix2.innerHTML = 'choix2'
    } else if (id == 3) {
        title.innerHTML = 'this title'
        choix1.innerHTML = 'choix1 3'
        choix2.innerHTML = 'choix2 3'
    } else {
        title.innerHTML = 'Type of class'
        choix1.innerHTML = 'Online'
        choix2.innerHTML = 'Presonsiale'
    }
}


