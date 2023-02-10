import Chart from 'chart.js/auto'

const alertBanner = document.getElementById('alert');
const dailyCanvas = document.getElementById('daily-chart');
const mobileCanvas = document.getElementById('mobile-users');

const trafficWidgets = document.getElementsByClassName('traffic_chart');

const trafficHourlyCanvas = document.getElementById('traffic-chart-hourly').getContext('2d');
const trafficDailyCanvas = document.getElementById('traffic-chart-daily').getContext('2d');
const trafficWeeklyCanvas = document.getElementById('traffic-chart-weekly').getContext('2d');
const trafficMonthlyCanvas = document.getElementById('traffic-chart-monthly').getContext('2d');


// create html for the banner
alertBanner.innerHTML =
  `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have unread messages</p>
        <p class="alert-banner-close">X</p>
    </div>
  `;

alertBanner.addEventListener('click', e => {
  const element = e.target;

  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none"
  }
});

// Establishing Charts
/*
  * --------------
  ? Traffic Chart
  * --------------
*/
let trafficHourlyData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31"
  ],

  datasets: [{
    label: 'Hourly',
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    tension: 0.2
  }]
};

let trafficDailyData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31"
  ],

  datasets: [{
    label: 'Daily',
    data: [1500, 2000, 1000, 2000, 1250, 1100, 1500, 1850, 2250, 1250, 1500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    tension: 0.2
  }]
};

let trafficWeeklyData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31"
  ],

  datasets: [{
    label: 'Weekly',
    data: [1850, 1250, 1100, 1250, 1100, 1500, 2250, 2250, 2250, 1950, 2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    tension: 0.2
  }]
};

let trafficMonthlyData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31"
  ],

  datasets: [{
    label: 'Monthly',
    data: [850, 950, 1000, 950, 875, 975, 1100, 1200, 1150, 1300, 1400],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    tension: 0.2
  }]
};

let trafficOptions = {
  backgroundColor: 'rgba(112, 104, 201, .5)',
  hoverBackgroundColor: 'rgba(100, 180, 201, .5)',
  fill: true,
  aspectRatio: 2.5,
  animation: {
    duration: .2
  },
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

// function that will build charts based on which nav is clicked
function buildChart(value, data) {
  let currentChart = new Chart(value, {
    type: 'line',
    data: data,
    options: trafficOptions
  });
};

// start the users on the hourly data chart
buildChart(trafficHourlyCanvas, trafficHourlyData);
buildChart(trafficDailyCanvas, trafficDailyData);
buildChart(trafficWeeklyCanvas, trafficWeeklyData);
buildChart(trafficMonthlyCanvas, trafficMonthlyData);


for(i=0; i<trafficWidgets.length; i++) {
  if (trafficWidgets[i].dataset.chart !== 'hourly') {
    trafficWidgets[i].style.display = "none";
  }
}

document.addEventListener('click', (e) => {
  if(e.target.className === "traffic-nav-link") {
    const navLinks = document.getElementsByClassName("traffic-nav-link");
    const navValue = e.target.innerHTML.toLowerCase();

    for(i=0; i<navLinks.length; i++) {
      navLinks[i].classList.remove('active');

      if (navValue === trafficWidgets[i].dataset.chart) {
        navLinks[i].classList.add('active');
        trafficWidgets[i].style.display = "block";
      } else {
        trafficWidgets[i].style.display = "none";
      };
    };
  }
});


/*
  * --------------
  ? Daily Chart
  * --------------
*/
const dailyData = {
  labels : [ "S", "M", "T", "W", "T", "F", "S" ],
  datasets: [{
    label: '# of Hits',
    data: [ 75, 115, 175, 125, 225, 200, 100 ],
    backgroundColor: '#7477BF',
    borderWidth: 1
  }]
};

const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});

/*
  * --------------
  ? Daily Chart
  * --------------
*/
const mobileData = {
  labels: [ "Desktop", "Tablet", "Phones" ],
  datasets: [{
    label: '# of Users',
    data: [ 2000, 550, 500 ],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8'
    ]
  }]
};

const mobileOptions = {
  aspectRatio: 1.9,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold'
      }
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

/*
  * -----------------
  ? Members Elements
  * -----------------
*/
const newMemberSection = document.getElementById('newMembers');
const memberActivitySection = document.getElementById('recentActivity');

const memberData = [
  {
    member: 0,
    name: 'Victoria Chambers',
    email: 'victoria.chambers80@example.com',
    dateJoined: '10/15/20',
    recentActivity: {
      text: "commented on WebApp's SEO Tips",
      time: "4 hours ago"
    }
  },
  {
    member: 1,
    name: 'Dale Byrd',
    email: 'dale.byrd52@example.com',
    dateJoined: '10/15/20',
    recentActivity: {
      text: "liked the post Facebook's Changes for 2021",
      time: "5 hours ago"
    }
  },
  {
    member: 2,
    name: 'Dawn Wood',
    email: 'dawn.wood16@example.com',
    dateJoined: '10/15/20',
    recentActivity: {
      text: "commented on Facebook's Changes for 2021",
      time: "5 hours ago"
    }
  },
  {
    member: 3,
    name: 'Dan Oliver',
    email: 'dan.oliver@example.com',
    dateJoined: '10/15/20',
    recentActivity: {
      text: "posted WebApp's SEO Tips",
      time: "1 hour ago"
    }
  }
]

// new members loop
for(let i = 0; i < memberData.length; i++ ) {
  let member = memberData[i];
  
  let memberContainer = document.createElement('div');
  memberContainer.className = "members-container";
  
  let memberImage = document.createElement('img');
  memberImage.className = 'profile-image';
  // parcel (using for chart.js) does not work will with JS image sources. 
  // This is the work around
  if(memberData[i].member === 0) {
    memberImage.src = require("../images/member-0.jpg");
  } else if (memberData[i].member === 1) {
    memberImage.src = require("../images/member-1.jpg");
  } else if (memberData[i].member === 2) {
    memberImage.src = require("../images/member-2.jpg");
  } else {
    memberImage.src = require("../images/member-3.jpg");
    memberContainer.classList.add('remove-border');
  }

  let memberText = document.createElement('div');
  memberText.className = "members-text";
  
  let memberName = document.createElement('p');
  memberName.textContent = member.name;
  let memberEmail = document.createElement('a');
  memberEmail.href = "#";
  memberEmail.textContent = member.email;

  memberText.appendChild(memberName);
  memberText.appendChild(memberEmail);

  let memberJoin = document.createElement('p');
  memberJoin.className = "date";
  memberJoin.textContent = member.dateJoined;

  newMemberSection.appendChild(memberContainer);
  memberContainer.appendChild(memberImage);
  memberContainer.appendChild(memberText);
  memberContainer.appendChild(memberJoin);
}

//recent activity loop
for(let i = 0; i < memberData.length; i++ ) {
  let member = memberData[i];
  
  let memberContainer = document.createElement('div');
  memberContainer.className = "members-container";
  
  let memberImage = document.createElement('img');
  memberImage.className = 'profile-image';
  // parcel (using for chart.js) does not work will with JS image sources. 
  // This is the work around
  if(memberData[i].member === 0) {
    memberImage.src = require("../images/member-0.jpg");
  } else if (memberData[i].member === 1) {
    memberImage.src = require("../images/member-1.jpg");
  } else if (memberData[i].member === 2) {
    memberImage.src = require("../images/member-2.jpg");
  } else {
    memberImage.src = require("../images/member-3.jpg");
    memberContainer.classList.add('remove-border');
  }

  let memberText = document.createElement('div');
  memberText.className = "members-text";

  let memberActivity = document.createElement('p');
  memberActivity.textContent = member.name + ' ' + member.recentActivity.text;
  let memberActivityTime = document.createElement('div');
  memberActivityTime.className = 'activity_time';
  memberActivityTime.textContent = member.recentActivity.time;
  memberText.appendChild(memberActivity);
  memberText.appendChild(memberActivityTime);

  let moreDetailsButton = document.createElement('button');
  moreDetailsButton.className = 'arrow_icon';
  moreDetailsButton.textContent = '>';

  memberActivitySection.appendChild(memberContainer);
  memberContainer.appendChild(memberImage);
  memberContainer.appendChild(memberText);
  memberContainer.appendChild(moreDetailsButton);

}


// Messaging Section
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener('click', () => {
  
  // ensure user and message fields are filled out
  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
  } else if (user.value === "") {
    alert("Please fill out user field before sending");
  } else if (message.value === "") {
    alert("Please fill out message before sending");
  } else {
    alert(`Message successfully send to: ${user.value}`);
  }
});