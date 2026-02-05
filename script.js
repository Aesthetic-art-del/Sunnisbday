/**********************
 * PAGE NAVIGATION
 **********************/
let page = 0;
const pages = document.querySelectorAll('.page');
const nav = document.getElementById('nav');

function showPage(i){
  pages.forEach(p => p.classList.remove('active'));
  pages[i].classList.add('active');
  nav.style.display = i === 0 ? 'none' : 'flex';

  // Load quiz ONLY when quiz page is visible
  if(i === 3){
    loadQuiz();
  }
}
showPage(0);

function nextPage(){
  if(page < pages.length - 1){
    page++;
    showPage(page);
  }
}
function prevPage(){
  if(page > 0){
    page--;
    showPage(page);
  }
}

/**********************
 * CAKE PARTY
 **********************/
document.querySelector('.cake-img').onclick = () => {
  setInterval(() => {
    const p = document.createElement('div');
    p.textContent = ['🎈','🎉','❤️'][Math.floor(Math.random()*3)];
    p.style.position='fixed';
    p.style.left=Math.random()*100+'vw';
    p.style.bottom='-40px';
    p.style.fontSize='28px';
    p.style.animation='floatUp 5s linear';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),5000);
  },120);
};

/**********************
 * MEMORY LANE — DO NOT TOUCH VISUALS
 **********************/
const track = document.getElementById('memoryTrack');
track.innerHTML = '';
track.style.pointerEvents = 'none';

const memoryImages = [
  'assets/images/memory1.jpg',
  'assets/images/memory2.jpg',
  'assets/images/memory3.jpg',
  'assets/images/memory4.jpg',
  'assets/images/memory5.jpg',
  'assets/images/memory6.jpg',
  'assets/images/memory7.jpg',
  'assets/images/memory8.jpg'
];

memoryImages.forEach(src=>{
  const m=document.createElement('div');
  m.className='memory';
  m.style.backgroundImage=`url('${src}')`;
  m.style.backgroundSize='cover';
  m.style.backgroundPosition='center';
  track.appendChild(m);
});

// duplicate for infinite scroll
memoryImages.forEach((_,i)=>{
  track.appendChild(track.children[i].cloneNode(true));
});

/**********************
 * QUIZ (YOUR QUESTIONS)
 **********************/
/**********************
 * QUIZ (FIXED IMAGES)
 **********************/
const quiz = [
  {
    q: 'Enik ntha inn vedichera?',
    a: ['Cake', 'Biriyani'],
    c: 0,
    images: ['quiz1-1.jpg', 'quiz1-2.jpg']
  },
  {
    q: 'Who loves more?',
    a: ['Sheekuttan', 'Obv sheekuttan'],
    c: [0,1], // both correct
    images: []
  },
  {
    q: "If we argue who’s technically wrong?",
    a: ['You', 'You but louder'],
    c: [0,1],
    images: ['quiz3-1.jpg']
  },
  {
    q: 'Forever Us?',
    a: ['Yes', 'Ofc obv YES'],
    c: 1,
    images: ['quiz4-1.jpg', 'quiz4-2.jpg']
  },
  {
    q: 'Ithrem ishtayo tungisu?',
    a: ['Yes', 'No'],
    c: 0,
    images: ['quiz5-1.jpg', 'quiz5-2.jpg']
  }
];

let qi = 0;

function loadQuiz(){
  const q = quiz[qi];

  document.getElementById('quiz-question').textContent = q.q;

  const buttons = document.querySelectorAll('.options button');
  buttons[0].textContent = q.a[0];
  buttons[1].textContent = q.a[1];

  const imgs = document.getElementById('quizImages');
  imgs.innerHTML = '';

  if(q.images.length){
    imgs.style.display = 'flex';
    q.images.forEach(img => {
      const d = document.createElement('div');
      d.className = 'img-slot';
      d.style.backgroundImage = `url('assets/images/${img}')`;
      d.style.backgroundSize = 'cover';
      d.style.backgroundPosition = 'center';
      imgs.appendChild(d);
    });
  } else {
    imgs.style.display = 'none';
  }

  document.getElementById('quiz-result').textContent = '';
}

function selectAnswer(i){
  const correct = Array.isArray(quiz[qi].c)
    ? quiz[qi].c.includes(i)
    : i === quiz[qi].c;

  document.getElementById('quiz-result').textContent =
    correct ? 'Good job sunnisu 💖' : 'Adii mottuda 😤';

  if(correct){
    setTimeout(() => {
      qi++;
      if(qi < quiz.length) loadQuiz();
    }, 900);
  }
}

loadQuiz();

   
/**********************
 * LETTER (SAFE)
 **********************/
function toggleLetter(){
  const l=document.querySelector('.letter');
  if(l) l.classList.toggle('open');
}
/**********************
 * COUNTDOWN TO FEB 6 2026 - 12:00 AM
 **********************/
const targetDate = new Date("2026-02-06T00:00:00");

const countdownInterval = setInterval(() => {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    page = 1;          // move to cake page
    showPage(page);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent =
    String(days).padStart(2, '0');
  document.getElementById('hours').textContent =
    String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent =
    String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent =
    String(seconds).padStart(2, '0');
}, 1000);

