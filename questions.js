const QUESTIONS = [
  {
    id: 1,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>designated area</strong>?",
    options: ["aangewezen gebied", "verzamelgebied", "voorterrein", "gedekte locatie"],
    answer: 0,
    explanation: "On page 4, designated area = aangewezen gebied."
  },
  {
    id: 2,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>challenge procedure</strong>?",
    options: ["waarschuwingsbevel", "aanroepprocedure", "wachtwoordprocedure", "lichtdiscipline"],
    answer: 1,
    explanation: "On page 4, challenge procedure = aanroepprocedure / wachtwoord-wederwoordprocedure."
  },
  {
    id: 3,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>range card</strong>?",
    options: ["sectorschets", "oleaat", "terreinschets", "afstandregistratiekaart"],
    answer: 3,
    explanation: "On page 4, range card = afstandregistratiekaart (ARK)."
  },
  {
    id: 4,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>anti-personnel mine</strong>?",
    options: ["antipersoneelsmijn", "antitankmijn", "bermbom", "blindganger"],
    answer: 0,
    explanation: "On page 4, anti-personnel mine = antipersoneelsmijn."
  },
  {
    id: 5,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>friendly forces</strong>?",
    options: ["neveneenheden", "eigen troepen", "steunende eenheden", "strijdkrachten"],
    answer: 1,
    explanation: "On page 7, friendly forces = eigen troepen."
  },
  {
    id: 6,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>after action review</strong>?",
    options: ["hot debrief", "commandantenterugkoppeling", "evaluatie na de actie", "samenvatting"],
    answer: 2,
    explanation: "On page 7, after action review (AAR) = evaluatie na de actie."
  },
  {
    id: 7,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>demilitarized zone</strong>?",
    options: ["gedekte locatie", "voorste lijn", "gedemilitariseerde zone", "grensgebied"],
    answer: 2,
    explanation: "On page 8, demilitarized zone = gedemilitariseerde zone."
  },
  {
    id: 8,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>casualty collection point</strong>?",
    options: ["gewondennest", "verzamelpunt", "behandelpost", "slachtofferpunt"],
    answer: 0,
    explanation: "On page 9, casualty collection point (CCP) = gewondennest."
  },
  {
    id: 9,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>main effort</strong>?",
    options: ["nevenopdracht", "hoofdinspanning", "verplaatsingsvolgorde", "operatieconcept"],
    answer: 1,
    explanation: "On page 10, main effort = hoofdinspanning / zwaartepunt."
  },
  {
    id: 10,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>intelligence</strong>?",
    options: ["inzicht", "waarneming", "inlichtingen", "informatie"],
    answer: 2,
    explanation: "On page 11, intelligence = inlichtingen."
  },
  {
    id: 11,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>non-commissioned officer</strong>?",
    options: ["officier", "onderofficier", "plaatsvervanger", "soldaat"],
    answer: 1,
    explanation: "On page 14, non-commissioned officer (NCO) = onderofficier."
  },
  {
    id: 12,
    category: 'Woordenschat',
    questionHtml: "What is the best Dutch translation of <strong>withdrawal route</strong>?",
    options: ["naderingroute", "primaire route", "terugtochtroute", "verplaatsingsroute"],
    answer: 2,
    explanation: "On page 19, withdrawal route = terugtochtroute."
  },
  {
    id: 13,
    category: 'Zinnen',
    questionHtml: "The mission was <strong>aborted</strong> due to adverse weather. What is the best Dutch translation of the bold word?",
    options: ["vertraagd", "afgebroken", "hervat", "begeleid"],
    answer: 1,
    explanation: "On page 4, abort = afbreken (van missie)."
  },
  {
    id: 14,
    category: 'Zinnen',
    questionHtml: "The sentry <strong>challenged</strong> the unidentified troops. What is the best Dutch translation of the bold word?",
    options: ["begeleidde", "doorzocht", "benaderde", "riep aan"],
    answer: 3,
    explanation: "On page 4, challenge (v) = aanroepen."
  },
  {
    id: 15,
    category: 'Zinnen',
    questionHtml: "The security patrol entered the green zone. What is the best Dutch translation of <strong>security patrol</strong>?",
    options: ["sociale patrouille", "beveiligingspatrouille", "uitgestegen patrouille", "verkenningspatrouille"],
    answer: 1,
    explanation: "On page 5, security patrol = beveiligingspatrouille."
  },
  {
    id: 16,
    category: 'Zinnen',
    questionHtml: "The command post is located at FS 837 846. What is the best Dutch translation of <strong>command post</strong>?",
    options: ["commandopost", "hoofdkwartier", "waarnemingspost", "vooruitgeschoven post"],
    answer: 0,
    explanation: "On page 7, command post (CP) = commandopost."
  },
  {
    id: 17,
    category: 'Zinnen',
    questionHtml: "The casualty list included 1 KIA and 3 wounded. What is the best Dutch translation of <strong>KIA</strong>?",
    options: ["gewond geraakt", "vermist geraakt", "gesneuveld", "gevangen genomen"],
    answer: 2,
    explanation: "On page 8, killed in action (KIA) = gesneuveld(e) (dode)."
  },
  {
    id: 18,
    category: 'Zinnen',
    questionHtml: "The point unit took cover when they were <strong>under fire</strong>. What is the best Dutch translation of the bold phrase?",
    options: ["in gevecht", "onder bevel", "onder vuur", "op verplaatsing"],
    answer: 2,
    explanation: "On page 14, be under fire = onder vuur liggen."
  },
  {
    id: 19,
    category: 'Zinnen',
    questionHtml: "The UN will <strong>deploy</strong> troops in the buffer zone. What is the best Dutch translation of the bold word?",
    options: ["ontplooien", "vertragen", "beveiligen", "verplaatsen"],
    answer: 0,
    explanation: "On page 11, deploy troops = inzetten/ontplooien van troepen."
  },
  {
    id: 20,
    category: 'Zinnen',
    questionHtml: "The convoy was <strong>intercepted</strong> before it reached the bridge. What is the best Dutch translation of the bold word?",
    options: ["onderschept", "versterkt", "waargenomen", "omgeleid"],
    answer: 0,
    explanation: "On page 14, intercept = onderscheppen."
  },
  {
    id: 21,
    category: 'Zinnen',
    questionHtml: "The unit surrendered because it was <strong>surrounded</strong>. What is the best Dutch translation of the bold word?",
    options: ["verplaatst", "omsingeld", "onderkend", "ondersteund"],
    answer: 1,
    explanation: "On page 14, surround = omsingelen."
  },
  {
    id: 22,
    category: 'Zinnen',
    questionHtml: "The area was declared <strong>secure</strong> by the PC. What is the best Dutch translation of the bold word?",
    options: ["verdacht", "gedekt", "veilig", "vrijgemaakt"],
    answer: 2,
    explanation: "On page 20, secure = veilig."
  },
  {
    id: 23,
    category: 'Zinnen',
    questionHtml: "OP A has observed <strong>suspicious</strong> road movements. What is the best Dutch translation of the bold word?",
    options: ["snelle", "verdachte", "vijandige", "tijdelijke"],
    answer: 1,
    explanation: "On page 20, suspicious = verdacht."
  },
  {
    id: 24,
    category: 'Zinnen',
    questionHtml: "The element of surprise depends on light and <strong>noise discipline</strong>. What is the best Dutch translation of the bold phrase?",
    options: ["lichtdiscipline", "geluidsdiscipline", "vuurdiscipline", "omgevingsbewustzijn"],
    answer: 1,
    explanation: "On page 8 and page 12, noise discipline = geluidsdiscipline."
  }
];
