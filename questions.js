const QUESTIONS = [
  {
    id: 1,
    category: 'Context en begrip',
    questionHtml: 'The company occupied the <strong><u>designated area</u></strong> before sunrise. What is the best Dutch translation of the underlined phrase?',
    options: ['aangewezen gebied', 'verzamelpunt', 'operationeel gebied', 'gedekte locatie'],
    answer: 0,
    explanation: 'designated area = aangewezen gebied.'
  },
  {
    id: 2,
    category: 'Context en begrip',
    questionHtml: 'The mission was <strong><u>aborted</u></strong> because of the weather. What is the best Dutch translation of the underlined word?',
    options: ['uitgesteld', 'afgebroken', 'verplaatst', 'vertraagd'],
    answer: 1,
    explanation: 'abort = afbreken van een missie.'
  },
  {
    id: 3,
    category: 'Context en begrip',
    questionHtml: 'Alpha squad will be <strong><u>relieved</u></strong> within two hours. What is the best Dutch translation of the underlined word?',
    options: ['versterkt', 'afgelost', 'begeleid', 'verplaatst'],
    answer: 1,
    explanation: 'relieve = aflossen.'
  },
  {
    id: 4,
    category: 'Context en begrip',
    questionHtml: 'The patrol found an <strong><u>anti-personnel mine</u></strong> near the dirt road. What is the best Dutch translation of the underlined phrase?',
    options: ['antitankmijn', 'bermbom', 'antipersoneelsmijn', 'blindganger'],
    answer: 2,
    explanation: 'anti-personnel mine = antipersoneelsmijn.'
  },
  {
    id: 5,
    category: 'Context en begrip',
    questionHtml: 'The platoon commander signed the <strong><u>order</u></strong> at 1500 hrs. What is the best Dutch translation of the underlined word?',
    options: ['bevel', 'rapport', 'voorschrift', 'waarschuwing'],
    answer: 0,
    explanation: 'order = bevel.'
  },
  {
    id: 6,
    category: 'Context en begrip',
    questionHtml: 'The route was changed because scouts found a <strong><u>roadside bomb</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['blindganger', 'bermbom', 'granaat', 'antitankmijn'],
    answer: 1,
    explanation: 'roadside bomb = bermbom.'
  },
  {
    id: 7,
    category: 'Context en begrip',
    questionHtml: 'The battalion will establish a <strong><u>command post</u></strong> near grid FS 837 846. What is the best Dutch translation of the underlined phrase?',
    options: ['hoofdkwartier', 'commandopost', 'waarnemingspost', 'verbindingspost'],
    answer: 1,
    explanation: 'command post = commandopost.'
  },
  {
    id: 8,
    category: 'Context en begrip',
    questionHtml: 'The bridge can only be crossed after a <strong><u>passage of lines</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['oversteek van de rivier', 'doorschrijden eigen troepen', 'verplaatsing langs de flank', 'wisseling van de wacht'],
    answer: 1,
    explanation: 'passage of lines = doorschrijden eigen troepen.'
  },
  {
    id: 9,
    category: 'Context en begrip',
    questionHtml: 'After the ceasefire, the <strong><u>threat level</u></strong> was reduced. What is the best Dutch translation of the underlined phrase?',
    options: ['dreiging', 'dreigingsniveau', 'veiligheidsmaatregel', 'aanvalsplan'],
    answer: 1,
    explanation: 'threat level = dreigingsniveau.'
  },
  {
    id: 10,
    category: 'Context en begrip',
    questionHtml: 'The report warned that <strong><u>friendly forces</u></strong> were moving in the same area. What is the best Dutch translation of the underlined phrase?',
    options: ['steunende eenheden', 'eigen troepen', 'bondgenoten', 'voorste eenheden'],
    answer: 1,
    explanation: 'friendly forces = eigen troepen.'
  },
  {
    id: 11,
    category: 'Context en begrip',
    questionHtml: 'The unit discussed lessons learned during the <strong><u>after action review</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['hot debrief', 'evaluatie na de actie', 'commandantenterugkoppeling', 'nabespreking vooraf'],
    answer: 1,
    explanation: 'after action review = evaluatie na de actie.'
  },
  {
    id: 12,
    category: 'Context en begrip',
    questionHtml: 'UN observers remained inside the <strong><u>demilitarized zone</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['buffergebied', 'grensstrook', 'gedemilitariseerde zone', 'beveiligde sector'],
    answer: 2,
    explanation: 'demilitarized zone = gedemilitariseerde zone.'
  },
  {
    id: 13,
    category: 'Context en begrip',
    questionHtml: 'The wounded were moved to the <strong><u>casualty collection point</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['verzamelgebied', 'gewondennest', 'hospitaal', 'behandelruimte'],
    answer: 1,
    explanation: 'casualty collection point = gewondennest.'
  },
  {
    id: 14,
    category: 'Context en begrip',
    questionHtml: 'The commander said the <strong><u>main effort</u></strong> would move north. What is the best Dutch translation of the underlined phrase?',
    options: ['hoofdinspanning', 'nevenopdracht', 'reserveactie', 'verbindingsplan'],
    answer: 0,
    explanation: 'main effort = hoofdinspanning / zwaartepunt.'
  },
  {
    id: 15,
    category: 'Context en begrip',
    questionHtml: 'Reconnaissance teams gathered <strong><u>intelligence</u></strong> on enemy positions. What is the best Dutch translation of the underlined word?',
    options: ['inzicht', 'waarneming', 'inlichtingen', 'berichtgeving'],
    answer: 2,
    explanation: 'intelligence = inlichtingen.'
  },
  {
    id: 16,
    category: 'Context en begrip',
    questionHtml: 'The sergeant is a <strong><u>non-commissioned officer</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['officier', 'onderofficier', 'plaatsvervanger', 'pelotonscommandant'],
    answer: 1,
    explanation: 'non-commissioned officer = onderofficier.'
  },
  {
    id: 17,
    category: 'Context en begrip',
    questionHtml: 'The patrol withdrew along the assigned <strong><u>withdrawal route</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['naderingroute', 'primaire route', 'terugtochtroute', 'bevoorradingsroute'],
    answer: 2,
    explanation: 'withdrawal route = terugtochtroute.'
  },
  {
    id: 18,
    category: 'Context en begrip',
    questionHtml: 'The platoon commander issued a <strong><u>warning order</u></strong> before the full briefing. What is the best Dutch translation of the underlined phrase?',
    options: ['operatiebevel', 'waarschuwingsbevel', 'bevelsuitgifte', 'verbindingsorder'],
    answer: 1,
    explanation: 'warning order = waarschuwingsbevel.'
  },
  {
    id: 19,
    category: 'Zinsbegrip',
    questionHtml: 'The sentry <strong><u>challenged</u></strong> the unidentified soldiers at the gate. What is the best Dutch translation of the underlined word?',
    options: ['aanriep', 'doorzocht', 'benaderde', 'begeleidde'],
    answer: 0,
    explanation: 'challenge = aanroepen.'
  },
  {
    id: 20,
    category: 'Zinsbegrip',
    questionHtml: 'The company moved by an <strong><u>alternate route</u></strong> after the bridge was blocked. What is the best Dutch translation of the underlined phrase?',
    options: ['hoofdroute', 'alternatieve route', 'aanvalsroute', 'vluchtroute'],
    answer: 1,
    explanation: 'alternate route = alternatieve route.'
  },
  {
    id: 21,
    category: 'Zinsbegrip',
    questionHtml: 'The engineers used a <strong><u>recovery vehicle</u></strong> to tow the damaged truck away. What is the best Dutch translation of the underlined phrase?',
    options: ['bergingsvoertuig', 'verkenningsvoertuig', 'gevechtsvoertuig', 'bevoorradingsvoertuig'],
    answer: 0,
    explanation: 'recovery vehicle = bergingsvoertuig.'
  },
  {
    id: 22,
    category: 'Zinsbegrip',
    questionHtml: 'A <strong><u>security patrol</u></strong> entered the green zone first. What is the best Dutch translation of the underlined phrase?',
    options: ['sociale patrouille', 'beveiligingspatrouille', 'uitgestegen patrouille', 'bereden patrouille'],
    answer: 1,
    explanation: 'security patrol = beveiligingspatrouille.'
  },
  {
    id: 23,
    category: 'Zinsbegrip',
    questionHtml: 'Good <strong><u>command and control</u></strong> depends on clear orders. What is the best Dutch translation of the underlined phrase?',
    options: ['commandovoering', 'verbindingen', 'bevelsuitgifte', 'bevelvoering en verbindingen'],
    answer: 0,
    explanation: 'command and control (C2) = commandovoering.'
  },
  {
    id: 24,
    category: 'Zinsbegrip',
    questionHtml: 'These <strong><u>coordinating instructions</u></strong> apply to all personnel. What is the best Dutch translation of the underlined phrase?',
    options: ['onderbevelstellingen', 'coördinerende bepalingen', 'uitvoeringsinstructies', 'veiligheidsmaatregelen'],
    answer: 1,
    explanation: 'coordinating instructions = coördinerende bepalingen.'
  },
  {
    id: 25,
    category: 'Zinsbegrip',
    questionHtml: 'Class I and V supplies will be collected at the <strong><u>supply point</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['verzamelgebied', 'bevoorradingsroute', 'deltapunt', 'uitgifteplaats'],
    answer: 2,
    explanation: 'supply point = deltapunt.'
  },
  {
    id: 26,
    category: 'Zinsbegrip',
    questionHtml: 'Such armed groups are considered a <strong><u>threat</u></strong> to the mission. What is the best Dutch translation of the underlined word?',
    options: ['dreiging', 'gevaarzone', 'tegenstander', 'verstoring'],
    answer: 0,
    explanation: 'threat = dreiging.'
  },
  {
    id: 27,
    category: 'Zinsbegrip',
    questionHtml: 'The <strong><u>notice to move</u></strong> stated that the unit had to leave within two hours. What is the best Dutch translation of the underlined phrase?',
    options: ['bevel tot vertrek', 'graad van gereedheid', 'vertrektijd', 'verplaatsingsvolgorde'],
    answer: 1,
    explanation: 'notice to move = graad van gereedheid.'
  },
  {
    id: 28,
    category: 'Zinsbegrip',
    questionHtml: 'The commander called in a <strong><u>quick reaction force</u></strong> when the patrol got pinned down. What is the best Dutch translation of the underlined phrase?',
    options: ['snel interventieteam', 'snelle reactiemacht', 'vooruitgeschoven post', 'versterkte reserve'],
    answer: 1,
    explanation: 'quick reaction force = snelle reactiemacht.'
  },
  {
    id: 29,
    category: 'Zinsbegrip',
    questionHtml: 'The wounded were moved by <strong><u>casualty evacuation</u></strong> to the rear area. What is the best Dutch translation of the underlined phrase?',
    options: ['medische evacuatie', 'gewondenafvoer', 'behandeling ter plaatse', 'slachtofferregistratie'],
    answer: 1,
    explanation: 'casualty evacuation = gewondenafvoer / slachtofferevacuatie.'
  },
  {
    id: 30,
    category: 'Zinsbegrip',
    questionHtml: 'A <strong><u>mounted patrol</u></strong> moved along the road while scouts walked beside it. What is the best Dutch translation of the underlined phrase?',
    options: ['voetpatrouille', 'bereden patrouille', 'uitgestegen patrouille', 'sociale patrouille'],
    answer: 1,
    explanation: 'mounted patrol = bereden patrouille.'
  },
  {
    id: 31,
    category: 'Zinsbegrip',
    questionHtml: 'The infantry crossed the field in an <strong><u>armoured personnel carrier</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['pantserinfanterievoertuig', 'pantserpersoneelsvoertuig', 'bergingsvoertuig', 'rupsondersteuningsvoertuig'],
    answer: 1,
    explanation: 'armoured personnel carrier = pantserpersoneelsvoertuig.'
  },
  {
    id: 32,
    category: 'Zinsbegrip',
    questionHtml: 'After leaving the observation post, the squads met at the <strong><u>rally point</u></strong>. What is the best Dutch translation of the underlined phrase?',
    options: ['ontmoetingspunt', 'verzamelpunt', 'laatste rondom', 'noodverzamelpunt'],
    answer: 1,
    explanation: 'rally point = verzamelpunt.'
  },
  {
    id: 33,
    category: 'Zinsbegrip',
    questionHtml: 'B squad provided <strong><u>cover</u></strong> while A squad crossed the road. What is the best Dutch translation of the underlined word?',
    options: ['vuurpositie', 'vuurdekking', 'ondersteuning', 'beveiliging'],
    answer: 1,
    explanation: 'cover = vuurdekking.'
  },
  {
    id: 34,
    category: 'Zinsbegrip',
    questionHtml: 'The trees gave the patrol enough <strong><u>concealment</u></strong> to move unseen. What is the best Dutch translation of the underlined word?',
    options: ['camouflage', 'zichtdekking', 'bescherming', 'schuilplaats'],
    answer: 1,
    explanation: 'concealment = zichtdekking.'
  },
  {
    id: 35,
    category: 'Zinsbegrip',
    questionHtml: 'Visual <strong><u>observation</u></strong> confirmed movement near the bridge. What is the best Dutch translation of the underlined word?',
    options: ['inlichtingen', 'verkenning', 'waarneming', 'onderkenning'],
    answer: 2,
    explanation: 'observation = waarneming.'
  }
];
