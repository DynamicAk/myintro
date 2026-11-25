'use strict';
function tokens(s){return (String(s).toLowerCase().match(/[\p{L}\p{N}]+/gu)||[]).filter(w=>!new Set("a an the is are was were be been to of in for on at and or me my his her he him it i you your what which who how can could would should tell about does did do please has have had with this that these those more explain give".split(" ")).has(w))}
function retrieve(docs,question,previous=""){
 const q=String(question).trim();
 const follow=/^(and\b|also\b|more\b|what about\b|how about\b|why\b|how\b|tell me more\b|explain it\b)/i.test(q)||/\b(it|that|those|them|he|his)\b/i.test(q)&&tokens(q).length<=3;
 const query=[...new Set(tokens(q))], prev=follow?tokens(previous):[];
 const alias={job:"experience",hire:"experience",intern:"internship",internships:"internship",certified:"certification",certificate:"certification",certifications:"certification",degree:"education",college:"education",university:"education",pipeline:"pipelines",pipelines:"pipeline",spark:"pyspark",projects:"project",project:"projects",apps:"application",app:"application",salary:"salary",phone:"phone",cv:"resume",stock:"nse",stocks:"nse",tolling:"toll",grocery:"kirana",churn:"churnshield",coding:"leetcode",records:"records",skills:"expertise",skill:"expertise"};
 const expanded=[...new Set(query.flatMap(w=>[w,alias[w]].filter(Boolean)))];
 const norm=s=>new Set(tokens(s));
 const ranked=docs.map((d,i)=>{const title=norm(d.title), body=norm(d.text), tags=norm(d.tags||"");
  let score=0, direct=0;
  for(const w of expanded){const points=(title.has(w)?6:0)+(body.has(w)?3:0)+(tags.has(w)?1:0);score+=points; if(points)direct++}
  for(const w of prev)score+=(title.has(w)?2:0)+(body.has(w)?0.6:0);
  return {d,score,direct,i};
 }).sort((a,b)=>b.score-a.score||a.i-b.i);
 if(!ranked.length||ranked[0].score<3||(!ranked[0].direct&&!follow))return [];
 const top=ranked[0].score;return ranked.filter(r=>r.score>=Math.max(3,top*.32)).slice(0,4).map(r=>r.d);
}
function isRestricted(q){return /\b(ignore|disregard|override)\b.{0,45}\b(instructions?|prompt|rules?|system)\b|\b(system prompt|api keys?|passwords?|private (?:data|information)|secret keys?|salary|compensation|home address|phone number|date of birth|relationship status)\b/i.test(q)}
function terminalCommand(s){const c=String(s).trim().toLowerCase();return ["help","whoami","skills","projects","experience","resume","contact","github","clear","pipeline","ai","about","education","certification"].includes(c)?c:null}
const AKCore={tokens,retrieve,isRestricted,terminalCommand};
if(typeof module!=='undefined')module.exports=AKCore;
