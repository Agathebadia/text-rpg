const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

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
    text: 'Today is a great day! It is the start of your adventure to the Castel of wonders! As a knight developer, you will need courage, determination, to reach your first role as a knight, in the Castel of wonders. But first, you need to prepare before your adventure.',
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
    text: 'You are at the event, great speech, good pizza. WRITE MORE HERE',
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
        text: 'Eat all the pizzas',
        setState: { mentor: false },
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'Feel great but sleepy, time to go to bed!',
    options: [
      {
        text: 'Go to bed',
        nextText: 11
      }
    ]
  },
  {
    id: 4,
    text: 'Became a mentor! Recommendations about network and portfolio',
    options: [
      {
        text: 'Go to bed',
        nextText: 11
      }
    ]
  },
  {
    id: 5,
    text: 'Became a mentor! Recommendations about network and portfolio',
    options: [
      {
        text: 'Go to bed',
        nextText: 11
      }
    ]
  },
  {
    id: 6,
    text: 'You go online and apply for several jobs that seem to fit to your dev knight skills. You go to bed full of hopes and the day after you receive a positive reply from a company! You book an appointment for the first interview!Lets go! During the interview, you meet the Tech recruiter, the few developers and go through discussions about your passed quests and achievements. It went well for a first job interview!! You wait few days, and receive an email telling you that unfortunately they won"t proceed further with your application. The recruiter suggests to have a call in order to give you a feedback.',
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
    text: 'After listening, you realized that you have room for improvements regarding the code challenge you made.Boost in confidence and good learning',
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
    text: 'Tomorrow is another day. You go to bed and sleep.',
    options: [
      {
        text: 'Sleep',
        nextText: 11
      }
    ]
  },
  {
    id: 10,
    text: 'You go to a tech event, but unfortunately you feel down and not focused on the presentations, don"t want to discuss with the other persons.You eat a lot of pizza.Time to go to bed! Maybe tomorrow will be a better day!',
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
        setState: { budSolved: true },
        nextText: 17
      },
      {
        text: 'Meh, it is fine. Nobody will see it anyway.',
        nextText: 22
      },
      {
        text: 'It is not a bug, it is a feature',
        nextText: 22
      }
    ]
  },
  {
    id: 14,
    text: 'You continue trainign through online coding challenge to get used to it and better at it. You realise your main weakness is spaghetti code!',
    options: [
      {
        text: 'Fight!',
        setState: { spaghettiSolved: true },
        nextText: 20
      },
      {
        text: 'Why is that a problem?',
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
    text: 'You start working on this issue, console log, debugging, talking to your rubber duck, hoping it will help you to solve this. After a trip to Stackoverflow and more documentation. You finally see the error! The famous missing semicolon!',
    options: [
      {
        text: 'Hurray!',
        nextText: 22
      }
    ]
  },
  {
    id: 20,
    text: 'No time to waste! You start your journey to improve on coding challenges',
    options: [
      {
        text: 'Done!',
        nextText: 22
      }
    ]
  },
]

startGame()
