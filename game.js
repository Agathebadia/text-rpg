const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const timeElement = document.getElementById('time')

let state = {}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  h = checkTime(hours);
  m = checkTime(minutes);
  timeElement.innerHTML = h + ":" + m;
}
startTime();

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  textNode.options.forEach(option => {
    if (showOption(option)) {
      button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Today is a great day! It is the start of your journey to the Castle of wonders! As a young knight developer, you will need courage, determination, and support to obtain your first role as a knight, in the Castle of wonders. But first, you need to prepare before your adventure.',
    options: [
      {
        text: 'Go to a Tech Event',
        setState: { feedback: false },
        nextText: 2,
      },
      {
        text: 'Apply for a job',
        setState: { mentor: false },
        nextText: 6,
      }
    ]
  },
  {
    id: 2,
    text: 'You arrive at the event. There is a crowd, but enough space to grab a Club Matte and talk with attendees before the talks start. During the evening, you listen to fascinating quests from your fellow dev knights: Microservices to rescue endangered kingdoms, lightening talks about designing magic potions for wizard... So many interesting topics! At one point, the talks come to an end.',
    options: [
      {
        text: 'Speak to the event organizer',
        setState: { mentor: true },
        nextText: 4
      },
      {
        text: 'Thank the public speaker for her presentation',
        setState: { mentor: true },
        nextText: 5
      },
      {
        text: 'Eat all the pizza',
        setState: { mentor: false },
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'That was yummy! I feel a bit tired now, time to go to bed!',
    options: [
      {
        text: 'Go to bed',
        nextText: 11
      }
    ]
  },
  {
    id: 4,
    text: 'The wizard organizer is highly pleased and you start to discuss and get to know each other. You discover that you both use the same tools to craft products! The wizard decides to help you in your quest and become a mentor!',
    options: [
      {
        text: 'Go to bed',
        nextText: 11
      }
    ]
  },
  {
    id: 5,
    text: 'The public speaker is pleased with your feedback! You start having a discuss and get to know each other. You discover that you both have the same interest in finding a role at the Castle of wonders! You have a new ally and the speaker decides to help you in your quest!',
    options: [
      {
        text: 'Go to bed',
        nextText: 11
      }
    ]
  },
  {
    id: 6,
    text: "You go online and apply for several jobs that seem to fit to your dev knight skills. You go to bed full of hopes and the day after you receive a positive reply from a company! You book an appointment for the first interview! Lets go! During the interview, you meet the Tech recruiter, few knight developers and go through discussions about your passed quests and achievements. At the end of the day, you reflect about your first interview: It went well!! You wait few days, and receive a carrier pigeon informing you that unfortunately they won't proceed further with your holy application. The recruiter suggests to have a call in order to give you a feedback.",
    options: [
      {
        text: 'Yes, please!',
        setState: { feedback: true },
        nextText: 8
      },
      {
        text: 'No, thank you',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You are feeling sad and want to do something to change your mind',
    options: [
      {
        text: 'Go to a tech event',
        nextText: 10
      },
      {
        text: 'Go to bed',
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'After listening to the recruiter, you realized that you have room for improvements regarding the code challenge you made. Even though the answer was negative, it gives you more confidence for your quest, and a good learning.',
    options: [
      {
        text: 'Go to a tech event',
        nextText: 10
      },
      {
        text: 'Go to bed',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'Tomorrow is another day. You go to bed and have a restful sleep.',
    options: [
      {
        text: 'Sleep',
        nextText: 11
      }
    ]
  },
  {
    id: 10,
    text: "You go to a tech event, but unfortunately you feel down and not focused on the presentations, nor want to discuss with other fellow knights. You eat a lot of pizza, it helps a bit. Time to go to bed! Maybe tomorrow will be a better day!",
    options: [
      {
        text: 'Sleep',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'New day, new you!!! What do you feel about doing?',
    options: [
      {
        text: 'Go to Linkedin',
        nextText: 12
      },
      {
        text: 'Work on my portfolio',
        requiredState: (currentState) => currentState.mentor,
        nextText: 13
      },
      {
        text: 'Work on code challenges',
        requiredState: (currentState) => currentState.feedback,
        nextText: 14
      }
    ]
  },
  {
    id: 12,
    text: 'You come across different jobs to apply to. Suddendly, a wild head hunter appears! His message: We have an amazing opportunity for you! Here are the skills the company is looking for:Java, Python, PHP, React, Angular, postgresql, Redis, MongoDB AWS, S3, EC2, ECS,EKS, nix systm administration,Git, CI with TDD, Docker, Kubernetes',
    options: [
      {
        text: 'Wow! I am interested',
        nextText: 15
      },
      {
        text: 'That is not a Full Stack Developer, thats an entire IT department!',
        nextText: 16
      }
    ]
  },
  {
    id: 13,
    text: 'You work on your portfolio and projects you worked on during your studies. But a wild ennemy appears! Its a bug!',
    options: [
      {
        text: 'Take care of it!',
        setState: { bugSolved: true, mentor: false },
        nextText: 17
      },
      {
        text: 'Meh, it is fine. Nobody will see it anyway.',
        setState: { mentor: true, bugSolved: false },
        nextText: 22
      },
      {
        text: 'It is not a bug, it is a feature',
        setState: { mentor: true, bugSolved: false },
        nextText: 22
      }
    ]
  },
  {
    id: 14,
    text: 'You continue training through online coding challenge to get used to it and better at it. You realise your main weakness is that you do spaghetti code!',
    options: [
      {
        text: 'Fight!',
        setState: { spaghettiSolved: true, feedback: false },
        nextText: 20
      },
      {
        text: 'Why is that a problem?',
        setState: { feedback: true, spaghettiSolved: false },
        nextText: 22
      }
    ]
  },
  {
    id: 15,
    text: 'You end up going to an interview that was really bad, recruiter did not have a clue about tech you have, job position was extrremely broad. End up decline application. GAME OVER',
    options: [
      {
        text: 'Restart!',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: 'After declining this weird offer, you continue you adventure on LinkedIn and other platforms.',
    options: [
      {
        text: 'The next day',
        nextText: 22
      }
    ]
  },
  {
    id: 17,
    text: 'You start working on this issue, console log, debugging, talking to your rubber duck, hoping it will help you to solve this. After a trip to Stackoverflow and more documentation, you finally see the error! The famous missing semicolon!',
    options: [
      {
        text: 'Hurray!',
        nextText: 22
      }
    ]
  },
  {
    id: 20,
    text: 'No time to waste! You start your journey to improve on coding challenges. Hackerrank, Code Wars, coderbyte, nothing can stop you! You are getting so good at it, you became a celebrity on the coding platform!',
    options: [
      {
        text: 'Much wow!',

        nextText: 22
      }
    ]
  },
  {
    id: 22,
    text: 'After a long day of preparation, and a good night of sleep, you are fully ready for a new day of researches. You apply to different roles that match your knight skills. After few days, you receive a positive answer for THE dev role you dreamt about! You have a serie of interviews at the Castle of Wonders. During the first interview, you meet the manager and leader of the Dev Knight Fellowship. You are impressed, but you also want to show your worth!',
    options: [
      {
        text: 'Discuss about the weather',
        nextText: 23
      },
      {
        text: 'Show your projects',
        requiredState: (currentState) => currentState.mentor,
        nextText: 24
      },
      {
        text: 'Show your technical skills',
        requiredState: (currentState) => currentState.feedback,
        nextText: 25
      },
      {
        text: 'Take the code challenge first',
        requiredState: (currentState) => currentState.spaghettiSolved,
        nextText: 27
      },
      {
        text: 'Show your portfolio',
        requiredState: (currentState) => currentState.bugSolved,
        nextText: 26
      }
    ]
  },
  {
    id: 23,
    text: 'Unfortunately, you did not make a good impression. You end up stressed and unprepared for the other steps of the interview. After few days, the recruiter politely declined your application by carrier pigeon. GAME OVER',
    options: [
      {
        text: 'Restart!',
        nextText: -1
      }
    ]
  },
  {
    id: 24,
    text: "You share your portfolio, and the recruiter takes some time to react to what he sees. After a minute, he says:'Is it supposed to be blank?' You look at his screen and see a white page. The portfolio has several errors that did not get fixed! You give him an embarassed smile. He does not smile back at you.GAME OVER",
    options: [
      {
        text: 'Restart!',
        nextText: -1
      }
    ]
  },
  {
    id: 25,
    text: "I'll show you my worth by doing the code challenge first! The recruiter looks surprised, but gladly accepts to go through this step. He sends you the assignment and sits next to you. 'Are you staying here until I'm done?' 'Of course!' He says, 'We're going to do pair programming!' Oh no, you're were not prepared to this! You start to panic and it feel that your brain is suddenly not working anymore. After a while, you come to the conclusion that you won't be able make it through the last interview. GAME OVER",
    options: [
      {
        text: 'Restart!',
        nextText: -1
      }
    ]
  },
  {
    id: 26,
    text: "You share your portfolio, and the recruiter looks pleasantly surprised. 'Who knew you could craft projects like these. It's pure genius!' You feel relieved and proud of your hard work. The discussion continues about your fighting skills, your team spirit and work with fellow wizards and mages. Once the interview is over, you hear the recruiter talking to his colleague: 'I think we've found our next fellow'. CONGRATULATIONS!!",
    options: [
      {
        text: 'Restart!',
        nextText: -1
      }
    ]
  },
  {
    id: 27,
    text: "Right before he finishes his sentence, you tell him with conviction: 'Give me anything, I'm ready to fight!' The recruiter looks pleasantly surprised. 'Perfect then, let's do it!' He sends you the task and sits next to you. The instructions remind you of a challenge you did a couple days ago. It's going to be a piece of cake! You process carefully and clearly through the issues, explain each step you are working on. You even finish on time! Once the interview is over, you hear the recruiter talking to his colleague: 'I think we've found our next fellow'. CONGRATULATIONS!!",
    options: [
      {
        text: 'Restart!',
        nextText: -1
      }
    ]
  }
]

startGame()
