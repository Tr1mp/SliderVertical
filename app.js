function dq(find) {
    return document.querySelector(find);
}
const upBtn = dq(".up-button"),
      downBtn = dq(".down-button"),
      slideBar = dq(".sidebar"),
      container = dq(".container"),
      data = [
            {
                name: 'M4',
                url: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1002&q=80',
                color: '243, 244, 248',
                descr: "The BMW M4 is a high-performance version of the BMW 4 Series coupes and convertibles developed by BMW's motorsport division, BMW M, and marketed since 2014."
            },
            {
                name: 'Aventador',
                url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                color: '139, 113, 26',
                descr: "The Lamborghini Aventador is a mid-engine sportscar produced by the Italian automotive manufacturer Lamborghini. In keeping with Lamborghini tradition,"
            },
            {
                name: '488',
                url: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80',
                color: '136, 14, 47',
                descr: "The Ferrari 488 (Type F142M) is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari."
            },
            {
                name: 'Mustang',
                url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                color: '58, 69, 81',
                descr: "The Ford Mustang is a series of American automobiles manufactured by Ford. In continuous production since 1964, the Mustang is currently the longest-produced Ford car nameplate."
            },
            {
                name: 'Genesis',
                url: 'https://images.unsplash.com/photo-1599575654473-4d9a1b766975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                color: '11, 14, 19',
                descr: "The Hyundai Genesis Coupe is a rear-wheel drive sports coupe from Hyundai Motor Company, first released on October 13, 2008, for the Korean market."
            },
            {
                name: 'Camaro',
                url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                color: '3, 80, 122',
                descr: "The Chevrolet Camaro is a mid-size American automobile manufactured by Chevrolet, classified as a pony car."
            },
        ];
let activeSlide = 0;
        // slidesCount = data.length; 



upBtn.addEventListener("click", () => changeSlideByPer(1));
downBtn.addEventListener("click", () => changeSlideByPer(-1));

// let photoLayout = [];
const photoSlides = document.createElement("div");
photoSlides.classList.add("main-slide");
data.forEach(obj => {
    photoSlides.innerHTML += (`
        <div style="background-image: url(${obj.url});"></div>
    `) 
})
container.append(photoSlides);


const textSlides = document.createElement("div");
textSlides.classList.add("sidebar");
for (let i = data.length - 1; i >= 0; i--) {
    let textColor = (data[i].color != '243, 244, 248') ? 
        `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF` : 
        `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`;

    let descrColor = data[i].color != '243, 244, 248' ? '#FFF' : '#000';

    textSlides.innerHTML += (`
        <div style="background: linear-gradient(221.87deg, rgba(${data[i].color}, 1) 1%, rgba(${data[i].color}, 0.6) 128%)">
            <h1 style="text-shadow: ${textColor}; color: rgb(${data[i].color})">${data[i].name}</h1>
            <p style="color: ${descrColor}">${data[i].descr}</p>
        </div>
    `) 
}
container.append(textSlides);

textSlides.style.top = `-${(data.length - 1) * 100}vh`;

let scale = 0;
container.onwheel = scroll;

function scroll(e) {
    e.preventDefault;
    
    move = e.deltaY * 0.01;
    changeSlideByPer(move);
}

function changeSlideByPer(direction = 0) {
    changeSlide(direction);
    clearTimer();
    idTimeout = setTimeout(() => {
        activeTimer();
    }, 10000);
}

let intervalId = '';
let idTimeout = '';
const activeTimer = () => {
    intervalId = setInterval(() => changeSlide(1), 4000)
}
activeTimer();

function changeSlide(direction = 0) {
    direction ? null : activeSlide = 0;
    activeSlide += direction;
    activeSlide > data.length - 1 ? activeSlide = 0 : null;
    activeSlide < 0 ? activeSlide = data.length - 1 : null;
    textSlides.style.top = `-${(data.length - 1 - activeSlide) * 100}vh`;
    photoSlides.style.top = `-${activeSlide * 100}vh`;
}

function clearTimer() {
    if (idTimeout) {
        clearTimeout(idTimeout);
    }
    if (intervalId) {
        clearInterval(intervalId);
    }
}