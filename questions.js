const QUESTIONS = [
  {
    "id": 1,
    "question": "What is the Dutch translation of 'designated area'?",
    "options": [
      "aangewezen gebied",
      "omtrekverdediging",
      "onderkomen",
      "aanwijskaart"
    ],
    "answer": 0
  },
  {
    "id": 2,
    "question": "What is the Dutch translation of 'challenge procedure'?",
    "options": [
      "aanwezigheid",
      "aanroepprocedure / wachtwoord-wederwoordprocedure",
      "bevelsuitgifte",
      "coördinerende bepalingen"
    ],
    "answer": 1
  },
  {
    "id": 3,
    "question": "What is the Dutch translation of 'abort'?",
    "options": [
      "aflossen",
      "afbreken (van missie)",
      "doorzoeken",
      "vertrekken"
    ],
    "answer": 1
  },
  {
    "id": 4,
    "question": "What is the Dutch translation of 'range card'?",
    "options": [
      "afstandregistratiekaart",
      "sectorschets",
      "oleaat",
      "terreinschets"
    ],
    "answer": 0
  },
  {
    "id": 5,
    "question": "What is the Dutch translation of 'alternate route'?",
    "options": [
      "terugtochtroute",
      "primaire route",
      "alternatieve route",
      "verplaatsingsroute"
    ],
    "answer": 2
  },
  {
    "id": 6,
    "question": "What is the Dutch translation of 'anti-personnel mine'?",
    "options": [
      "antitankmijn",
      "blindganger",
      "antipersoneelsmijn",
      "bermbom"
    ],
    "answer": 2
  },
  {
    "id": 7,
    "question": "What is the Dutch translation of 'order'?",
    "options": [
      "bevel",
      "opdracht",
      "oogmerk",
      "waarschuwing"
    ],
    "answer": 0
  },
  {
    "id": 8,
    "question": "What is the Dutch translation of 'issue orders'?",
    "options": [
      "bevelen uitgeven",
      "terugkoppelen",
      "onderkennen",
      "handhaven"
    ],
    "answer": 0
  },
  {
    "id": 9,
    "question": "What is the Dutch translation of 'command post (CP)'?",
    "options": [
      "hoofdkwartier",
      "commandopost",
      "vooruitgeschoven post",
      "gewondennest"
    ],
    "answer": 1
  },
  {
    "id": 10,
    "question": "What is the Dutch translation of 'passage of lines'?",
    "options": [
      "opstelling gereed",
      "doorschrijden eigen troepen",
      "omtrekverdediging",
      "positie innemen"
    ],
    "answer": 1
  },
  {
    "id": 11,
    "question": "What is the Dutch translation of 'friendly forces'?",
    "options": [
      "steunende eenheden",
      "eigen troepen",
      "neveneenheden",
      "strijdkrachten"
    ],
    "answer": 1
  },
  {
    "id": 12,
    "question": "What is the Dutch translation of 'after action review (AAR)'?",
    "options": [
      "evaluatie na de actie",
      "bevelsuitgifte",
      "functiecontrole",
      "commandantenterugkoppeling"
    ],
    "answer": 0
  },
  {
    "id": 13,
    "question": "What is the Dutch translation of 'area of responsibility (AOR)'?",
    "options": [
      "operatiegebied",
      "gebied van verantwoordelijkheid",
      "verzamelgebied",
      "voorterrein"
    ],
    "answer": 1
  },
  {
    "id": 14,
    "question": "What is the Dutch translation of 'demilitarized zone (DMZ)'?",
    "options": [
      "grensgebied",
      "veilig gebied",
      "gedemilitariseerde zone",
      "omtrek"
    ],
    "answer": 2
  },
  {
    "id": 15,
    "question": "What is the Dutch translation of 'rules of engagement (ROE)'?",
    "options": [
      "geweldsinstructies",
      "command and signal",
      "operationele verbindingsorder",
      "vaste orders"
    ],
    "answer": 0
  },
  {
    "id": 16,
    "question": "What is the Dutch translation of 'casualty evacuation (CASEVAC)'?",
    "options": [
      "medische evacuatie",
      "gewondennest",
      "gewondenafvoer / slachtofferevacuatie",
      "slachtoffer"
    ],
    "answer": 2
  },
  {
    "id": 17,
    "question": "What is the Dutch translation of 'main effort'?",
    "options": [
      "hoofdinspanning / zwaartepunt",
      "doel",
      "operatieconcept",
      "taakorganisatie"
    ],
    "answer": 0
  },
  {
    "id": 18,
    "question": "What is the Dutch translation of 'headquarters (HQ)'?",
    "options": [
      "commandopost",
      "hoofdkwartier",
      "kazerne",
      "bevelsverstrekker"
    ],
    "answer": 1
  },
  {
    "id": 19,
    "question": "What is the Dutch translation of 'improvised explosive device (IED)'?",
    "options": [
      "IED",
      "bermbom",
      "blindganger",
      "handgranaat"
    ],
    "answer": 0
  },
  {
    "id": 20,
    "question": "What is the Dutch translation of 'intelligence (INTEL)'?",
    "options": [
      "inzicht",
      "informatie verzamelen",
      "inlichtingen",
      "waarneming"
    ],
    "answer": 2
  },
  {
    "id": 21,
    "question": "What is the Dutch translation of 'non-commissioned officer (NCO)'?",
    "options": [
      "officier",
      "soldaat",
      "onderofficier",
      "plaatsvervanger"
    ],
    "answer": 2
  },
  {
    "id": 22,
    "question": "What is the Dutch translation of 'operation order (OPORD)'?",
    "options": [
      "waarschuwingsbevel",
      "operatiebevel",
      "bevelvoering",
      "operationele gezondheidszorg"
    ],
    "answer": 1
  },
  {
    "id": 23,
    "question": "What is the Dutch translation of 'perimeter defense'?",
    "options": [
      "omtrek",
      "vuurpositie",
      "omtrekverdediging",
      "rondom beveiliging"
    ],
    "answer": 2
  },
  {
    "id": 24,
    "question": "What is the Dutch translation of 'rally point'?",
    "options": [
      "ontmoetingspunt",
      "verzamelpunt",
      "noodverzamelpunt",
      "verspreidingspunt"
    ],
    "answer": 1
  },
  {
    "id": 25,
    "question": "What is the Dutch translation of 'withdrawal route'?",
    "options": [
      "primaire route",
      "verplaatsingsroute",
      "terugtochtroute",
      "naderingroute"
    ],
    "answer": 2
  }
];
