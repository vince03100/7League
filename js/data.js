const GROUPS = {
  A: { teams: [
    {name:"Gladiatori FC",    g:2,v:2,p:0,s:0,gf:6,gs:2},
    {name:"Cobra United",     g:2,v:1,p:0,s:1,gf:3,gs:3},
    {name:"Lupi Grigi",       g:2,v:0,p:0,s:2,gf:1,gs:5},
  ]},
  B: { teams: [
    {name:"Fulmini Neri",     g:2,v:1,p:1,s:0,gf:4,gs:2},
    {name:"Aquile Rosse",     g:2,v:1,p:1,s:0,gf:3,gs:2},
    {name:"Stregoni FC",      g:2,v:0,p:0,s:2,gf:1,gs:4},
  ]},
  C: { teams: [
    {name:"Leoni d'Argento",  g:2,v:2,p:0,s:0,gf:5,gs:1},
    {name:"Draghi Verdi",     g:2,v:1,p:0,s:1,gf:3,gs:3},
    {name:"Pantere Nere",     g:2,v:0,p:0,s:2,gf:2,gs:6},
  ]},
  D: { teams: [
    {name:"Cicloni Rossi",    g:2,v:1,p:1,s:0,gf:4,gs:3},
    {name:"Orsi del Nord",    g:2,v:1,p:1,s:0,gf:3,gs:2},
    {name:"Vipere FC",        g:2,v:0,p:0,s:2,gf:2,gs:4},
  ]},
};

const MARCATORI = [
  {rank:1,name:"Marco Rossi",    team:"Gladiatori FC",   goals:4},
  {rank:2,name:"Luca Ferrari",   team:"Leoni d'Argento", goals:3},
  {rank:3,name:"Andrea Bianchi", team:"Fulmini Neri",    goals:3},
  {rank:4,name:"Giovanni Esposito",team:"Cicloni Rossi", goals:2},
  {rank:5,name:"Matteo Romano",  team:"Aquile Rosse",    goals:2},
  {rank:6,name:"Davide Gallo",   team:"Draghi Verdi",    goals:2},
  {rank:7,name:"Simone Conti",   team:"Cobra United",    goals:1},
  {rank:8,name:"Alessio Mancini",team:"Orsi del Nord",   goals:1},
];

const GIORNATE = [
  {
    day:"Mercoledì 1 Luglio", label:"Giornata 1",
    matches:[
      {home:"Gladiatori FC",   away:"Lupi Grigi",      sh:3,sa:0,grp:"A"},
      {home:"Cobra United",    away:"Lupi Grigi",      sh:2,sa:1,grp:"A"},
      {home:"Fulmini Neri",    away:"Stregoni FC",     sh:2,sa:0,grp:"B"},
      {home:"Aquile Rosse",    away:"Stregoni FC",     sh:2,sa:1,grp:"B"},
      {home:"Leoni d'Argento", away:"Pantere Nere",    sh:3,sa:1,grp:"C"},
      {home:"Draghi Verdi",    away:"Pantere Nere",    sh:2,sa:1,grp:"C"},
      {home:"Cicloni Rossi",   away:"Vipere FC",       sh:3,sa:2,grp:"D"},
      {home:"Orsi del Nord",   away:"Vipere FC",       sh:2,sa:0,grp:"D"},
    ]
  },
  {
    day:"Giovedì 2 Luglio", label:"Giornata 2",
    matches:[
      {home:"Gladiatori FC",   away:"Cobra United",    sh:3,sa:1,grp:"A"},
      {home:"Fulmini Neri",    away:"Aquile Rosse",    sh:2,sa:2,grp:"B"},
      {home:"Leoni d'Argento", away:"Draghi Verdi",    sh:2,sa:1,grp:"C"},
      {home:"Cicloni Rossi",   away:"Orsi del Nord",   sh:1,sa:1,grp:"D"},
    ]
  },
];

const PROSSIME = [
  {
    day:"Venerdì 3 Luglio", label:"Giornata 3",
    matches:[
      {home:"Gladiatori FC",    away:"Lupi Grigi",     time:"18:00",grp:"A"},
      {home:"Cobra United",     away:"Lupi Grigi",     time:"18:45",grp:"A"},
      {home:"Fulmini Neri",     away:"Stregoni FC",    time:"19:30",grp:"B"},
      {home:"Aquile Rosse",     away:"Stregoni FC",    time:"20:15",grp:"B"},
      {home:"Leoni d'Argento",  away:"Pantere Nere",   time:"21:00",grp:"C"},
      {home:"Draghi Verdi",     away:"Pantere Nere",   time:"21:45",grp:"C"},
      {home:"Cicloni Rossi",    away:"Vipere FC",      time:"18:00",grp:"D"},
      {home:"Orsi del Nord",    away:"Vipere FC",      time:"18:45",grp:"D"},
    ]
  },
  {
    day:"Sabato 4 Luglio", label:"Quarti di Finale",
    matches:[
      {home:"1° Girone A",away:"2° Girone B",time:"17:00",grp:"QF"},
      {home:"1° Girone C",away:"2° Girone D",time:"17:45",grp:"QF"},
      {home:"1° Girone B",away:"2° Girone A",time:"18:30",grp:"QF"},
      {home:"1° Girone D",away:"2° Girone C",time:"19:15",grp:"QF"},
    ]
  },
  {
    day:"Lunedì 7 Luglio", label:"Semifinali",
    matches:[
      {home:"Vincitore QF1",away:"Vincitore QF2",time:"18:00",grp:"SF"},
      {home:"Vincitore QF3",away:"Vincitore QF4",time:"19:15",grp:"SF"},
    ]
  },
  {
    day:"Martedì 8 Luglio", label:"Gran Finale",
    matches:[
      {home:"3° posto SF1",away:"3° posto SF2",time:"17:00",grp:"3°"},
      {home:"Finalista 1", away:"Finalista 2",  time:"19:30",grp:"FINALE"},
    ]
  },
];
