const courses = [
  {
    id: 1, time: "11:00", title: "남부터미널", subtitle: "한영이 차 합류",
    travelToNext: "자차 약 50분", color: "#F36F6F", emoji: "🚗", imageUrl: "img/course01.png",
  },
  {
    id: 2, time: "12:00", title: "모쿠슈라 테이블", subtitle: "점심 식사",
    travelToNext: "자차 약 30분", color: "#F5A623", emoji: "🍝", imageUrl: "img/course02.png",
  },
  {
    id: 3, time: "13:30", title: "월롱딸기", subtitle: "딸기따기 체험",
    travelToNext: "자차 약 20분", color: "#78B66B", emoji: "🍓", imageUrl: "img/course03.png",
  },
  {
    id: 4, time: "14:30", title: "낙화리", subtitle: "그림 그리기",
    travelToNext: "자차 약 40분", color: "#6FA8DC", emoji: "🎨", imageUrl: "img/course04.png",
  },
  {
    id: 5, time: "18:00", title: "도토리 정원", subtitle: "저녁 식사",
    travelToNext: "자차 약 20분", color: "#9B7BD8", emoji: "🍽️", imageUrl: "img/course05.png",
  },
  {
    id: 6, time: "20:00", title: "자유로 자동차극장", subtitle: "영화 관람",
    travelToNext: "", color: "#EF6A8A", emoji: "🎥", imageUrl: "img/course06.png",
  },
];

function renderCourseList() {
  const courseList = document.getElementById('course-list');
  if (!courseList) return;
  courseList.innerHTML = '';

  courses.forEach((course, index) => {
    const isLast = index === courses.length - 1;

    const item = document.createElement('div');
    item.className = 'timeline-item';

    const card = document.createElement('div');
    card.className = 'course-card';
    card.style.setProperty('--card-color', course.color);
    card.style.cursor = 'pointer';
    card.onclick = function() { window.location.href = 'detail-' + course.id + '.html'; };

    card.innerHTML = `
      <span class="card-badge" style="background-color:${course.color};">${course.id}</span>
      <div class="card-image-wrap" style="background-color:${course.color};">
        ${course.imageUrl
          ? `<img class="card-img" src="${course.imageUrl}" alt="${course.title}" />`
          : `<span class="card-emoji">${course.emoji}</span>`}
      </div>
      <div class="card-body">
        <p class="card-time" style="color:${course.color};">${course.time}</p>
        <p class="card-title">${course.title}</p>
        <p class="card-subtitle">${course.subtitle}</p>
      </div>
      <div class="card-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    `;

    item.appendChild(card);

    if (!isLast && course.travelToNext) {
      const travelWrap = document.createElement('div');
      travelWrap.className = 'travel-time-wrap';
      travelWrap.innerHTML = `
        <div class="timeline-line"></div>
        <div class="travel-time-pill">
          <span class="travel-car-icon">🚗</span>
          <span>${course.travelToNext}</span>
        </div>
        <div class="timeline-line"></div>
      `;
      item.appendChild(travelWrap);
    }

    courseList.appendChild(item);
  });
}

renderCourseList();
